class Todo {
  constructor(title, description, dueDate, priority, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
  }

  // Creates a Todo div and appends it to target element
  // and adds click event listener if clickCallback fn is passed
  appendTo(targetEl, deleteCallback = null, checkboxCallback = null) {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    console.log("THIS DONE!")
    todo.innerHTML = `
    
    <h1><input class="h1-checkbox check-done" type="checkbox"></input> ${this.title}</h1>
    <p>${this.description}</p>
    <p><i class="fa fa-clock"></i> Due: ${this.dueDate}</p>
    <p><i class="fa fa-list-ul"></i> Priority: ${this.priority}</p>
    <button class="action action-delete">Delete</button>
    `;
    
    const todoCheckbox = todo.querySelector('.check-done');
    const btnDelete = todo.querySelector('.action-delete');

    // If the todo is done, style it with checked class and check the box
    if(this.done) {
      todo.classList.add('todo-checked');
      todoCheckbox.checked = true;
    }

    // Add event listeners if deleteCallback function is given
    if(deleteCallback) {
      btnDelete.addEventListener('click', () => deleteCallback(this));
    }

    if(checkboxCallback) {
    todoCheckbox.addEventListener('change', (e) => checkboxCallback(e, this, todo));
    }

    targetEl.appendChild(todo);
  }
  
}

export default Todo;