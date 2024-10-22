document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseName = document.getElementById('expenseName');
    const amount = document.getElementById('amount');
    const category = document.getElementById('category');
    const expenseList = document.getElementById('expense-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const totalAmount = document.getElementById('total-amount');
    const addButton = document.getElementById('addButton');
    const editButton = document.getElementById('editButton');

    let expenses = [];
    let totalExpensesValue = 0;
    let selectedExpenseIndex = null;

    // Function to update the summary section
    function updateSummary() {
        totalExpensesValue = expenses.reduce((total, expense) => total + expense.amount, 0);
        totalExpenses.textContent = totalExpensesValue;
        totalAmount.textContent = 0 - totalExpensesValue; // Assuming no income for now
    }

    // Function to add an expense to the table
    function addExpenseToTable(expense, index) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>Rs ${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    }

    // Function to refresh the expense list table
    function refreshTable() {
        expenseList.innerHTML = ''; // Clear the table
        expenses.forEach((expense, index) => addExpenseToTable(expense, index)); // Re-populate
    }

    // Function to clear form fields
    function clearForm() {
        expenseName.value = '';
        amount.value = '';
        category.value = 'Food';
        selectedExpenseIndex = null;
        addButton.style.display = 'block';
        editButton.style.display = 'none';
    }

    // Function to handle Add button click
    addButton.addEventListener('click', () => {
        const expense = {
            name: expenseName.value,
            amount: Number(amount.value),
            category: category.value,
            date: new Date().toLocaleDateString()
        };

        if (!expense.name || !expense.amount) return;

        expenses.push(expense); // Add new expense
        refreshTable(); // Update the table
        updateSummary(); // Update totals
        clearForm(); // Clear the form
    });

    // Function to handle Edit button click
    editButton.addEventListener('click', () => {
        if (selectedExpenseIndex !== null) {
            expenses[selectedExpenseIndex] = {
                name: expenseName.value,
                amount: Number(amount.value),
                category: category.value,
                date: new Date().toLocaleDateString()
            };

            refreshTable(); // Update the table
            updateSummary(); // Update totals
            clearForm(); // Clear the form
        }
    });

    // Function to handle Edit/Delete actions from the table
    expenseList.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');

        if (e.target.classList.contains('edit-btn')) {
            selectedExpenseIndex = index;
            const expense = expenses[selectedExpenseIndex];

            // Populate the form with existing data for editing
            expenseName.value = expense.name;
            amount.value = expense.amount;
            category.value = expense.category;

            addButton.style.display = 'none';
            editButton.style.display = 'block';
        }

        if (e.target.classList.contains('delete-btn')) {
            expenses.splice(index, 1); // Remove the selected expense
            refreshTable(); // Update the table
            updateSummary(); // Update totals
        }
    });
});
