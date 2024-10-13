// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If the taskText is undefined or empty, return early
        if (!taskText) return;

        // Create a new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a 'Remove' button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // Use classList.add() to add the class

        // Add an event listener to the 'Remove' button to remove the task
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText); // Remove from Local Storage
        });

        // Append the remove button to the li element
        li.appendChild(removeBtn);

        // Append the new li element to the task list
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = "";

        // Save task to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Function to save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Call addTask with the trimmed input value
    });

    // Allow adding tasks by pressing the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText); // Call addTask with the trimmed input value
        }
    });
});
