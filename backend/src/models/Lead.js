import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    /* ---------------- PART 1: PROFILE ---------------- */
    fullName: String,
    age: Number,
    mobile: String,
    email: String,
    applicantType: String, // Salaried / SEP / SENP / Others

    /* ---------------- PART 2A: SALARIED ---------------- */
    totalExperience: Number,
    currentOrgExperience: Number,
    employerType: String,
    designation: String,

    /* ---------------- PART 2B: BUSINESS ---------------- */
    businessExperience: Number,
    gstRegistered: Boolean,
    gstVintage: Number,
    turnoverTrend: String, // Positive / Flat / Negative
    profitTrend: String,
    capitalTrend: String,

    /* ---------------- PART 3: CREDIT & BANKING ---------------- */
    cibilScore: Number, // -1 or 300–900
    runningLoans: Number,
    closedLoans: Number,
    bounces6Months: Number,
    bounces3Months: Number,
    avgBankBalance: String,

    /* ---------------- PART 4: FINANCIAL STRENGTH ---------------- */
    totalAssets: Number,
    totalOutstandingLoans: Number,
    netWorthBorrowingRatio: Number,

    /* ---------------- BI RESULT ---------------- */
    biScore: Number,
    riskBand: String,
    scoreBreakdown: {
      profile: Number,
      work: Number,
      credit: Number,
      banking: Number,
      strength: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
