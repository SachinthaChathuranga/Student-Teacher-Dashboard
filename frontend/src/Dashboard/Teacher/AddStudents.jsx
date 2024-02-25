import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputStyle = "border border-slate-500 w-[200px] bg-transparent";
const divStyle = "p-2 flex justify-between gap-2";

export default function AddStudents() {
  const [student, setStudent] = useState({
    name: "",
    address: "",
    gender: "",
    mobile: "",
  });

  const navigate = useNavigate("");

  const handleInput = (element) => {
    setStudent((prev) => ({
      ...prev,
      [element.target.name]: element.target.value,
    }));
  };

  const handleSubmit = (element) => {
    // element.preventDefault();
    console.log(student);
    axios
      .post("http://localhost:8081/add-student", student)
      .then((res) => {
        navigate("/teacher/student-list/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="w-fit  m-auto p-10 ">
        {/* Name */}
        <div className={divStyle}>
          <label htmlFor="">Name : </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            className={inputStyle}
          />
        </div>
        {/* Address */}
        <div className={divStyle}>
          <label htmlFor="">Address : </label>
          <input
            type="text"
            name="address"
            onChange={handleInput}
            className={inputStyle}
          />
        </div>
        {/* Gender */}
        <div className={divStyle}>
          <label htmlFor="">Gender : </label>
          <select name="gender" id="" className={inputStyle} onChange={handleInput}>
            <option value=""></option>
            <option value="m">male</option>
            <option value="f">female</option>
          </select>
        </div>
        {/* Mobile */}
        <div className={divStyle}>
          <label htmlFor="">Phone Number : </label>
          <input
            type="text"
            name="mobile"
            onChange={handleInput}
            className={inputStyle}
          />
        </div>

        <div>
          <button
            className=" bg-green-600 p-2 mt-10 rounded-lg px-4 w-full"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
