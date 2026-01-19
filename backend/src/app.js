import express from "express";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes.js";

import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiLimiter);


app.use("/api/leads", leadRoutes);

export default app;
