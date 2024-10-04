import express from "express";
import {
  createCustomURL,
  createShortenURL,
  getAnalyticsData,
  getShortenURL,
} from "../controllers/shortenUrlController.js";

const router = express.Router();

router.post("/shorten", createShortenURL);
router.get("/:shortCode", getShortenURL);
router.get("/:shortCode/analytics", getAnalyticsData);
router.post("/customURL", createCustomURL);

export default router;
