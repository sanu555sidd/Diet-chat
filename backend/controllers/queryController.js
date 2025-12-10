import { Faq } from "../models/Faq.js";
import { findBestFaq } from "../utils/faqMatcher.js";
import { openai } from "../utils/openaiClient.js";

export const handleQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const faqs = await Faq.find();
    if (!faqs.length) {
      return res.status(500).json({ message: "FAQ data not found" });
    }

    const bestFaq = findBestFaq(question, faqs);

    const prompt = `
You are a helpful diet assistant. You will be given:
- A user question.
- A FAQ entry (question and answer) that is relevant.

Use the FAQ answer as the main source of truth. 
Answer in 2-4 sentences. Do NOT include any reference text in your answer—just the answer itself.
User Question: "${question}"

FAQ:
Q: ${bestFaq.question}
A: ${bestFaq.answer}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful diet assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });

    const llmAnswer =
      completion.choices?.[0]?.message?.content?.trim() ||
      bestFaq.answer;

    // Append reference in backend so it's guaranteed correct
    const finalAnswer = `${llmAnswer} (Ref: Question #${bestFaq.number})`;

    res.json({
      answer: finalAnswer,
      refNumber: bestFaq.number,
      matchedFaq: {
        question: bestFaq.question,
        answer: bestFaq.answer,
      },
    });
  } catch (err) {
    console.error("POST /query error:", err);
    res.status(500).json({ message: "LLM or server error" });
  }
};
