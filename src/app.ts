  type dType = string;
  interface TodoInputValidation {
    text: dType;
    min?: number;
  }
  function validate(todo: TodoInputValidation) {
    let isValid = true;
    if (todo.min && todo.text.length < todo.min) {
      isValid = false;
    }
    return isValid;
  }
  class TodoStructure {
    constructor(public id: dType, public input: dType) {}
  }
    class AppState {
    protected todos: TodoStructure[];
    private static instance: AppState;
    protected constructor() {
      this.todos = [];
    }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new AppState();
      return this.instance;
    }
      protected getTodoList() {
      new TodoList(this.todos,);
      new TodoList(this.todos,);
    }
  
    addTodo(id: string, input: string) {
      const todoItem = new TodoStructure(id, input);
      this.todos.push(todoItem);
      this.getTodoList();
    }
  
    set Todos(todoItems: TodoStructure[]) {
      this.todos = [...todoItems];
      this.getTodoList();
    }
  
    get Todos() {
      return this.todos;
    }
  }
  
  const appState = AppState.getInstance();
  class TodoItem {
    tempElement: HTMLTemplateElement;
    ulElement: HTMLUListElement;
    liElement: HTMLLIElement;
    constructor(
      private id: string,
      private input: string,
      private todoItems: TodoStructure[] 
    ) {
      this.tempElement = document.querySelector('template')!;
      this.ulElement = document.querySelector('ul')! as HTMLUListElement;
  
      const importedHtml = document.importNode(this.tempElement.content, true);
      this.liElement = importedHtml.firstElementChild as HTMLLIElement;
      this.attach();
      this.display();
      this.deleteTodo();
      this.editTodo();
    }
  
    private attach() {
      console.log(this.todoItems, this.liElement, this.ulElement);
      this.ulElement.insertAdjacentElement('afterbegin', this.liElement)!;
    }
  
    private display() {
      this.ulElement.querySelector('h3')!.textContent = this.input;
      this.ulElement.querySelector('.del')!.id = this.id;
      this.ulElement.querySelector('.edit')!.id = this.id;
    }
    private deleteItem(id: string, todoItems: TodoStructure[]) {
      const removedTodo = todoItems.filter((todo) => todo.id !== id);
      appState.Todos = removedTodo;
    }
  
    private deleteHandler() {
      if (document.querySelector('input')!.value) {
        alert('Todo already selected');
        return;
      }
      const id = this.id.toString();
      const todoItems = [...appState.Todos];
      this.deleteItem(id, todoItems);
    }
  
    private editHandler() {
      if (document.querySelector('input')!.value) {
        alert('Todo already selected');
        return;
      }
      const id = this.id.toString();
      const todoItems = [...appState.Todos];
      const getText = todoItems.find((todo) => todo.id === id)!;
      document.querySelector('input')!.value = getText.input;
      this.deleteItem(id, todoItems);
    }
  
    private deleteTodo() {
      this.liElement
        .querySelector('.del')!
        .addEventListener('click', this.deleteHandler.bind(this));
    }
  
    private editTodo() {
      this.liElement
        .querySelector('.edit')!
        .addEventListener('click', this.editHandler.bind(this));
    }
  }
    class TodoList {
    constructor(
      private todoItems: TodoStructure[],
    ) {
      this.display();

    }
  
    private display() {
        document.querySelector('ul')!.innerText = '';
      for (let todo of this.todoItems) {
        new TodoItem(todo.id, todo.input, this.todoItems);
      }
    }
  
    
  }
  class TodoInput {
    todoInput: HTMLInputElement;
    submitButton: HTMLButtonElement;
    constructor() {
      this.todoInput = document.querySelector('input')! as HTMLInputElement;
      this.submitButton = document.querySelector(
        '.addTodo'
      )! as HTMLButtonElement;
      this.submit();
    }
  
    private validation(value: string): string | undefined {
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
  
    private clearFormInput() {
      this.todoInput.value = '';
    }
    private submitHandler(e: Event) {
      e.preventDefault();
      console.log('event');
      const getTodoValue = this.todoInput.value;
      const ValidatedText = this.validation(getTodoValue);
      if (ValidatedText) {
        const id = Math.random().toString();
        appState.addTodo(id, ValidatedText);
        this.clearFormInput();
      } else {
        this.clearFormInput();
      }
    }
    private submit() {
      console.log(this.submitButton, this.todoInput);
      this.submitButton.addEventListener('click', this.submitHandler.bind(this));
    }
  }
  
  const todo = new TodoInput();
