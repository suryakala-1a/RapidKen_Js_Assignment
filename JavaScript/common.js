const hamburger = document.getElementById('hamburger');
const search = document.getElementById('search');


function getEmployees() {
    return JSON.parse(localStorage.getItem('employees')) || [];
}

function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

if (hamburger) {
    hamburger.addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('show');
    });
}