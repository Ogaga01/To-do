'use strict'

const refresh = document.querySelector(".fa-arrows-rotate");
const textInput = document.querySelector('.text-input')
let checkbox 
let listInput 
let deleteInput
const deleteBtn = document.querySelector('.submit')
const listContainer = document.querySelector(".todo");
let tasks = [];

class Task {
    date = new Date();
    id = (`${Date.now()}`).slice(-10)
    checked = false
    constructor(description) {
        this.description = description
    }
}

const renderTask = (task) => {
    const html = `
        <li id="${task.id}" class="list-item">
                <div class="state">
                    <i class="fa-regular active fa-square"></i>
                    <span class="span">✔</span>
                </div>
                <input type="text" class="list-input" value="${task.description}">
                <i class="fa-solid fa-trash-can"></i>
            </li>
    `;
    listContainer.insertAdjacentHTML('afterbegin', html)
}

const setLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));

  if (!data) return;

  tasks = data;

  tasks.forEach((task) => {
    renderTask(task);
  });
};
getLocalStorage()

textInput.addEventListener('keydown', (e) => {
    const input = textInput.value
    if (e.key === 'Enter' && input !== '') {
        const task = new Task(input)
        renderTask(task)
        tasks.push(task)
        setLocalStorage(tasks)
        textInput.value = ''
    }
})
