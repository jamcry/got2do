import Todo from "./Todo";

class Project {
  constructor(title = "New Project") {
    this.title = title;
    this.todos = [];
    this.todoCount = 0;
  }

  // Creates a Project div and appends it to target element,
  // and adds click event listener if clickCallback fn is passed
  appendTo(targetEl, clickCallback = null) {
    const project = document.createElement('div');
    project.classList.add('project');
    project.textContent = this.title;

    // Add event listeners if clickCallback function is given
    if(clickCallback) {
      project.addEventListener('click', () => clickCallback(this));
    }

    targetEl.appendChild(project);
  }

  // Creates a new Todo object and adds it to project's todo list
  newTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    this.todos.push(todo);
    this.todoCount += 1;
  }
}

export default Project;