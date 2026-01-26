import Lead from "../models/Lead.js";
import { sendUserMail } from "../config/mailer.js";
import { calculateBIScore } from "../utils/biScoreCalculator.js";

export const createLead = async (req, res) => {
  try {
    const leadData = req.body;

    // 1️⃣ Calculate BI Score
    const biResult = calculateBIScore(leadData);

    // 2️⃣ Save to DB
    const lead = await Lead.create({
      ...leadData,
      biScore: biResult.biScore,
      riskBand: biResult.riskBand,
      scoreBreakdown: biResult.breakdown,
    });

    // 3️⃣ Send email (IMPORTANT FIX)
    try {
      await sendUserMail({
        ...lead.toObject(),
        biScore: biResult.biScore,
        riskBand: biResult.riskBand,
        scoreBreakdown: biResult.breakdown,
      });
    } catch (mailError) {
      console.error("Email failed but DB saved", mailError);
    }

    // 4️⃣ Response
    res.status(201).json({
      success: true,
      biScore: biResult.biScore,
      riskBand: biResult.riskBand,
    });
  } catch (error) {
    console.error("Lead Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process BI score",
    });
  }
};
