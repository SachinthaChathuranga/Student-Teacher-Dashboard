import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const thStyle = "border border-slate-700 p-2 px-10 text-lg";
export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/list")
      .then((res) => {
        // console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(students[0]);
  }, []);

  const handleDelete = (element) => {
    axios
      .delete("http://localhost:8081/delete/" + element)
      .then(() => {
        window.location.reload();
        // navigate("/teacher/student-list/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="w-fit bg-green-600 p-2 m-auto my-5 rounded-lg px-4">
        <Link
          to="/teacher/add-student"
          className="font-bold font-[poppins] text-lg"
        >
          Add Students +
        </Link>
      </div>
      <table className="m-auto">
        <thead>
          <tr>
            <th className={thStyle}>No</th>
            <th className={thStyle}>Name</th>
            <th className={thStyle}>Address</th>
            <th className={thStyle}>Gender</th>
            <th className={thStyle}>Phone No</th>
            <th className={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, index) => {
            return (
              <tr key={index}>
                <td className={thStyle}>{stu.id}</td>
                <td className={thStyle}>{stu.name}</td>
                <td className={thStyle}>{stu.address}</td>
                <td className={thStyle}>{stu.gender}</td>
                <td className={thStyle}>{stu.mobile}</td>
                <td className={thStyle}>
                  <Link
                    to={`/teacher/show-student/${stu.id}`}
                    className="p-2 text-white bg-yellow-600 mx-1 rounded-lg hover:text-black"
                  >
                    Show
                  </Link>
                  <Link
                    to={`/teacher/edit-student/${stu.id}`}
                    className="p-2 text-white bg-blue-600 mx-1 rounded-lg hover:text-black"
                  >
                    Edit
                  </Link>
                  {/* <Link to='/' className="p-2 text-white bg-red-600 mx-1 rounded-lg hover:text-black">Delete</Link> */}
                  <button
                    onClick={() => {
                      handleDelete(stu.id);
                    }}
                    className="p-2 text-white bg-red-600 mx-1 rounded-lg hover:text-black"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
