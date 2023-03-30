let taskInput = document.getElementById('task-input')
let taskListDOM = document.querySelector('#task-list')
let taskList = document.querySelectorAll(".task-container")
let taskCheckers = document.querySelectorAll(".task-container input")
let taskListObj = []
let currentCategory = 0

taskInput.value = ''

for (let i = 0; i < taskList.length; i++) {
    taskListObj[i] = {
        textValue: taskList[i].childNodes[3].innerText,
        isChecked: taskCheckers[i].checked
    }
}

taskCheckers = document.querySelectorAll(".task-container input")
for (let i = 0; i < taskCheckers.length; i++) {
    taskCheckers[i].addEventListener('click', function() {
        taskListObj[i].isChecked = !taskListObj[i].isChecked
        console.log(taskListObj[i].isChecked)
    })
}


taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        addTask()
    }
})

function addTask() {
    if (taskInput.value !== "") {
        let newTaskObj = {
            textValue: taskInput.value,
            isChecked: false
        }
        taskListObj.push(newTaskObj)
        taskInput.value = ''
        updateDisplay(0)
    } 
}

function clearTasks() {
    for (let i = 0; i < taskListObj.length; i++) {
        if (taskListObj[i].isChecked) {
            delete(taskListObj[i])
        }
    }
    taskListObj = taskListObj.filter(function(element) {
        return element !== undefined;
    }
    )
    updateDisplay(currentCategory)
}

function updateDisplay(category) {
    currentCategory = category
    switchCategory()
    taskListDOM.innerText = ""
    taskList = []
    for (let i = 0; i < taskListObj.length; i++) {
        if (((category == 1) && (!taskListObj[i].isChecked)) ||
            ((category == 2) && (taskListObj[i].isChecked)) ||
            (category == 0))  {
            let newTask = document.createElement('div')
            newTask.setAttribute('class', 'task-container')
            let newTaskInput = document.createElement('input')
            newTaskInput.setAttribute('class', 'task-checkbox')
            newTaskInput.setAttribute('type', 'checkbox')
            // newTaskInput.setAttribute('onclick', 'switchChecked()')
            newTaskInput.setAttribute('id', 'task' + i)
            newTaskInput.checked = taskListObj[i].isChecked
            let newTaskLabel = document.createElement('label')
            newTaskLabel.setAttribute('class', 'task-value')
            newTaskLabel.setAttribute('for', 'task' + i)
            newTaskLabel.innerText = taskListObj[i].textValue
            newTask.appendChild(newTaskInput)
            newTask.appendChild(newTaskLabel)
            taskList.push(newTask)
        }
    }
    for (let i = 0; i < taskList.length; i++) {
        taskListDOM.appendChild(taskList[i])    
    }
}

function switchCategory() {
    let categories = document.querySelectorAll('form input')
    for (var i = 0; i < 3; i++) {
        categories[i].checked = false
    }
    categories[currentCategory].checked = true
}
