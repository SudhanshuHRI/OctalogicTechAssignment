import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mysql from "mysql2";


const app = express();
const PORT = process.env.PORT || 5000;


const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "octalogic_tech",
}).promise();


const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
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


function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


function isDateRangeOverlapping(newFrom, newTill, existingFrom, existingTill) {
  const from1 = stripTime(newFrom);
  const till1 = stripTime(newTill);
  const from2 = stripTime(existingFrom);
  const till2 = stripTime(existingTill);

  return from1 <= till2 && till1 >= from2;
}


app.get("/", (req, res) => {
  res.json({ message: "Welcome Backend!" });
});

app.get("/getData", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `vehicle_booking`");
    res.json({ status: 200, data: rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error");
  }
});

app.post("/postBooking", async (req, res) => {
  const { id, user_name, booked_from, booked_till } = req.body;

  if (!id || !user_name || !booked_from || !booked_till) {
    return res.json({status:400,message:"Missing required fields"});
  }

  try {
   
    const [rows] = await pool.query(
      "SELECT booked_from, booked_till FROM vehicle_booking WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.json({status:400,message:"ID is not present"});
    }

    const existing = rows[0];

 
    const newFrom = new Date(booked_from);
    const newTill = new Date(booked_till);
    const existingFrom = new Date(existing.booked_from);
    const existingTill = new Date(existing.booked_till);

    const isOverlap = isDateRangeOverlapping(newFrom, newTill, existingFrom, existingTill);

    if (isOverlap) {
      return res.json( {status:400,message:`Vehicle already booked. Existing booking: ${existing.booked_from} to ${existing.booked_till}`}
        
      );
    }

   
    await pool.query(
      `UPDATE vehicle_booking
       SET user_name = ?, booked_from = ?, booked_till = ?
       WHERE id = ?`,
      [user_name, booked_from, booked_till, id]
    );

    res.json({status:200,message:"Booking updated successfully"});
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});
