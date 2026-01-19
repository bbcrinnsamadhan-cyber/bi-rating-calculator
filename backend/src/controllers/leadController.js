import Lead from "../models/Lead.js";
import { sendUserMail } from "../config/mailer.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
  
    try {
      await sendUserMail(lead);
    } catch (mailError) {
      console.error("Email failed but DB saved", mailError);
    }
  
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Lead Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process lead",
    });
  }
};
