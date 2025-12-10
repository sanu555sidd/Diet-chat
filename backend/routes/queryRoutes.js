import express from "express";
import { handleQuery } from "../controllers/queryController.js";

const router = express.Router();

router.post("/", handleQuery);

export default router;
