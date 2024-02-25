import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShowStudent() {
  const [student, setStudent] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/show/" + id)
      .then((res) => {
        // console.log(res.data[0]);
        setStudent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-fit m-auto my-10 text-2xl">
      <h1 className="text-center text-3xl font-bold underline">
        Student No.{student.id}{" "}
      </h1>
      <div>Name : {student.name}</div>
      <div>Address : {student.address}</div>
      <div>gender : {student.gender}</div>
      <div>Phone No : {student.mobile}</div>
    </div>
  );
}
