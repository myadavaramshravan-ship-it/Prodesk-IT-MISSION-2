let salary = 0;
let expenses = [];


window.onload = function () {
  const savedSalary = localStorage.getItem("salary");
  const savedExpenses = localStorage.getItem("expenses");

  if (savedSalary) {
    salary = parseInt(savedSalary);
    document.getElementById("salaryDisplay").innerText = salary;
  }

  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    displayExpenses();
  }

  updateBalance();
  updateChart();
};

function setSalary() {
  const input = document.getElementById("salary").value;

  if (input <= 0) {
    alert("Enter valid salary");
    return;
  }

  salary = parseInt(input);
  localStorage.setItem("salary", salary);
  document.getElementById("salaryDisplay").innerText = salary;

  updateBalance();
  updateChart();
}

function addExpense() {
  const name = document.getElementById("expenseName").value;
  const amount = document.getElementById("expenseAmount").value;

  if (name === "" || amount === "" || amount <= 0) {
    alert("Invalid expense!");
    return;
  }

  expenses.push({ name, amount: parseInt(amount) });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateBalance();
  updateChart();

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}

function displayExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach((exp, next) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${exp.name} - ₹${exp.amount}
      <span class="delete" onclick="deleteExpense(${next})">🗑️</span>
    `;

    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateBalance();
  updateChart();
}

function updateBalance() {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = salary - totalExpenses;

  document.getElementById("balance").innerText = balance;
}
let chart;

function updateChart() {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = salary - totalExpenses;

  const data = {
    labels: ["Expenses", "Remaining"],
    datasets: [{
      data: [totalExpenses, balance]
    }]
  };

  if (chart) chart.destroy();

  const ctx = document.getElementById("myChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "pie",
    data: data
  });
}