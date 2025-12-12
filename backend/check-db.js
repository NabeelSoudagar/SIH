import { db } from "./config/db.js";
import fs from "fs";

async function setupDatabase() {
  try {
    const schema = fs.readFileSync("./supabase-schema.sql", "utf8");
    const statements = schema.split(";").filter(stmt => stmt.trim().length > 0);
    for (const statement of statements) {
      if (statement.trim()) {
        await db.query(statement);
      }
    }
    console.log("Database schema created successfully");
  } catch (err) {
    console.error("Error setting up database:", err);
  }
}

async function checkTables() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    console.log("Tables in database:");
    rows.forEach(row => {
      console.log(Object.values(row)[0]);
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
}

async function main() {
  await setupDatabase();
  await checkTables();
}

main();
