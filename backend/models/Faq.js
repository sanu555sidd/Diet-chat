import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Faq = mongoose.model("Faq", faqSchema);
