let taskInput = document.getElementById("task-input")
let taskList = document.getElementById("task-list")

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        addTask()
    }
})

function addTask() {
    let div = document.createElement("div")
    let input = document.createElement("input")
    let label = document.createElement("label")
    if (taskInput.value == "") {
        return false
    }
    else {
        taskContainer = taskList.appendChild(div)
        taskContainer.setAttribute("class", "task-container")
        taskCheckbox = taskContainer.appendChild(input)
        taskCheckbox.setAttribute("id", "")
        taskCheckbox.setAttribute("type", "checkbox")
        taskCheckbox.setAttribute("class", "task-checkbox")
        taskCheckbox.checked = false
        taskValue = taskContainer.appendChild(label)
        taskValue.setAttribute("for", "")
        taskValue.setAttribute("class", "task-value")
        taskValue.innerHTML = taskInput.value
        taskInput.value = ""
    }
}

function clearTasks() {
    const tasks = document.querySelectorAll(".task-container")
    tasks.forEach(task => {
        if (task.querySelector('input').checked === true) {
            task.style.display = "none"
        }
    });
}

function checkCategory(category) {
    const tasks = document.querySelectorAll(".task-container")
    
    if (category === 'All') {
        tasks.forEach(task => {
            task.style.display = "flex"
            }
        );
    }
    else if (category === 'Pending') {
        tasks.forEach(task => {
            if (task.querySelector('input').checked === true) {
                task.style.display = "none"
            }
            else if (task.querySelector('input').checked === false) {
                task.style.display = 'flex'
            }
        });
    }
    else if (category === 'Completed') {
        tasks.forEach(task => {
            if (task.querySelector('input').checked === true) {
                task.style.display = "flex"
            }
            else if (task.querySelector('input').checked === false) {
                task.style.display = 'none'
            }
        });
    }
}