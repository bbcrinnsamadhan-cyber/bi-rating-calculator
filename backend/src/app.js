import express from "express";
import cors from "cors";
import leadRoutes from "./routes/leadRoutes.js";

import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiLimiter);


app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("server is running, ready to accept requests!");
});

export default app;
