import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Dashboard/Login";
function App() {
  return (
    <div className="App">
      <div>
        <h1 className="text-3xl text-center">Welcome to School</h1>
      </div>

      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/teacher/*" element={<TeacherDashBoard />}></Route> */}

          {/* Not yet */}
          {/* <Route path="/student/*" element={<StudentDashboard />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
