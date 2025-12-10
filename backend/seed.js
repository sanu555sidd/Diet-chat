import mongoose from "mongoose";
import dotenv from "dotenv";
import { Faq } from "./models/Faq.js";
import fs from "fs";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const json = JSON.parse(fs.readFileSync("./faqs.json", "utf-8"));
  await Faq.deleteMany({});
  await Faq.insertMany(json);

  console.log("Seeded FAQs");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
