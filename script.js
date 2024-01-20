document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDate");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var task = {
            text: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false,
            priority: 1 // Default priority
        };

        saveTask(task);

        var li = createTaskElement(task);
        taskList.appendChild(li);

        taskInput.value = "";
        dueDateInput.value = "";
    }
}

function createTaskElement(task) {
    var li = document.createElement("li");
    li.innerHTML = `
        <span>${task.text}</span>
        <span>${task.dueDate}</span>
        <span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        </span>
    `;

    if (task.completed) {
        li.classList.add("completed");
    }

    return li;
}

function completeTask(button) {
    var li = button.closest("li");
    li.classList.toggle("completed");

    var task = {
        text: li.children[0].textContent,
        dueDate: li.children[1].textContent,
        completed: li.classList.contains("completed"),
        priority: 1 // Default priority
    };

    updateTask(task);
}

function deleteTask(button) {
    var li = button.closest("li");
    var task = {
        text: li.children[0].textContent,
        dueDate: li.children[1].textContent,
        completed: li.classList.contains("completed"),
        priority: 1 // Default priority
    };

    deleteTaskFromStorage(task);
    li.remove();
}

function saveTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var index = tasks.findIndex(t => t.text === task.text && t.dueDate === task.dueDate);
    if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function deleteTaskFromStorage(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== task.text || t.dueDate !== task.dueDate);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        var li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

        