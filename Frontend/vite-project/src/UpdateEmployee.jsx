import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  // Fetch existing employee data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        const employee = response.data;
        setFormData({
          name: employee.name || "",
          email: employee.email || "",
          mobile: employee.mobile || "",
          designation: employee.designation || "",
          gender: employee.gender || "",
          courses: employee.courses || [],
          image: null, // Image file is not fetched, handled during update
        });
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const updatedCourses = formData.courses.includes(value)
        ? formData.courses.filter((course) => course !== value)
        : [...formData.courses, value];
      setFormData({ ...formData, courses: updatedCourses });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "courses") {
        value.forEach((course) => updateData.append("courses[]", course));
      } else {
        updateData.append(key, value);
      }
    });

    axios
      .put(`http://localhost:5000/api/employees/${id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Employee updated successfully:", response.data);
         navigate("/employ"); // Redirect to employee list or another relevant page
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#fffcf2] p-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto lg:py-6 py-2 px-8 lg:px-20 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Update Employee</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-light text-yellow-900 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="border p-2 placeholder-black rounded-md w-full"
              />
            </div>
            <div>
              <label className="text-lg font-light text-yellow-900 mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="border p-2 placeholder-black rounded-md w-full"
              />
            </div>
            <div>
              <label className="text-lg font-light text-yellow-900 mb-2">Phone:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your Phone No"
                className="border p-2 placeholder-black rounded-md w-full"
              />
            </div>
            <div>
              <label className="text-lg font-light text-yellow-900 mb-2">Designation:</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border p-2 placeholder-black rounded-md w-full"
              >
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-light text-yellow-900">Gender</h3>
            <div className="flex space-x-4 mb-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-light text-yellow-900">Courses</h3>
            <div className="flex gap-5">
              {["MCA", "BCA", "BSC"].map((course) => (
                <label key={course} className="flex items-center">
                  <input
                    type="checkbox"
                    name="courses"
                    value={course}
                    checked={formData.courses.includes(course)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {course}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-light text-yellow-900">Upload Image</h3>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="border p-2 placeholder-black rounded-md w-full"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full mt-6">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;
