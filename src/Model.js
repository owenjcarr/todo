export default class Model {
  constructor() {
    this.todos = [
      { id: 1, text: 'Code this project using MVC', complete: false },
      { id: 2, text: 'Stop eslint from freaking out', complete: false },
    ];
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };
    this.todos.push(todo);
    this.onTodoListChanged(this.todos);
  }

  // Map through all todos, and replace the text of the todo with the specified id
  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      (todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo));
      this.onTodoListChanged(this.todos);
  }

  // Filter a todo out of the array by id
  deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.onTodoListChanged(this.todos);
  }

  // Flip the complete boolean on the specified todo
  toggleTodo(id) {
      this.todos = this.todos.map((todo) => 
      todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo);
      this.onTodoListChanged(this.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}
