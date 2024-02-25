import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate("");

  const handleInput = (element) => {
    setUser((prev) => ({
      ...prev,
      [element.target.name]: element.target.value,
    }));
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        console.log(res.data);
        if (res.data.valid) {
          navigate("/teacher");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (element) => {
    element.preventDefault();
    axios
      .post("http://localhost:8081/login/", user)
      .then((res) => {
        if (res.data.Login) {
          navigate("/teacher/student-list");
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-fit p-10 m-auto border border-green-600 rounded-3xl mt-10 text-green-600 font-bold">
      <form action="">
        <h1 className="text-center font-bold font-[poppins] text-4xl underline mb-10 text-green-600">
          Login
        </h1>
        <div className="p-5 flex gap-4 justify-between">
          <label htmlFor="">Name : </label>
          <input
            onChange={handleInput}
            className="border border-slate-600"
            type="text"
            name="name"
          />
        </div>
        <div className="p-5 flex gap-4 justify-between">
          <label htmlFor="">Password : </label>
          <input
            onChange={handleInput}
            className="border border-slate-600"
            type="password"
            name="password"
          />
        </div>
        <div className="bg-green-600 mt-10 mx-5 p-1 rounded-lg text-white font-bold font-[poppins]">
          <button onClick={handleSubmit} className="text-center w-full">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
