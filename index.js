// Constructor function for a todo item
function todoItem(text, completed) {
    this.todoText = text;
    this.completed = completed;
}

// Object representing the todo list with various methods
var todoList = {
    todos: [],

    // Method to add a new todo to the list
    addTodo: function (todoText) {
        this.todos.splice(0, 0, new todoItem(todoText, false));
    },

    // Method to toggle the completed status of a todo
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        view.displayTodos();
    },


    // Method to toggle all todos' completed status
    toggleAll: function () {
        var allCompleted = this.todos.every(function (todo) {
            return todo.completed;
        });
        this.todos.forEach(function (todo) {
            todo.completed = !allCompleted;
        });
    },

    // Method to delete a todo at a specific position
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },

    // Method to change the text of a todo at a specific position
    changeTodoText: function (position, newTodoText) {
        this.todos[position].todoText = newTodoText;
    }
};

// Object with methods for handling different events
var handlers = {
    // Method to handle toggling all todos
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },

    // Method to handle toggling a specific todo
    toggleTodo: function (id) {
        todoList.toggleCompleted(id);
        view.displayTodos();
    },

    // Method to handle deleting a specific todo
    deleteTodo: function (id) {
        todoList.deleteTodo(id);
        view.displayTodos();
    },

    // Method to handle adding a new todo
    addTodo: function () {
        var text_elem = document.getElementById('addTodoTextInput');
        var text = text_elem.value;
        if (text === '') return;
        text_elem.value = ''; // Clear input form
        todoList.addTodo(text);
        view.displayTodos();
    }
};

// Object with methods responsible for what the user sees
var view = {
    displayTodos: function () {
        var todosUl = document.getElementById('todoList');
        todosUl.innerHTML = ''; // Clear the list before adding all list items

        todoList.todos.forEach(function (todo, position) {
            let todoLi = document.createElement('li');
            let textParagraph = document.createElement('p');

            // Display todo text
            textParagraph.textContent = todo.todoText;
            
            // Add a class based on completion status
            textParagraph.className = todo.completed ? 'completed' : '';

            todoLi.id = position;

            // Create and append the toggle button
            todoLi.appendChild(this.createToggleButton(todo.completed));

            // Append the todo text paragraph to the list item
            todoLi.appendChild(textParagraph);

            // Create and append the delete button
            todoLi.appendChild(this.createDeleteButton());

            // Append the list item to the unordered list
            todosUl.appendChild(todoLi);
        }, this);
    },


    // Method to create and return a delete button element
    createDeleteButton: function () {
        var icon = document.createElement('i');
        icon.className = "far fa-trash-alt deleteButton";
        return icon;
    },

    // Method to create and return a toggle button element
    createToggleButton: function (toggled) {
        var icon = document.createElement('i');
        var sign = toggled === true ? "check-circle" : "circle";
        icon.className = "far fa-" + sign + " toggleButton";
        return icon;
    },

    // Method to set up a click event listener for buttons
    setupButtonClickEventListener: function () {
        var todosUl = document.getElementById('todoList');
        todosUl.addEventListener('click', function (event) {
            var elementClicked = event.target; // The real element that was clicked on
            var todoID = parseInt(elementClicked.parentNode.id);

            // Check if delete button clicked and call the deleteTodo handler
            if (elementClicked.className.includes('deleteButton')) {
                handlers.deleteTodo(todoID);
            }

            // Check if toggle button clicked and call the toggleTodo handler
            if (elementClicked.className.includes('toggleButton')) {
                handlers.toggleTodo(todoID);
            }
        });
    },

    // Method to set up an event listener for the input field to add todos
    setupInputEventListener: function () {
        var input = document.getElementById('addTodoTextInput');
        input.addEventListener('keyup', function (event) {
            // If Enter key is pressed, call the addTodo handler
            if (event.keyCode === 13) {
                handlers.addTodo();
            }
        });
    },

    // Method to set autofocus on the input field
    setupAutofocus: function () {
        var input = document.getElementById('addTodoTextInput');
        input.autofocus = true;
    }
};

// Initialize the event listeners and autofocus
view.setupButtonClickEventListener();
view.setupInputEventListener();
view.setupAutofocus();
