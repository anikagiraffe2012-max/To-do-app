const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const stored = localStorage.getItem('tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task,index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button class="complete-btn" data-index="${index}">✔️</button>
                <button class="delete-btn" data-index="${index}">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    })
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    tasks.push({text: text, completed: false});
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function deleteTask(index) {
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

taskList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-btn')) {
        const index = target.getAttribute('data-index');
        deleteTask(parseInt(index));
    } else if (target.classList.contains('complete-btn')) {
        const index = target.getAttribute('data-index');
        toggleComplete(parseInt(index));
    }
})

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

loadTasks();
renderTasks();
