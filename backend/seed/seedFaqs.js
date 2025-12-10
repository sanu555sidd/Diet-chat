import "dotenv/config.js";
import { connectDB } from "../config/db.js";
import { Faq } from "../models/Faq.js";
import { faqs } from "../data/faqs.js";

const seedFaqs = async () => {
  try {
    await connectDB();

    await Faq.deleteMany({});
    await Faq.insertMany(faqs);

    console.log("✅ FAQs seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding FAQs:", err.message);
    process.exit(1);
  }
};

seedFaqs();
