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
