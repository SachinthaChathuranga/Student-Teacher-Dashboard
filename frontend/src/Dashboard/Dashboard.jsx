import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TeacherDashBoard from "./Teacher/TeacherDashBoard";
import axios from "axios";

export default function Dashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        console.log(res.data);
        if (res.data.valid) {
          setName(res.data.username);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8081/logout")
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[90vw] bg-slate-200 m-auto">
      <div className="flex justify-between">
        welcome {name} DashBoard
        <div className=" bg-red-600 p-2">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {/* <Link to={"/teacher"}>Teacher</Link> */}
      <Routes>
        <Route path="/teacher/*" element={<TeacherDashBoard />}></Route>
      </Routes>
    </div>
  );
}
