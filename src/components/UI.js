import Project from './Project';
import Todo from './Todo';

class UI {
  constructor() {
    this.projects = document.querySelector('.projects');
    this.todos = document.querySelector('.todos');
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
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

  handleProjectClick(project) {
    if(project.todoCount > 0) {
      // Clear the previously rendered todos
      this.todos.innerHTML = '';
      project.todos.forEach(todo => this.render(todo));
    }
  }

  handleTodoClick(todo) {
    alert(`You have clicked on ${todo.title}`);
  }

  // Renders the given item
  render(item) {
    if (item instanceof Project) {
      item.appendTo(this.projects, this.handleProjectClick)
    } else if (item instanceof Todo) {
      item.appendTo(this.todos, this.handleTodoClick);
    } else {
      return false;
    }
  }

  // Render project's todos
  renderProject(project) {
    if(project.todoCount > 0) { 
      project.todos.forEach(todo => this.render(todo));
    }
  }
}

export default UI;