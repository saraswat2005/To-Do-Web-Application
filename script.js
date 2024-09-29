document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskPriority = document.getElementById('taskPriority');
    const taskText = taskInput.value.trim();
    const priority = taskPriority.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        addedAt: new Date().toLocaleString(),
        priority: priority,
    };
    
    appendTaskToList(task);
    taskInput.value = '';
}

function appendTaskToList(task) {
    const pendingTasksList = document.getElementById('pendingTasksList');
    
    const li = document.createElement('li');
    li.innerHTML = `
        ${task.text} (Added: ${task.addedAt}, Priority: ${task.priority})
        <div class="button-container">
            <button class="completeBtn">Complete</button>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;
    
    const completeBtn = li.querySelector('.completeBtn');
    completeBtn.addEventListener('click', () => markAsComplete(task, li));
    
    const editBtn = li.querySelector('.editBtn');
    editBtn.addEventListener('click', () => editTask(task, li));
    
    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => deleteTask(li));
    
    pendingTasksList.appendChild(li);
}

function markAsComplete(task, li) {
    const completedTasksList = document.getElementById('completedTasksList');
    li.classList.add('completed');

    const completedTime = new Date().toLocaleString();
    li.innerHTML = `
        ${task.text} (Added: ${task.addedAt}, Completed: ${completedTime}, Priority: ${task.priority})
        <div class="button-container">
            <button class="deleteBtn">Delete</button>
        </div>
    `;
    
    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => deleteTask(li));

    completedTasksList.appendChild(li);
}

function editTask(task, li) {
    const newTaskText = prompt("Edit your task:", task.text);
    const newPriority = prompt("Edit priority (Low, Medium, High):", task.priority);
    
    if (newTaskText) {
        task.text = newTaskText;
        task.priority = newPriority;
        li.innerHTML = `
            ${task.text} (Added: ${task.addedAt}, Priority: ${task.priority})
            <div class="button-container">
                <button class="completeBtn">Completed</button>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;
        
        li.querySelector('.completeBtn').addEventListener('click', () => markAsComplete(task, li));
        li.querySelector('.editBtn').addEventListener('click', () => editTask(task, li));
        li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(li));
    }
}

function deleteTask(li) {
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    if (pendingTasksList.contains(li)) {
        pendingTasksList.removeChild(li);
    } else {
        completedTasksList.removeChild(li);
    }
}