import mysql from "mysql2";

async function connect() {
  try {
    const pool = mysql
      .createPool({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "octalogic_tech",
      })
      .promise();

    async function testConnection() {
      try {
        await pool.query("SELECT 1");
        console.log("✅ Database connection successful");
      } catch (err) {
        console.error("❌ Database connection failed:", err.message);
      }
    }

    testConnection();
  } catch (error) {
    console.log("Error is:", error);
  }
}

export default {
  connect: connect,
};
