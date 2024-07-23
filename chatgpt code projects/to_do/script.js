let taskIdCounter = 0;
let folderIdCounter = 3;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = document.createElement('li');
        task.draggable = true;
        task.id = `task-${taskIdCounter++}`;
        task.ondragstart = drag;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = toggleTaskCompletion;
        
        const label = document.createElement('label');
        label.textContent = taskText;

        task.appendChild(checkbox);
        task.appendChild(label);
        document.getElementById('others').appendChild(task);
        taskInput.value = '';
    }
}

function toggleTaskCompletion(event) {
    event.target.parentElement.classList.toggle('completed');
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text');
    const task = document.getElementById(taskId);
    event.target.closest('.folder').querySelector('ul').appendChild(task);
}

function addFolder() {
    const folderInput = document.getElementById('folderInput');
    const folderName = folderInput.value.trim();
    if (folderName) {
        const folder = document.createElement('div');
        folder.className = 'folder';
        folder.id = `folder-${folderIdCounter++}`;
        folder.ondrop = drop;
        folder.ondragover = allowDrop;

        const folderTitle = document.createElement('h2');
        folderTitle.textContent = folderName;
        folder.appendChild(folderTitle);

        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-folder';
        deleteButton.onclick = () => deleteFolder(folder.id);
        folder.appendChild(deleteButton);

        const folderList = document.createElement('ul');
        folder.appendChild(folderList);

        document.getElementById('folders').appendChild(folder);
        folderInput.value = '';
    }
}

function deleteFolder(folderId) {
    const folder = document.getElementById(folderId);
    if (folder) {
        folder.remove();
    }
}
