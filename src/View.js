export default class View {
    constructor() {
        // The root element
        this.app = this.getElement('#root')
    
        // The title of the app
        this.title = this.createElement('h1')
        this.title.textContent = 'Todos'
    
        // The form, with a [type="text"] input, and a submit button
        this.form = this.createElement('form')
    
        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Add todo'
        this.input.name = 'todo'
    
        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'
    
        // The visual representation of the todo list
        this.todoList = this.createElement('ul', 'todo-list')
    
        // Append the input and submit button to the form
        this.form.append(this.input, this.submitButton)
    
        // Append the title, form, and todo list to the app
        this.app.append(this.title, this.form, this.todoList)
    }

    // Helper methods
    // Create an element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className)
            return element;
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = '';
    }

    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }
          
        // Show default message
        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            // Create todo item nodes for each todo in state
            todos.forEach(todo => {
            const li = this.createElement('li')
            li.id = todo.id

            // Each todo item will have a checkbox you can toggle
            const checkbox = this.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = todo.complete

            // The todo item text will be in a contenteditable span
            const span = this.createElement('span')
            span.contentEditable = true
            span.classList.add('editable')

            // If the todo is complete, it will have a strikethrough
            if (todo.complete) {
            const strike = this.createElement('s')
            strike.textContent = todo.text
            span.append(strike)
            } else {
            // Otherwise just display the text
            span.textContent = todo.text
            }

            // The todos will also have a delete button
            const deleteButton = this.createElement('button', 'delete')
            deleteButton.textContent = 'Delete'
            li.append(checkbox, span, deleteButton)

            // Append nodes to the todo list
            this.todoList.append(li)
            })
        }
    }

    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();

            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.className === 'delete') {
                const id = parseInt(e.target.parentElement.id);
                handler(id);
            }
        });
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.type === 'checkbox') {
                const id = parseInt(e.target.parentElement.id);
                handler(id);
            }
        });
    }


}