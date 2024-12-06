import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Create = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        formDataToSend.append(key, value); // Directly append the image file
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          formDataToSend.append(`${key}[]`, item);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Employee created successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          courses: [],
          image: null,
        });
        navigate("/employ"); 

      } else {
        alert(data.error || "Failed to create employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#fffcf2] p-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto lg:py-6 py-2 px-8 lg:px-20 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Create Employee</h2>

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
                required
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
                required
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
                required
              />
            </div>
            <div>
              <label className="text-lg font-light text-yellow-900 mb-2">Designation:</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border p-2 placeholder-black rounded-md w-full"
                required
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

export default Create;
