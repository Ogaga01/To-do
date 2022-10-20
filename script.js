'use strict'

const refresh = document.querySelector(".fa-arrows-rotate");
const textInput = document.querySelector('.text-input')
let checkbox 
let listInput 
let deleteInput
const deleteBtn = document.querySelector('.submit')
const listContainer = document.querySelector(".todo");

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

textInput.addEventListener('keydown', (e) => {
    const input = textInput.value
    if (e.key === 'Enter' && input !== '') {
        const task = new Task(input)
        renderTask(task)
        textInput.value = ''
    }
})
