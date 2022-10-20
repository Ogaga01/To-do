const refresh = document.querySelector('.fa-arrows-rotate');
const textInput = document.querySelector('.text-input');
let checkbox;
let listInput;
let deleteInput;
let mark;
const deleteBtn = document.querySelector('.submit');
const listContainer = document.querySelector('.todo');
let tasks = [];

class Task {
  date = new Date();

  id = `${Date.now()}`.slice(-10);

  checked = false;

  constructor(description) {
    this.description = description;
  }
}

const renderTask = (task) => {
  if (task.checked === false) {
    const html = `
        <li id="${task.id}" class="list-item">
                <div class="state">
                    <i class="fa-regular active fa-square"></i>
                </div>
                <input type="text" class="list-input" value="${task.description}">
                <i class="fa-solid fa-trash-can"></i>
            </li>
    `;
    listContainer.insertAdjacentHTML('afterbegin', html);
  }

  if (task.checked === true) {
    const html = `
        <li id="${task.id}" class="list-item">
                <div class="state">
                    <span class="active">✔</span>
                </div>
                <input type="text" class="list-input line-through" value="${task.description}">
                <i class="fa-solid fa-trash-can"></i>
            </li>
    `;
    listContainer.insertAdjacentHTML('afterbegin', html);
  }
};

const setLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('tasks'));

  if (!data) return;

  tasks = data;

  tasks.forEach((task) => {
    renderTask(task);
  });
};
getLocalStorage();

textInput.addEventListener('keydown', (e) => {
  const input = textInput.value;
  if (e.key === 'Enter' && input !== '') {
    const task = new Task(input);
    renderTask(task);
    tasks.push(task);
    setLocalStorage(tasks);
    textInput.value = '';
  }
});

listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-square')) {
    checkbox = e.target;
    const listItem = checkbox.closest('.list-item');
    const id = listItem.getAttribute('id');
    tasks.forEach((task) => {
      if (task.id === id) {
        task.checked = true;
      }
    });
    setLocalStorage(tasks);
    listContainer.innerHTML = '';
    getLocalStorage();
    checkbox.classList.remove('active');
    checkbox.classList.add('span');
  }

  if (e.target.classList.contains('active')) {
    mark = e.target;
    const listItem = mark.closest('.list-item');
    const id = listItem.getAttribute('id');
    tasks.forEach((task) => {
      if (task.id === id) {
        task.checked = false;
      }
    });
    setLocalStorage(tasks);
    listContainer.innerHTML = '';
    getLocalStorage();
  }

  if (e.target.classList.contains('fa-trash-can')) {
    deleteInput = e.target;
    const listItem = deleteInput.closest('.list-item');
    const id = listItem.getAttribute('id');
    tasks = tasks.filter((task) => id !== task.id);
    setLocalStorage(tasks);
    listContainer.innerHTML = '';
    getLocalStorage();
  }

  if (e.target.classList.contains('list-input')) {
    listInput = e.target;
    listInput.addEventListener('keydown', (e) => {
      const { value } = listInput;
      if (e.key === 'Enter') {
        const listItem = listInput.closest('.list-item');
        const id = listItem.getAttribute('id');
        tasks.forEach((task) => {
          if (task.id === id) {
            task.description = value;
          }
        });
        setLocalStorage(tasks);
        listContainer.innerHTML = '';
        getLocalStorage();
      }
    });
  }
});

refresh.addEventListener('click', () => {
  listContainer.innerHTML = '';
  getLocalStorage();
});

deleteBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => task.checked === false);
  setLocalStorage(tasks);
  listContainer.innerHTML = '';
  getLocalStorage();
});
