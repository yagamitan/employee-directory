import express from "express";
import employees from "#db/employees";

const app = express();

let lastRandomEmployeeId = null;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/random", (req, res) => {
  const choices = employees.filter(
    (employee) => employee.id !== lastRandomEmployeeId,
  );

  const randomEmployee = choices[Math.floor(Math.random() * choices.length)];

  lastRandomEmployeeId = randomEmployee.id;
  res.json(randomEmployee);
});

app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);

  const employee = employees.find((employee) => employee.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found.");
  }
});

export default app;
