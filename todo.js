//selectors
const todoBnt=document.querySelector('.todo-btn')
const todoInput=document.querySelector('.todo-input')
const todoUl=document.querySelector('.todo-list')
const notification = document.querySelector('.notification');

//event listeners
document.addEventListener('DOMContentLoaded',loadTasksFromLocalStorage);
todoBnt.addEventListener('click',addTask)
todoUl.addEventListener("click",handleTaskAction)
//functions
function showNotification(message) {
    notification.innerText = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000); // Notification disappears after 2 seconds
}
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTask(e){
    e.preventDefault()
    if (todoInput.value.trim() === "") {
        showNotification("Task cannot be empty!");
        return;
    }
    const taskText = todoInput.value.trim();
    const task = { text: taskText, completed: false };
    createTaskElement(task);

    // Save to localStorage
    saveTaskToLocalStorage(task);

    // Show success notification
    showNotification("Task added successfully!");

    // Clear input value
    todoInput.value = "";
}
function handleTaskAction(e){

    let item = e.target

    if(item.classList[0] === "check"){
        const todo =item.parentElement
        const tododiv = todo.querySelector(".todo-item");
        todo.classList.toggle("cheked")
        showNotification("Task marked as completed!");
    }
    if(item.classList[0] === "trash"){
        const todo =item.parentElement
        const tododiv = todo.querySelector(".todo-item");
        todo.classList.toggle("falled")
        todo.addEventListener('transitionend',() => {
            todo.remove()
            removeTaskFromLocalStorage(tododiv.innerText);
            showNotification("Task deleted successfully!");
        })
    }
    if (item.classList.contains("edit")) {
        const todo = item.parentElement;
        const tododiv = todo.querySelector(".todo-item");
        const currentText = tododiv.innerText;

        // Prompt for new text
        const newText = prompt("Edit your task:", currentText);
        if (newText) {
            tododiv.innerText = newText;
            updateTaskInLocalStorage(currentText, newText);
            showNotification("Task edited successfully!");
        }}
}
//create li
    const todoli = document.createElement("li");
    todoli.classList.add("todo");
//create div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo-item");
//add input value div
    tododiv.innerText=todoInput.value;
//create check
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML='<i class="fa-solid fa-check"></i>';
//crete trash
    const trachBtn = document.createElement("button");
    trachBtn.classList.add("fall");
    trachBtn.innerHTML='<i class="fa-solid fa-trash"></i>';
// create edit
const editBtn = document.createElement("button");
editBtn.classList.add("edit");
editBtn.innerHTML = '<i class="fa-solid fa-edit"></i>'


function createTaskElement(task) {
    const todoli = document.createElement("li");
    todoli.classList.add("todo");

    if (task.completed) {
        todoli.classList.add("checked");
    }

    const tododiv = document.createElement("div");
    tododiv.classList.add("todo-item");
    tododiv.innerText = task.text;

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = '<i class="fa-solid fa-edit"></i>';

    todoli.appendChild(tododiv);
    todoli.appendChild(checkBtn);
    todoli.appendChild(editBtn);
    todoli.appendChild(trashBtn);

    todoUl.appendChild(todoli);
}
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}




