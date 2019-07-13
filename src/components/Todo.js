class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  // Creates a Todo div and appends it to target element
  // and adds click event listener if clickCallback fn is passed
  appendTo(targetEl, clickCallback = null) {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
    <h1>${this.title}</h1>
    <p>${this.description}</p>
    <p>Due: ${this.dueDate}</p>
    <p>Priority: ${this.priority}</p>
    `;

    // Add event listeners if clickCallback function is given
    if(clickCallback) {
      todo.addEventListener('click', () => clickCallback(this));
    }

    targetEl.appendChild(todo);
  }
}

export default Todo;