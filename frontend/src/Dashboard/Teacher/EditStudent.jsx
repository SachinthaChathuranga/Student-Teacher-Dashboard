import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const inputStyle = "border border-slate-500 w-[200px] bg-transparent";
const divStyle = "p-2 flex justify-between gap-2";

export default function EditStudent() {
  const { id } = useParams();
  //   const [values, setValues] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8081/show/" + id)
      .then((res) => {
        // setValues(res.data[0]);
        setStudent({
          ...student,
          name: res.data[0].name,
          address: res.data[0].address,
          gender: res.data[0].gender,
          mobile: res.data[0].mobile,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    element.preventDefault();
    // console.log(student);
    axios
      .put("http://localhost:8081/update-student/" + id, student)
      .then((res) => {
        navigate("/teacher/student-list");
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
            value={student.name}
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
            value={student.address}
            onChange={handleInput}
            className={inputStyle}
          />
        </div>
        {/* Gender */}
        <div className={divStyle}>
          <label htmlFor="">Gender : </label>
          <select
            name="gender"
            id=""
            value={student.gender}
            className={inputStyle}
            onChange={handleInput}
          >
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
            value={student.mobile}
            onChange={handleInput}
            className={inputStyle}
          />
        </div>

        <div>
          <button
            className=" bg-green-600 p-2 mt-10 rounded-lg px-4 w-full"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
