const employees = getEmployees();
let filteredEmployees = [...employees];
const rowsPerPage = 5;
let currentPage = 1;

function renderTable() {
    const tbody = document.querySelector('#table tbody');
    tbody.innerHTML = '';

    const activeEmployees = filteredEmployees;
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedEmployees = activeEmployees.slice(start, start + rowsPerPage);

    paginatedEmployees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joining_date}</td>
            <td><i class="delete-icon fa-solid fa-trash" onclick="deleteEmployee(${employees.indexOf(employee)})"></i></td>
        `;
        tbody.appendChild(row);
    });

    renderPagination(activeEmployees.length);
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    saveEmployees(employees);
    filteredEmployees = [...employees];
    renderTable();
}

function renderPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i
        button.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        if (i === currentPage) button.style.fontWeight = 'bold';
        pagination.appendChild(button);
    }
}

function handleSearch(query) {
    filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderTable();
}

if (search) {
    document.getElementById('search').addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();
        handleSearch(query);
    });
}

renderTable();
