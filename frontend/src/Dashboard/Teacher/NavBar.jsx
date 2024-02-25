import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <ul className="flex justify-between px-[20vw] py-1 bg-blue-500 text-slate-50 font-bold font-[poppins]">
        <li>
          <Link to="/teacher">Home</Link>
        </li>
        <li><Link to="/teacher/student-list/">Students</Link></li>
        <li>Teachers</li>
        <li>user</li>
      </ul>
    </div>
  );
}
