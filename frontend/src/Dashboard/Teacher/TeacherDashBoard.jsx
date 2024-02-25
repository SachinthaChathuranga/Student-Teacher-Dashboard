import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import TeacherHome from "./TeacherHome";
import StudentsList from "./StudentsList";
import AddStudents from "./AddStudents";
import ShowStudent from "./ShowStudent";
import EditStudent from "./EditStudent";

export default function TeacherDashBoard() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<TeacherHome />}></Route>
        <Route exact path="/student-list/" element={<StudentsList />}></Route>
        <Route exact path="/add-student/" element={<AddStudents />}></Route>
        <Route exact path="/show-student/:id" element={<ShowStudent />}></Route>
        <Route exact path="/edit-student/:id" element={<EditStudent />}></Route>
      </Routes>
    </div>
  );
}
