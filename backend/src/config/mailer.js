import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendUserMail = async (lead) => {
  const {
    fullName,
    email,
    mobile,
    loanRequirement,
    age,
    experience,
    gstRegistered,
    gstVintage,
    turnoverTrend,
    profitTrend,
    capitalTrend,
    cibilScore,
    familyOwnedProperties,
    runningLoans,
    closedLoans,
    bounces12Months,
    bounces6Months,
    netWorthRatio,
    itrFiled,
    collateralAvailable,
  } = lead;

  const mailBody = `
    <h2>New Form Submission Details</h2>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Loan Requirement:</strong> ${loanRequirement || "-"}</p>

    <hr />

    <h3>Step 1: Applicant Profile</h3>
    <p>Age: ${age}</p>
    <p>Experience: ${experience}</p>

    <h3>Step 2: Business Compliance</h3>
    <p>GST Registered: ${gstRegistered ? "Yes" : "No"}</p>
    <p>GST Vintage: ${gstVintage ?? "-"}</p>
    <p>Turnover Trend: ${turnoverTrend ? "Yes" : "No"}</p>
    <p>Profit Trend: ${profitTrend ? "Yes" : "No"}</p>
    <p>Capital Trend: ${capitalTrend ? "Yes" : "No"}</p>

    <h3>Step 3: Credit Profile</h3>
    <p>CIBIL Score: ${cibilScore}</p>
    <p>Family Owned Properties: ${familyOwnedProperties}</p>

    <h3>Step 4: Loan Exposure</h3>
    <p>Running Loans: ${runningLoans}</p>
    <p>Closed Loans: ${closedLoans}</p>
    <p>Bounces (12 Months): ${bounces12Months}</p>
    <p>Bounces (6 Months): ${bounces6Months}</p>

    <h3>Step 5: Financial Strength</h3>
    <p>Net Worth Ratio: ${netWorthRatio}</p>
    <p>ITR Filed: ${itrFiled ? "Yes" : "No"}</p>
    <p>Collateral Available: ${collateralAvailable ? "Yes" : "No"}</p>

    <br />
    <p>Thank you for submitting the form.</p>
  `;


  try {
    const data = await resend.emails.send({
      
      from: 'BI Rating <onboarding@resend.dev>', 
      to: [email], // User ka email
      subject: `New Form Submission || ${fullName}`,
      html: mailBody,
    });

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Resend Error:", error);
    // Error throw karein taaki controller catch kar sake
    throw error;
  }
};