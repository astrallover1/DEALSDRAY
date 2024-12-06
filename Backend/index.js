const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const fs = require("fs");

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect("mongodb+srv://kandhavelu:kandha@cluster0.t6frs.mongodb.net/employeeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Models
const Employee = require("./Models/Employee");
const Admin = require("./Models/Admin");

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username,password });
    
    res.json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new employee
app.post("/api/employees", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed" });
    }
    const { name, email, mobile, designation, gender, courses } = req.body;
    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image: req.file.filename,
    });
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all employees
app.get("/api/employeesall", async (req, res) => {
  try {
    const employees = await Employee.find();
    const count =await Employee.countDocuments()
    res.json({employees,count});
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get employee by ID
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update employee
app.put("/api/employees/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const updateData = { name, email, mobile, designation, gender, courses };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete employee
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve static files for uploads
app.use(
  "/uploads",
  (req, res, next) => {
    const filePath = path.join(uploadsDir, req.url);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    next();
  },
  express.static(uploadsDir)
);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
