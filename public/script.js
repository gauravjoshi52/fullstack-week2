console.log("JS Loaded");

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// inputs ko PROPERLY pakadna
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");

// Load students
function loadStudents() {
  fetch("/api/students")
    .then(res => res.json())
    .then(data => {
      table.innerHTML = "";

      data.forEach(s => {
        table.innerHTML += `
          <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.age}</td>
            <td>
              <button onclick="deleteStudent(${s.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// ADD student
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value
  };

  console.log("Sending:", student); // DEBUG

  fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      loadStudents();
    });
});

// DELETE student
function deleteStudent(id) {
  fetch(`/api/students/${id}`, {
    method: "DELETE"
  })
    .then(() => loadStudents());
}

// Initial load
loadStudents();
