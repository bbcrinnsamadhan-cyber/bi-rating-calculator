import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // max 50 requests per IP
  standardHeaders: true, // `RateLimit-*` headers
  legacyHeaders: false, // disable `X-RateLimit-*`
  message: {
    message: "Too many requests. Please try again later.",
  },
});