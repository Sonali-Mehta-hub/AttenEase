let students = [];
const validUsername = "teacher"; // Example username
const validPassword = "password"; // Example password

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    if (username === validUsername && password === validPassword) {
        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("attendanceContainer").classList.remove("hidden");
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

// Handle student form submission
document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;

    // Add student to the array
    students.push({ name, rollNo, present: null });
    renderStudentTable();
    document.getElementById("name").value = '';
    document.getElementById("rollNo").value = '';
});

// Render the student table
function renderStudentTable() {
    const tableBody = document.getElementById("studentTable").querySelector("tbody");
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td class="${student.present === null ? '' : student.present ? 'status' : 'absent'}">
                ${student.present === null ? 'Not Marked' : student.present ? 'Present' : 'Absent'}
            </td>
            <td>
                <button onclick="markAttendance(${index}, true)">Present</button>
                <button onclick="markAttendance(${index}, false)">Absent</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Mark attendance for a student
function markAttendance(index, status) {
    students[index].present = status;
    renderStudentTable();
}

// Handle attendance button click
document.getElementById("takeAttendanceBtn").addEventListener("click", function() {
    document.getElementById("attendanceContainer").classList.add("hidden");
    document.getElementById("attendancePage").classList.remove("hidden");
    renderAttendanceTable();
});

// Render the attendance table
function renderAttendanceTable() {
    const tableBody = document.getElementById("attendanceTable").querySelector("tbody");
    tableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td class="${student.present === null ? '' : student.present ? 'status' : 'absent'}">
                ${student.present === null ? 'Not Marked' : student.present ? 'Present' : 'Absent'}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle back button click
document.getElementById("backToTeacherBtn").addEventListener("click", function() {
    document.getElementById("attendancePage").classList.add("hidden");
    document.getElementById("attendanceContainer").classList.remove("hidden");
});