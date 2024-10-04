import { getAnalytics, trackVisit } from "../services/analytics.js";

import Url from "../models/UrlModel.js";
import { nanoid } from "nanoid";
import UAParser from "ua-parser-js";

export const createShortenURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortCode = nanoid(8);

    const newUrl = new Url({
      originalUrl,
      shortCode,
    });

    await newUrl.save();

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getShortenURL = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    const userAgentString = req.headers["user-agent"];
    const ipAddress = req.ip;
    const referrer = req.headers["referer"] || "";

    // Parse the user-agent string
    const parser = new UAParser();
    const userAgent = parser.setUA(userAgentString).getResult();

    // Track the visit
    const isUnique = await trackVisit(
      shortCode,
      userAgentString,
      ipAddress,
      referrer
    );

    // Redirect to the original URL
    res.redirect(302, url.originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAnalyticsData = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const analytics = await getAnalytics(shortCode);
    if (!analytics) {
      return res.status(404).json({ error: "No analytics found for this URL" });
    }
    res.json(analytics);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const createCustomURL = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;

    // Validate input
    if (!originalUrl || !customCode) {
      return res
        .status(400)
        .json({ error: "Original URL and custom code are required" });
    }

    // Check if the custom code is already in use
    const existingUrl = await Url.findOne({ shortCode: customCode });
    if (existingUrl) {
      return res
        .status(400)
        .json({ error: "Custom short code is already in use" });
    }

    // Create and save the new shortened URL with the custom code
    const newUrl = new Url({
      originalUrl,
      shortCode: customCode,
    });

    await newUrl.save();

    // Return the custom shortened URL to the user
    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${customCode}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
