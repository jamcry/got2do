import Project from "./Project";
import Todo from "./Todo";

class UI {
  constructor() {
    this.projects = document.querySelector(".projects");
    this.todos = document.querySelector(".todos");
    this.contentTitle = document.querySelector("#content-title");
    this.currentProject = null;

    this.todoForm = document.querySelector(".new-todo");
    this.todoFormDetails = document.querySelector(".new-todo-details");

    // Expand the form when focused on it
    this.todoForm.addEventListener("focusin", e => {
      this.todoFormDetails.style.display = "block";
    });

    this.todoForm.addEventListener("submit", e => {
      this.todoFormDetails.style.display = "none";
      this.handleTodoFormSubmit(e);
    });

    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
    this.handleTodoFormSubmit = this.handleTodoFormSubmit.bind(this);
  }

  // Creates and renders a new Project
  createProject(title) {
    const project = new Project(title);
    this.render(project);
    return project;
  }

  // Creates and renders a new Todo
  createTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    this.render(todo);
    return todo;
  }

  /*
    EVENT HANDLERS
  */

  /* Click handlers */

  handleProjectClick(project) {
    if (project.todoCount > 0) {
      // Clear the previously rendered todos
      this.todos.innerHTML = "";
      this.currentProject = project;
      this.contentTitle.textContent = this.currentProject.title;
      project.todos.forEach(todo => this.render(todo));
    }
  }

  handleTodoClick(todo) {
    alert(`You have clicked on ${todo.title}`);
  }

  /* Submit handlers */
  handleTodoFormSubmit(e) {
    e.preventDefault();
    const todoForm = e.target;
    const todoTitle = todoForm.querySelector("#todo-title").value;
    const todoDesc = todoForm.querySelector("#todo-description").value;
    const todoDue = todoForm.querySelector("#todo-due").value;
    const todoImportant = todoForm.querySelector("#todo-important").checked;
    const todoPriority = todoImportant ? "HIGH" : "NORMAL";
    this.todoForm.reset();
    this.currentProject.newTodo(todoTitle, todoDesc, todoDue, todoPriority);
    // Render the new (last) item
    this.render(
      this.currentProject.todos[this.currentProject.todos.length - 1]
    );
  }

  // Renders the given item
  render(item) {
    if (item instanceof Project) {
      item.appendTo(this.projects, this.handleProjectClick);
    } else if (item instanceof Todo) {
      item.appendTo(this.todos, this.handleTodoClick);
    } else {
      return false;
    }
  }

  // Render project's todos
  renderProject(project) {
    if (project.todoCount > 0) {
      project.todos.forEach(todo => this.render(todo));
    }
  }
}

export default UI;
