// const mongoose = require("mongoose");

// const EmployeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: Number, required: true },
//   designation: { type: String,
//     enum: ['HR', 'Manager', 'Sales'],
//     required:true, },
//   gender: { type: String,
//     enum: ['Male', 'Female'],
//     required:true },
//   course: { type: String,
//     enum: ['MCA', 'BCA', 'BSC'],
//     required: true, },
//   image: { type: String },
//   joiningDate: { type: Date, required: true },
// });

// module.exports = mongoose.model("Employee", EmployeeSchema);
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique: true,
    trim: true,
    lowercase: true,},
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
  image: { type: String }, // File path of the uploaded image

},{timestamps:true});

module.exports = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
