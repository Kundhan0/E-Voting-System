import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import User from "./model/user.js";
import Vote from "./model/vote.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key", // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/E-votingsystem"; // Replace with your MongoDB URI
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Default Route
app.get("/", (_, res) => {
  res.send("Hello World! This is the backend server.");
});

// User Registration
app.post("/api/register", async (req, res) => {
  const { username, email, password, address, age, gender, dateOfBirth } = req.body;

  // Validate required fields
  if (!username || !email || !password || !address || !age || !gender || !dateOfBirth) {
    return res.status(400).send({ success: false, message: "All fields are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.send({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Create a new user with a unique ID
    const newUser = new User({
      id: uuidv4(), // Generate a unique ID
      username,
      email,
      password,
      address,
      age,
      gender,
      dateOfBirth,
    });

    await newUser.save();
    res.send({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  console.log(req.body);

  try {
    const { username, email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (user && user.email === email && user.password === password) {
      // Store the username in the session
      req.session.username = user.username;
      console.log("Session created:", req.session); // Debugging log
      return res.send({
        success: true,
        message: "Login successful",
        username: user.username,
      });
    } else if (user) {
      console.log("Invalid credentials");
      return res.send({ success: false, message: "Invalid credentials" });
    } else {
      console.log("Username not found. Please register.");
      return res.send({
        success: false,
        message: "Username not found. Please register.",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Voting
app.post("/api/vote", async (req, res) => {
  // console.log("Session data:", req.session); // Debugging log

  const { category, option } = req.body;

  try {
    // Retrieve the username from the session
    const username = req.session.username;
    console.log("Username from session:", username); // Debugging log

    if (!username) {
      return res.send({
        success: false,
        message: "You must be logged in to vote.",
      });
    }

    // Check if the user has already voted in this category
    const existingVote = await Vote.findOne({ username, category });
    if (existingVote) {
      return res.send({
        success: false,
        message: `You have already voted in the ${category} category.`,
      });
    }

    // Save the vote
    const newVote = new Vote({ username, category, option });
    await newVote.save();

    res.send({ success: true, message: "Vote recorded successfully." });
  } catch (error) {
    console.error("Error during voting:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});
// Logout
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send({ success: false, message: "Logout failed." });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.send({ success: true, message: "Logged out successfully." });
  });
});

app.get("/api/stats", async (req, res) => {
  try {
    // Fetch all votes from the database
    const votes = await Vote.find();
    console.log("Votes fetched:", votes); 
    // Group votes by category and option
    const stats = {};
    votes.forEach((vote) => {
      if (!stats[vote.category]) {
        stats[vote.category] = {};
      }
      if (!stats[vote.category][vote.option]) {
        stats[vote.category][vote.option] = 0;
      }
      stats[vote.category][vote.option]++;
    });

    res.send({ success: true, stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});