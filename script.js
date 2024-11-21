const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const newTodoBtn = document.getElementById('new-todo-btn');

let todos = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTodosFromStorage();
    renderTodos();
    updateCounters();
});

function loadTodosFromStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

newTodoBtn.addEventListener('click', () => {
    const text = prompt('Enter the new task:');
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false
        };
        todos.push(newTask);
        saveTodosToStorage();
        renderTodos();
        updateCounters();
    }
});

function createTodoElement(todo) {
    const { id, text, completed } = todo;

    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.className = 'form-check-input me-2';
    checkbox.addEventListener('change', () => toggleTodoStatus(id));

    const label = document.createElement('label');
    label.className = completed ? 'text-success text-decoration-line-through' : '';
    label.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodoById(id));

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
}

function renderTodos() {
    list.innerHTML = '';
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        list.appendChild(todoElement);
    });
}

function updateCounters() {
    const total = todos.length;
    const unchecked = todos.filter(todo => !todo.completed).length;

    itemCountSpan.textContent = total;
    uncheckedCountSpan.textContent = unchecked;
}

function deleteTodoById(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodosToStorage();
    renderTodos();
    updateCounters();
}

function toggleTodoStatus(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodosToStorage();
    renderTodos();
    updateCounters();
}
