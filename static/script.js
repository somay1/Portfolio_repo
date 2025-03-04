document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".add-todo-input");
    const addButton = document.querySelector(".btn-add");
    const todoList = document.querySelector(".todo-list");
    const completionMessage = document.querySelector(".completion-message");

    // Load Tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    // Save Tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".todo-item").forEach(item => {
            const taskText = item.querySelector(".todo-text").innerText;
            const isCompleted = item.classList.contains("completed");
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add Task to the List
    function addTaskToDOM(text, completed = false) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("todo-item");
        if (completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <h2 class="m-0 p-0">
                <i class="fa ${completed ? "fa-check-square-o" : "fa-square-o"} text-primary btn toggle-complete"></i>
            </h2>
            <span class="todo-text">${text}</span>
            <div class="todo-actions">
                <i class="fa fa-trash-o text-danger btn delete-task"></i>
            </div>
        `;

        // Toggle Completion
        taskItem.querySelector(".toggle-complete").addEventListener("click", function () {
            taskItem.classList.toggle("completed");
            this.classList.toggle("fa-check-square-o");
            this.classList.toggle("fa-square-o");
            saveTasks();
            showCompletionMessage();
        });

        // Delete Task
        taskItem.querySelector(".delete-task").addEventListener("click", function () {
            taskItem.remove();
            saveTasks();
        });

        // Append to List
        todoList.appendChild(taskItem);
        saveTasks();
    }

    // Show Completion Message
    function showCompletionMessage() {
        if (document.querySelectorAll(".todo-item.completed").length > 0) {
            completionMessage.style.display = "block";
            setTimeout(() => {
                completionMessage.style.display = "none";
            }, 2000);
        }
    }

    // Add Task Event
    addButton.addEventListener("click", function () {
        const taskText = inputField.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            inputField.value = "";
        }
    });

    // Load Tasks on Page Load
    loadTasks();
});
