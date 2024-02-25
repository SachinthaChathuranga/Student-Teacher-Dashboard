import mysql from "mysql";
import express, { response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken"; // new
import bcrypt from "bcrypt"; // new
import cookieParser from "cookie-parser"; // new
import session from "express-session"; // new
import bodyParser from "body-parser"; // new

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); //new
app.use(bodyParser.json()); //new
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 100 * 60 * 60 * 24,
    },
  })
); //new

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project-react-crud",
});

// Login.jsx
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM teachers WHERE name = (?) AND mobile = (?)";
  const values = [req.body.name, req.body.password];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Message: "Login error in server" });
    }
    if (result.length > 0) {
      req.session.username = result[0].name;
      return res.json({ Login: true, username: req.body.username });
      //   return res.json({ Status: "Success" });
    } else {
      return res.json({ Login: false });
      //   return res.json({ Message: "No name existed!" });
    }
  });
});

app.get("/", (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
      return res.json({ Message: "Login error in server" });
    } else {
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logout successful" });
    }
  });
});

// Adding Students into student table
app.post("/add-student", (req, res) => {
  const sql = "INSERT INTO students (name,address, gender, mobile) VALUES (?)";
  const values = [
    req.body.name,
    req.body.address,
    req.body.gender,
    req.body.mobile,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json({ Message: "error in Node" });
    } else {
      return res.json(result);
    }
  });
});

// StudentList.jsx
app.get("/list", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ Message: "error in Node" });
    } else {
      return res.json(result);
    }
  });
});

// StudentList.jsx => delete
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE id = ?";
  const id = req.params.id;
  db.query(sql, id, (err, result) => {
    if (err) {
      return res.json({ Message: "error inside Node" });
    } else {
      return res.json(result);
    }
  });
});

//ShowStudent.jsx
app.get("/show/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      return res.json({ Message: "error inside server" });
    }
    return res.json(result);
  });
});

// EditStudent.jsx
app.put("/update-student/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE students SET name = ? ,address = ?, gender= ?, mobile =?  WHERE id=? ";
  const name = req.body.name;
  const address = req.body.address;
  const gender = req.body.gender;
  const mobile = req.body.mobile;
  db.query(sql, [name, address, gender, mobile, id], (err, result) => {
    if (err) {
      return res.json({ Message: "error in Node" });
    } else {
      return res.json(result);
    }
  });
});

app.listen(8081, () => {
  console.log("Listening...");
});
