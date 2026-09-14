const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 1. .env file load karein
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// 2. User model import karein
const User = require("../models/User");

// 3. Jo members aapko add karne hain, unki list (Array)
const membersToSeed = [
  {
    name: "Ashwani tyagi",
    email: "tyagiashwani784@gmail.com",
    password: "UserPassword123!",
  }
  // Aap yahan aur bhi dummy members add kar sakte hain
];

const seedMembers = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("❌ Error: MONGODB_URI is undefined.");
    process.exit(1);
  }

  try {
    // Database se connect karein
    await mongoose.connect(mongoURI);
    console.log("🔌 Connected to MongoDB successfully.");

    const salt = await bcrypt.genSalt(10);
    let createdCount = 0;
    let skippedCount = 0;

    // Loop chala kar ek-ek member ko check aur insert karenge
    for (const member of membersToSeed) {
      const emailNormalized = member.email.toLowerCase();

      // Check karein kya ye member pehle se hai?
      const existingUser = await User.findOne({ email: emailNormalized });

      if (existingUser) {
        console.log(`ℹ️ Member "${emailNormalized}" already exists. Skipping...`);
        skippedCount++;
        continue; // Agle member par chalein
      }

      // Password hash karein 
      // NOTE: Agar aapke User Model me pre-save hook hai, to is hashing ki zaroorat nahi hai
      const passwordHash = await bcrypt.hash(member.password, salt);

      // New Member create karein
      await User.create({
        name: member.name,
        email: emailNormalized,
        passwordHash, // Agar pre-save hook hai to 'password: member.password' likhein
        role: "MEMBER", // Yahan role MEMBER set kiya hai
        isActive: true,
      });

      console.log(`✅ Member created: ${emailNormalized}`);
      createdCount++;
    }

    console.log("-----------------------------------------");
    console.log("🚀 Seeding Summary:");
    console.log(`Total Created: ${createdCount}`);
    console.log(`Total Skipped: ${skippedCount}`);
    console.log("-----------------------------------------");

  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    // Connection clean close karein
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("💾 Database connection closed cleanly.");
    }
    process.exit();
  }
};

// Seeder execute karein
seedMembers();
