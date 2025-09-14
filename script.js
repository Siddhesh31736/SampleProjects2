    const form = document.getElementById('studentForm');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const gradeInput = document.getElementById('grade');
    const editIndexInput = document.getElementById('editIndex');
    const tableBody = document.getElementById('studentTable');
    const successMsg = document.getElementById('successMsg');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    function showMessage(message) {
        successMsg.textContent = message;
        successMsg.style.display = 'block';
        setTimeout(() => { successMsg.style.display = 'none'; }, 2000);
    }

    function renderTable() {
        tableBody.innerHTML = '';
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>
                    <button onclick="editStudent(${index})" class="edit">Edit</button>
                    <button onclick="deleteStudent(${index})" class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    renderTable();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const grade = gradeInput.value.trim();

        if (!name || !age || !grade) return alert('Please fill all fields');

        const editIndex = editIndexInput.value;
        if (editIndex) {
            // Update existing
            students[editIndex] = {name, age, grade};
            editIndexInput.value = '';
            form.querySelector('button').textContent = 'Add Student';
            showMessage('Student updated successfully!');
        } else {
            // Add new
            students.push({name, age, grade});
            showMessage('Student added successfully!');
        }

        localStorage.setItem('students', JSON.stringify(students));
        form.reset();
        renderTable();
    });

    function editStudent(index) {
        const student = students[index];
        nameInput.value = student.name;
        ageInput.value = student.age;
        gradeInput.value = student.grade;
        editIndexInput.value = index;
        form.querySelector('button').textContent = 'Update Student';
    }

    function deleteStudent(index) {
        if (confirm('Are you sure you want to delete this student?')) {
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            renderTable();
            showMessage('Student deleted successfully!');
        }
    }