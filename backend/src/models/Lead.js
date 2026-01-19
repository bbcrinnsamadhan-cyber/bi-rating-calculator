import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // Step 1
    age: Number,
    experience: Number,

    // Step 2
    gstRegistered: Boolean,
    gstVintage: Number,
    turnoverTrend: Boolean,
    profitTrend: Boolean,
    capitalTrend: Boolean,

    // Step 3
    cibilScore: Number,
    familyOwnedProperties: Number,

    // Step 4
    runningLoans: Number,
    closedLoans: Number,
    bounces12Months: Number,
    bounces6Months: Number,

    // Step 5
    netWorthRatio: Number,
    itrFiled: Boolean,
    collateralAvailable: Boolean,

    // Step 6
    fullName: String,
    mobile: String,
    email: String,
    loanRequirement: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
