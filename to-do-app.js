const addButton = document.getElementById("addBtn");

let count = 0;

function addListeners() {
    addButton.onclick = function () {
        addNewTaskToList();
    }
}

function addNewTaskToList() {
    let taskTextDom = document.getElementById("taskText");
    let taskText = taskTextDom.value;
    console.log(taskText, taskTextDom);
    if (taskText === null || taskText === undefined || taskText === "") {
        return;
    } else {
        count++;
        populate(taskText);
        taskTextDom.value = '';
    }
}

function populate(taskText) {
    // Get DOM element where tasks are placed
    let ul = document.getElementById('taskUl');

    // Create new 'parent' DOM element
    let li = document.createElement('li');
    li.setAttribute('id', 'li' + count);

    // Create new label and add properties
    // This will hold the text of the to-do
    let label = document.createElement('label');
    label.setAttribute('id', 'label' + count);
    label.appendChild(document.createTextNode(taskText));

    // Create new edit button
    // Add ID (to uniquely identify it) and class (to theme it via CSS)
    let editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.setAttribute('id', 'editBtn' + count);
    editBtn.setAttribute('class', 'editBtn');
    editBtn.addEventListener('click', function () {
        editTask('editBtn' + count);
    });

    // Create new delete button
    // Add ID (to uniquely identify it) and class (to theme it via CSS)
    // Add event listener to run delete function
    let deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.setAttribute('id', 'deleteBtn' + count);
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.addEventListener('click', function () {
        deleteTask('deleteBtn' + count);
    });

    // Add label and edit and delete buttons to li
    // Add li to ul
    // The structure looks something like this - ul -> li -> {label,editBtn,deleteBtn}
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

// Update edit function
// Listener on ADD button needs to be modified on the fly (edit in case of edit, add in case of no edit)
function editTask(editBtnId) {
    // Get count of ID
    let labelId = editBtnId.match(/\d+/)[0];
    let taskText = document.getElementById('label' + labelId);
    let editTextField = document.getElementById('taskText');
    editTextField.value = taskText.innerText;
    taskText.innerText = editTextField.innerText;

}

function deleteTask(deleteBtnId) {
    let labelId = deleteBtnId.match(/\d+/)[0];
    let liToDelete = document.getElementById('li' + labelId);
    liToDelete.remove();
}

window.onload = function () {
    addListeners();
}