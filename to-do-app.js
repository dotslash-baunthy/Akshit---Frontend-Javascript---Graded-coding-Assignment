const addButton = document.getElementById("addBtn");

class Task {
    constructor(taskText) {
        this.taskText = taskText;
    }
}

let tasks = [];

function addListeners() {
    addButton.onclick = function() {
        addNewTaskToList();
    }
}

function addNewTaskToList() {
    let taskText = document.getElementById("taskText");
    if (taskText.value === null || taskText.value === undefined || taskText.value === "") {
        return;
    } else {
        tasks.push(new Task(taskText.value));
        populate();
        taskText.value = "";
    }
}

function populate() {
    if (tasks.length > 0) {
        let str = "<ul>";
        tasks.forEach(function(task) {
            str += "<li>" + task.taskText;
            str += "<button class='editBtn'>Edit</button>";
            str += "<button class='deleteBtn'>Delete</button>";
            str += "</li>";
        });
        str += "</ul>";
        document.getElementById("tasksList").innerHTML = str;
    } else {
        return;
    }
}

// Add edit function
// Add delete function

window.onload = function() {
    addListeners();
    populate();
}