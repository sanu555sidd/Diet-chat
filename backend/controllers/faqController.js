import { Faq } from "../models/Faq.js";

export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ number: 1 });
    res.json(faqs);
  } catch (err) {
    console.error("GET /faqs error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
