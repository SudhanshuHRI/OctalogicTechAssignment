import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import db from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

db.connect();

const allowedOrigins = [
  "http://localhost:3500",
  "http://localhost:5000",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", (req, res) =>
  res.json({ message: "Welcome Management Backend!" })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
