/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controller.js":
/*!***************************!*\
  !*** ./src/Controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Controller)\n/* harmony export */ });\nclass Controller {\n    constructor(model, view) {\n        this.model = model;\n        this.view = view;\n\n        // Explicit binds\n        this.view.bindAddTodo(this.handleAddTodo);\n        this.view.bindDeleteTodo(this.handleDeleteTodo);\n        this.view.bindToggleTodo(this.handleToggleTodo);\n        this.model.bindTodoListChanged(this.onTodoListChanged);\n\n        // Display initial todos\n        this.onTodoListChanged(this.model.todos);\n    }\n\n    onTodoListChanged = (todos) => {\n        this.view.displayTodos(todos);\n    }\n\n    handleAddTodo = (todoText) => {\n        this.model.addTodo(todoText);\n    }\n    \n    handleEditTodo = (id, todoText) => {\n        this.model.editTodo(id, todoText);\n    }\n    \n    handleDeleteTodo = (id) => {\n        this.model.deleteTodo(id);\n    }\n    \n    handleToggleTodo = (id) => {\n        this.model.toggleTodo(id);\n    }\n}\n\n\n//# sourceURL=webpack://todo/./src/Controller.js?");

/***/ }),

/***/ "./src/Model.js":
/*!**********************!*\
  !*** ./src/Model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Model)\n/* harmony export */ });\nclass Model {\n  constructor() {\n    this.todos = [\n      { id: 1, text: 'Code this project using MVC', complete: false },\n      { id: 2, text: 'Stop eslint from freaking out', complete: false },\n    ];\n  }\n\n  addTodo(todoText) {\n    const todo = {\n      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,\n      text: todoText,\n      complete: false,\n    };\n    this.todos.push(todo);\n    this.onTodoListChanged(this.todos);\n  }\n\n  // Map through all todos, and replace the text of the todo with the specified id\n  editTodo(id, updatedText) {\n    this.todos = this.todos.map((todo) =>\n      (todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo));\n      this.onTodoListChanged(this.todos);\n  }\n\n  // Filter a todo out of the array by id\n  deleteTodo(id) {\n      this.todos = this.todos.filter((todo) => todo.id !== id);\n      this.onTodoListChanged(this.todos);\n  }\n\n  // Flip the complete boolean on the specified todo\n  toggleTodo(id) {\n      this.todos = this.todos.map((todo) => \n      todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo);\n      this.onTodoListChanged(this.todos);\n  }\n\n  bindTodoListChanged(callback) {\n    this.onTodoListChanged = callback;\n  }\n}\n\n\n//# sourceURL=webpack://todo/./src/Model.js?");

/***/ }),

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ View)\n/* harmony export */ });\nclass View {\n    constructor() {\n        // The root element\n        this.app = this.getElement('#root')\n    \n        // The title of the app\n        this.title = this.createElement('h1')\n        this.title.textContent = 'Todos'\n    \n        // The form, with a [type=\"text\"] input, and a submit button\n        this.form = this.createElement('form')\n    \n        this.input = this.createElement('input')\n        this.input.type = 'text'\n        this.input.placeholder = 'Add todo'\n        this.input.name = 'todo'\n    \n        this.submitButton = this.createElement('button')\n        this.submitButton.textContent = 'Submit'\n    \n        // The visual representation of the todo list\n        this.todoList = this.createElement('ul', 'todo-list')\n    \n        // Append the input and submit button to the form\n        this.form.append(this.input, this.submitButton)\n    \n        // Append the title, form, and todo list to the app\n        this.app.append(this.title, this.form, this.todoList)\n    }\n\n    // Helper methods\n    // Create an element with an optional CSS class\n    createElement(tag, className) {\n        const element = document.createElement(tag);\n        if (className) element.classList.add(className)\n            return element;\n    }\n\n    // Retrieve an element from the DOM\n    getElement(selector) {\n        const element = document.querySelector(selector);\n        return element;\n    }\n\n    get _todoText() {\n        return this.input.value;\n    }\n\n    _resetInput() {\n        this.input.value = '';\n    }\n\n    displayTodos(todos) {\n        while (this.todoList.firstChild) {\n            this.todoList.removeChild(this.todoList.firstChild)\n        }\n          \n        // Show default message\n        if (todos.length === 0) {\n            const p = this.createElement('p')\n            p.textContent = 'Nothing to do! Add a task?'\n            this.todoList.append(p)\n        } else {\n            // Create todo item nodes for each todo in state\n            todos.forEach(todo => {\n            const li = this.createElement('li')\n            li.id = todo.id\n\n            // Each todo item will have a checkbox you can toggle\n            const checkbox = this.createElement('input')\n            checkbox.type = 'checkbox'\n            checkbox.checked = todo.complete\n\n            // The todo item text will be in a contenteditable span\n            const span = this.createElement('span')\n            span.contentEditable = true\n            span.classList.add('editable')\n\n            // If the todo is complete, it will have a strikethrough\n            if (todo.complete) {\n            const strike = this.createElement('s')\n            strike.textContent = todo.text\n            span.append(strike)\n            } else {\n            // Otherwise just display the text\n            span.textContent = todo.text\n            }\n\n            // The todos will also have a delete button\n            const deleteButton = this.createElement('button', 'delete')\n            deleteButton.textContent = 'Delete'\n            li.append(checkbox, span, deleteButton)\n\n            // Append nodes to the todo list\n            this.todoList.append(li)\n            })\n        }\n    }\n\n    bindAddTodo(handler) {\n        this.form.addEventListener('submit', event => {\n            event.preventDefault();\n\n            if (this._todoText) {\n                handler(this._todoText);\n                this._resetInput();\n            }\n        });\n    }\n\n    bindDeleteTodo(handler) {\n        this.todoList.addEventListener('click', e => {\n            if (e.target.className === 'delete') {\n                const id = parseInt(e.target.parentElement.id);\n                handler(id);\n            }\n        });\n    }\n\n    bindToggleTodo(handler) {\n        this.todoList.addEventListener('click', e => {\n            if (e.target.type === 'checkbox') {\n                const id = parseInt(e.target.parentElement.id);\n                handler(id);\n            }\n        });\n    }\n\n\n}\n\n//# sourceURL=webpack://todo/./src/View.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model */ \"./src/Model.js\");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ \"./src/View.js\");\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller */ \"./src/Controller.js\");\n\n\n\n\nconst app = new _Controller__WEBPACK_IMPORTED_MODULE_2__.default(new _Model__WEBPACK_IMPORTED_MODULE_0__.default(), new _View__WEBPACK_IMPORTED_MODULE_1__.default());\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;