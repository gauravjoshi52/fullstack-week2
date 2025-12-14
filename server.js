const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory database
let students = [];
let id = 1;

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Student Management API");
});

// GET all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// POST add new student
app.post("/api/students", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const student = { id: id++, name, email, age };
  students.push(student);

  res.status(201).json(student);
});

// DELETE student
app.delete("/api/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(s => s.id !== studentId);
  res.json({ message: "Student deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
