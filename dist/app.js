"use strict";
function validate(todo) {
    let isValid = true;
    if (todo.min && todo.text.length < todo.min) {
        isValid = false;
    }
    return isValid;
}
class TodoStructure {
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
class AppState {
    constructor() {
        this.todos = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AppState();
        return this.instance;
    }
    getTodoList() {
        new TodoList(this.todos);
        new TodoList(this.todos);
    }
    addTodo(id, input) {
        const todoItem = new TodoStructure(id, input);
        this.todos.push(todoItem);
        this.getTodoList();
    }
    set Todos(todoItems) {
        this.todos = [...todoItems];
        this.getTodoList();
    }
    get Todos() {
        return this.todos;
    }
}
const appState = AppState.getInstance();
class TodoItem {
    constructor(id, input, todoItems) {
        this.id = id;
        this.input = input;
        this.todoItems = todoItems;
        this.tempElement = document.querySelector('template');
        this.ulElement = document.querySelector('ul');
        const importedHtml = document.importNode(this.tempElement.content, true);
        this.liElement = importedHtml.firstElementChild;
        this.attach();
        this.display();
        this.deleteTodo();
        this.editTodo();
    }
    attach() {
        console.log(this.todoItems, this.liElement, this.ulElement);
        this.ulElement.insertAdjacentElement('afterbegin', this.liElement);
    }
    display() {
        this.ulElement.querySelector('h3').textContent = this.input;
        this.ulElement.querySelector('.del').id = this.id;
        this.ulElement.querySelector('.edit').id = this.id;
    }
    deleteItem(id, todoItems) {
        const removedTodo = todoItems.filter((todo) => todo.id !== id);
        appState.Todos = removedTodo;
    }
    deleteHandler() {
        if (document.querySelector('input').value) {
            alert('Todo already selected');
            return;
        }
        const id = this.id.toString();
        const todoItems = [...appState.Todos];
        this.deleteItem(id, todoItems);
    }
    editHandler() {
        if (document.querySelector('input').value) {
            alert('Todo already selected');
            return;
        }
        const id = this.id.toString();
        const todoItems = [...appState.Todos];
        const getText = todoItems.find((todo) => todo.id === id);
        document.querySelector('input').value = getText.input;
        this.deleteItem(id, todoItems);
    }
    deleteTodo() {
        this.liElement
            .querySelector('.del')
            .addEventListener('click', this.deleteHandler.bind(this));
    }
    editTodo() {
        this.liElement
            .querySelector('.edit')
            .addEventListener('click', this.editHandler.bind(this));
    }
}
class TodoList {
    constructor(todoItems) {
        this.todoItems = todoItems;
        this.display();
    }
    display() {
        document.querySelector('ul').innerText = '';
        for (let todo of this.todoItems) {
            new TodoItem(todo.id, todo.input, this.todoItems);
        }
    }
}
class TodoInput {
    constructor() {
        this.todoInput = document.querySelector('input');
        this.submitButton = document.querySelector('.addTodo');
        this.submit();
    }
    validation(value) {
        const checkInput = validate({
            text: value,
            min: 3,
        });
        if (!checkInput) {
            alert('Invalid input');
            return;
        }
        return value;
    }
    clearFormInput() {
        this.todoInput.value = '';
    }
    submitHandler(e) {
        e.preventDefault();
        console.log('event');
        const getTodoValue = this.todoInput.value;
        const ValidatedText = this.validation(getTodoValue);
        if (ValidatedText) {
            const id = Math.random().toString();
            appState.addTodo(id, ValidatedText);
            this.clearFormInput();
        }
        else {
            this.clearFormInput();
        }
    }
    submit() {
        console.log(this.submitButton, this.todoInput);
        this.submitButton.addEventListener('click', this.submitHandler.bind(this));
    }
}
const todo = new TodoInput();
