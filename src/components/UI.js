import Project from "./Project";
import Todo from "./Todo";

class UI {
  constructor() {
    this.projects = document.querySelector(".projects");
    this.todos = document.querySelector(".todos");
    this.contentTitle = document.querySelector("#content-title");
    this.currentProject = null;
    this.currentProjectEl = {};

    this.todoForm = document.querySelector(".new-todo");
    this.todoTitleInput = document.querySelector("#todo-title");
    this.todoFormDetails = document.querySelector(".new-todo-details");

    // Expand the form when focused on it
    this.todoForm.addEventListener("focusin", e => {
      this.todoFormDetails.style.display = "block";
    });

    this.todoForm.addEventListener("submit", e => {
      this.todoFormDetails.style.display = "none";
      this.handleTodoFormSubmit(e);
    });

    this.projectForm = document.querySelector('.new-project');
    
    this.projectForm.addEventListener("submit", e => {
      this.handleProjectFormSubmit(e);
    });

    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
    this.handleTodoFormSubmit = this.handleTodoFormSubmit.bind(this);
    this.handleTodoCheckboxChange = this.handleTodoCheckboxChange.bind(this);

    this.projectData = [];
    this.checkLocalStorage();

  }

  checkLocalStorage() {
    const projectData = this.fetchFromLocalStorage('projectData');
    if(projectData) this.deserializeProjectData(projectData);
  }

  // Tetch and parse the localStorage item with given key, returns false otherwise
  fetchFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if(data) return (JSON.parse(data));
    else return false;
  }

  deserializeProjectData(projectData) {
    projectData.forEach(projectObject => {
      let currentProject = new Project(projectObject.title);
      this.render(currentProject);
      // Add todos to new project if any
      if (projectObject.todoCount > 0) {
        projectObject.todos.forEach(todoObject => {
          let {title, description, dueDate, priority, done} = todoObject;
          currentProject.newTodo(title, description, dueDate, priority, done);
        })
      }
      this.projectData.push(currentProject);
    })
  }
  
  // Creates and renders a new Project
  createProject(title) {
    const project = new Project(title);

    // Push new project to projectData list and update localstorage
    this.projectData.push(project);
    localStorage.setItem('projectData', JSON.stringify(this.projectData));

    this.render(project);
    return project;
  }

  // Creates and renders a new Todo
  //!! SHOULDN'T BE USED! USE (Project).newTodo instead!
  createTodo(title, description, dueDate, priority) {

    // Find current project's index in the list
    let currentProjectIndex = this.projectData.indexOf(this.currentProject);
    // Add new todo to current project object
    let todo = this.currentProject.newTodo(title, description, dueDate, priority);
    // Copy the previous projectData
    let projectDataNew = [...this.projectData];
    // Update prev state of currentProject with new one
    projectDataNew[currentProjectIndex] = this.currentProject;
    // Update localStorage
    localStorage.setItem('projectData', JSON.stringify(this.projectData));


    this.render(todo);
    return todo;
  }

  /*
    EVENT HANDLERS
  */

  /* Click handlers */

  handleProjectClick(projectObj) {
    // Focus on todo form if project has no todos
    if(projectObj.todoCount === 0) this.todoTitleInput.focus();
    // Clear the previously rendered todos
    this.todos.innerHTML = "";
    this.currentProject = projectObj;
    // Remove project-current class from previous selected project
    if(this.currentProjectEl.classList) this.currentProjectEl.classList.remove('project-current');
    // Set current project
    this.currentProjectEl = projectObj.projectEl;
    // Add project-current class to current project element
    this.currentProjectEl.classList.add('project-current');
    this.contentTitle.textContent = this.currentProject.title;
    projectObj.todos.forEach(todo => this.render(todo));
  }

  handleTodoDelete(todo) {
    if(confirm(`You are deleting the todo titled '${todo.title}'!`)) {
        let currentProjectIndex = this.projectData.indexOf(this.currentProject);
        let projectDataNew = [...this.projectData];
        projectDataNew[currentProjectIndex].todos.filter(todo => todo !== todo);

      this.currentProject.removeTodo(todo);
      this.todos.innerHTML = "";
      this.currentProject.todos.forEach(todo => this.render(todo));

        this.projectData = projectDataNew;
        // Update localStorage
        localStorage.setItem('projectData', JSON.stringify(this.projectData));
    }
  }

  handleTodoCheckboxChange(e, todoObj, todoEl) {

        // Find current project's index in the list
        let currentProjectIndex = this.projectData.indexOf(this.currentProject);
        console.log(currentProjectIndex);
        let currentTodoIndex = this.projectData[currentProjectIndex].todos.indexOf(todoObj);
        // Copy the previous projectData
        let projectDataNew = [...this.projectData];
        
      if(e.target.checked && !todoObj.done) {
        todoObj.done = true;
        todoEl.classList.add('todo-checked');
      } else if(!e.target.checked && todoObj.done) {
        todoObj.done = false;
        todoEl.classList.remove('todo-checked');
      }
      
        // Update prev state of currentProject with new one
        projectDataNew[currentProjectIndex].todos[currentTodoIndex] = todoObj;
        console.log(projectDataNew)
        this.projectData = projectDataNew;
        // Update localStorage
        localStorage.setItem('projectData', JSON.stringify(this.projectData));
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
    this.createTodo(todoTitle, todoDesc, todoDue, todoPriority);

  }

  handleProjectFormSubmit(e) {
    e.preventDefault();
    const projectForm = e.target;
    const projectTitle = projectForm.querySelector('#project-title').value;
    this.projectForm.reset();
    const project = this.createProject(projectTitle);
    // Mock project click to render project page
    this.handleProjectClick(project);
  }

  // Renders the given item
  render(item) {
    if (item instanceof Project) {
      item.appendTo(this.projects, this.handleProjectClick);
    } else if (item instanceof Todo) {
      item.appendTo(this.todos, this.handleTodoDelete, this.handleTodoCheckboxChange);
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