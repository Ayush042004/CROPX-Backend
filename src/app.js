import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// ✅ Configure CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); 

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

import userRoutes from './routes/user.routes.js';
import weatherRoutes from './routes/intelligence.routes.js';
import diseaseRoutes from './routes/disease.routes.js';
import marketRoutes from './routes/market.routes.js';

app.use("/api/v1/farmers", userRoutes);
app.use("/intelligence", weatherRoutes);
app.use("/Disease-Analysis", diseaseRoutes);
app.use("/market-place", marketRoutes);

export { app };
