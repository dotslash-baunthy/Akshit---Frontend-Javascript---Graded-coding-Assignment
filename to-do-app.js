// Variable to count the number of entries
// This is used to assign unique IDs on labels, delete and edit buttons
let count = 0;

// Function to add new task to the list
// This will in turn call the populate function which will do the actual addition
function addNewTaskToList() {
    let taskTextDom = document.getElementById("taskText");
    let taskText = taskTextDom.value;
    if (taskText === null || taskText === undefined || taskText === "") {
        return;
    } else {
        // Handler function to add task to list
        populate(taskText);
        taskTextDom.value = '';
    }
}

// Handler function for adding tasks
function populate(taskText) {

    // Increment count (a new entry is to be added)
    count++;

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

// Function to edit tasks
// The event to listen for is enter
function editTask(editBtnId) {

    // Disable all buttons
    disableAllButtons(true);

    // Get count of ID
    let labelNumber = editBtnId.match(/\d+/)[0];

    // Get label which needs to be edited
    let labelDom = document.getElementById('label' + labelNumber);

    // Get task input field
    let taskTextDom = document.getElementById("taskText");

    // Add event listener to execute on press of enter
    taskTextDom.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter') {

            // If new value of edited task is empty, delete the task
            if (taskTextDom.value === undefined || taskTextDom.value === null || taskTextDom.value === "") {
                deleteTask(labelNumber);
            }
            else {
                labelDom.innerText = taskTextDom.value;

                // Remove listener
                this.removeEventListener('keydown', handler);
                taskTextDom.value = '';
            }
            // Enable all buttons
            disableAllButtons(false);
        }
    });

    // Enter value of task input field (which will be empty at this time) with innerText of label
    taskTextDom.value = labelDom.innerText;
}

// Function to delete tasks
function deleteTask(deleteBtnId) {
    let labelId = deleteBtnId.match(/\d+/)[0];
    let liToDelete = document.getElementById('li' + labelId);
    liToDelete.remove();
}

// Function to enable or disable all buttons on the page
function disableAllButtons(disable) {
    let buttons = document.querySelectorAll('button');
    if (disable) {
        buttons.forEach((button) => {
            button.disabled = true;
            button.classList.add('disableBtnOnEdit');
        });
    }
    else {
        buttons.forEach((button) => {
            button.disabled = false;
            button.classList.remove('disableBtnOnEdit');
        });
    }
}

// Call an event to listen to clicks on add function
window.onload = function () {
    populate('Task 1');
    populate('Task 2');
    document.getElementById("addBtn").onclick = function () {
        addNewTaskToList();
    }
}