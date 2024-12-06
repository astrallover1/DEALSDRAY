import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Card, Typography, Input } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [count,setCount] = useState(0);
  const [filter, setFilter] = useState(""); // State for filter input
  const navigate = useNavigate();

  // Fetch employee data from API on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employeesall")
      .then((response) => {
        setEmployees(response.data.employees);
        setCount(response.data.count);

      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:5000/api/employees/${id}`)
        .then((response) => {
          console.log("Employee deleted successfully:", response.data);
          fetchEmployees(); // Refresh the employee list
        })
        .catch((error) => {
          console.error("There was an error deleting the employee!", error);
        });
    }
  };

  const TABLE_HEAD = [
    "Unique Id",
    "Image",
    "Name",
    "Email",
    "Mobile No",
    "Designation",
    "Gender",
    "Course",
    "Create Date",
    "Action",
  ];

  // Filter employees dynamically based on input
  const filteredEmployees = employees.filter((employee) => {
    const keyword = filter.toLowerCase();
    return (
      employee._id.toLowerCase().includes(keyword) ||
      employee.name.toLowerCase().includes(keyword) ||
      employee.email.toLowerCase().includes(keyword) ||
      employee.mobile.toLowerCase().includes(keyword) ||
      employee.designation.toLowerCase().includes(keyword) ||
      employee.gender.toLowerCase().includes(keyword) ||
      (Array.isArray(employee.courses) &&
        employee.courses.some((course) =>
          course.toLowerCase().includes(keyword)
        )) ||
      new Date(employee.createdAt).toLocaleDateString().includes(keyword)
    );
  });

  return (
    <>
      <Navbar />
      <div className="bg-[#fffcf2] p-10">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search employees..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md p-2 border rounded"
          />
        </div>
        <div><h1>Total Count:{count}</h1></div>
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => {
                const {
                  _id,
                  name,
                  email,
                  mobile,
                  designation,
                  gender,
                  courses,
                  image,
                  createdAt,
                } = employee;
                return (
                  <tr key={_id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {_id}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <img
                        src={`http://localhost:5000/uploads/${image || "default.jpg"}`}
                        alt={name}
                        width={50}
                        height={50}
                        className="w-15 h-15 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "http://localhost:5000/images/default.jpg";
                        }}
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {email}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {mobile}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {designation}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {gender}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {Array.isArray(courses) ? courses.join(", ") : courses || "N/A"}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {new Date(createdAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium cursor-pointer"
                        onClick={() => navigate(`/updateEmployee/${_id}`, { state: { employee } })}
                      >
                        Edit
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="red"
                        className="font-medium cursor-pointer"
                        onClick={() => deleteEmployee(_id)}
                      >
                        Delete
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

export default Employee;
