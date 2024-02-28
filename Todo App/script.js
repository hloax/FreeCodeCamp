const taskForm = document.getElementById('task-form');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');
const tasksContainer = document.getElementById('tasks-container');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');

const taskData = JSON.parse(localStorage.getItem("data"))||[];
let currentTask = {};

const addOrUpdateTask = () => {
    const isUpdating = Object.keys(currentTask).length > 0; // Check if currentTask is not empty

    if (!isUpdating) {
        addOrUpdateTaskBtn.innerText = "Add Task";
    } else {
        addOrUpdateTaskBtn.innerText = "Update Task";
    }

    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };

    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();
};

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";
    taskData.forEach(
        ({id, title, date, description}) =>{
        (tasksContainer.innerHTML += `
            <div class= "task" id= "${id}">
                <p><strong>Title:</strong>${title}</p>
                <p><strong>Date:</strong>${date}</p>
                <p><strong>Description:</strong>${description}</p>
                <button type="button" class="btn" onclick="editTask(this)">Edit</button>
                <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
            </div>
        `)}
    );
};

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => 
        item.id === buttonEl.parentElement.id
    );

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => 
        item.id === buttonEl.parentElement.id
    );

    currentTask = taskData[dataArrIndex];
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;

    addOrUpdateTaskBtn.innerText = 'Update Task';
    form = taskForm.classList.toggle('hidden');
};

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";

    taskForm.classList.toggle('hidden');
    currentTask = {};
    addOrUpdateTaskBtn.innerText = 'Add Task';
};

openTaskFormBtn.addEventListener('click', () => {
    taskForm.classList.toggle("hidden");
});

if (taskData.length) {
    updateTaskContainer();
}

closeTaskFormBtn.addEventListener('click', () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description
    
    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal();
    } else {
        reset();
    }
});

cancelBtn.addEventListener('click', () => {
    confirmCloseDialog.close();
});

discardBtn.addEventListener('click', () => {
    confirmCloseDialog.close();
    reset();
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addOrUpdateTask();
});

/* local storage shandis
const myTaskArr = [
    { task: "Walk the Dog", date: "22-04-2022" },
    { task: "Read some books", date: "02-11-2023" },
    { task: "Watch football", date: "10-08-2021" },
];
  
localStorage.setItem("data", JSON.stringify(myTaskArr));

const getTaskArr = localStorage.getItem("data");
console.log(getTaskArr);

//show origional
const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
console.log(getTaskArrObj);

//remove data or delete
localStorage.removeItem("data");
localStorage.clear();
*/