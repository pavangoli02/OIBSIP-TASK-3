// Function to get the current date and time
function getCurrentDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        const taskObject = {
            task: task,
            datetime: getCurrentDateTime(),
            completed: false
        };

        const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        pendingTasks.push(taskObject);
        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));

        displayPendingTasks();

        taskInput.value = '';
    }
}

// Function to display the pending tasks
function displayPendingTasks() {
    const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const pendingTasksList = document.getElementById('pendingTasks');
    pendingTasksList.innerHTML = '';

    pendingTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = `${task.task} - Added: ${task.datetime}`;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.onclick = function () {
            markTaskComplete(task);
        };
        taskActions.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = function () {
            editTask(task);
        };
        taskActions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function () {
            deleteTask(task);
        };
        taskActions.appendChild(deleteButton);

        li.appendChild(taskActions);
        pendingTasksList.appendChild(li);
    });
}

// Function to mark a task as complete
function markTaskComplete(task) {
    const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    const completedTask = pendingTasks.find(t => t.task === task.task);
    completedTask.completed = true;
    completedTask.datetime = getCurrentDateTime();
    completedTasks.push(completedTask);

    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks.filter(t => t.task !== task.task)));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

    displayPendingTasks();
    displayCompletedTasks();
}

// Function to display the completed tasks
function displayCompletedTasks() {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    const completedTasksList = document.getElementById('completedTasks');
    completedTasksList.innerHTML = '';

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = `${task.task} - Completed: ${task.datetime}`;
        li.classList.add('completed');

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function () {
            deleteTask(task);
        };
        taskActions.appendChild(deleteButton);

        li.appendChild(taskActions);
        completedTasksList.appendChild(li);
    });
}

// Function to delete a task
function deleteTask(task) {
    const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks.filter(t => t.task !== task.task)));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks.filter(t => t.task !== task.task)));

    displayPendingTasks();
    displayCompletedTasks();
}

// Function to edit a task
function editTask(task) {
    const newTask = prompt('Enter the new task:', task.task);
    if (newTask !== null) {
        const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

        const taskIndex = pendingTasks.findIndex(t => t.task === task.task);
        if (taskIndex !== -1) {
            pendingTasks[taskIndex].task = newTask;
            localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
        } else {
            const completedTaskIndex = completedTasks.findIndex(t => t.task === task.task);
            if (completedTaskIndex !== -1) {
                completedTasks[completedTaskIndex].task = newTask;
                localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            }
        }

        displayPendingTasks();
        displayCompletedTasks();
    }
}

// Initial setup
displayPendingTasks();
displayCompletedTasks();

