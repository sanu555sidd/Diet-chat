import { Faq } from "../models/Faq.js";
import { findBestFaq } from "../utils/faqMatcher.js";
import { geminiModel } from "../utils/geminiClient.js";

export const handleQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const faqs = await Faq.find();
    if (!faqs.length) {
      return res.status(500).json({ message: "FAQ database empty" });
    }

    // ✅ FIXED: destructuring
    const { bestFaq, bestScore } = findBestFaq(question, faqs);

    // ✅ OUT-OF-DOMAIN CHECK
    if (!bestFaq || bestScore < 2) {
      return res.json({
        answer:
          "I’m not aware of this. I can only answer diet-related questions based on my knowledge base.",
      });
    }

    let answerText;

    try {
      const prompt = `
You are a diet assistant.
Use the FAQ below as the ONLY source of truth.

FAQ Question:
${bestFaq.question}

FAQ Answer:
${bestFaq.answer}

User Question:
${question}

Answer clearly in 2–3 sentences.
`;

      const result = await geminiModel.generateContent(prompt);
      answerText = result.response.text();
    } catch (geminiError) {
      console.warn("⚠️ Gemini failed, using DB answer");
      answerText = bestFaq.answer;
    }

    res.json({
      answer: `${answerText} (Ref: Question #${bestFaq.number})`,
    });
  } catch (err) {
    console.error("POST /query error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
