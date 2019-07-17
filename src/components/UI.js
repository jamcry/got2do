import Project from "./Project";
import Todo from "./Todo";
import fetchFromLocalStorage from "./LocalStorageHelper";

class UI {
  constructor() {
    this.initDomElements();
    this.addEventListeners();
    this.bindFunctions();

    this.currentProject = null;
    this.currentProjectEl = {}

    this.projectData = [];

    this.checkLocalStorage();
  }

  initDomElements() {
    this.projects = document.querySelector(".projects");
    this.todos = document.querySelector(".todos");
    this.contentTitle = document.querySelector("#content-title");

    this.todoForm = document.querySelector(".new-todo");
    this.newTodoTitle = this.todoForm.querySelector("#todo-title");
    this.newTodoDesc = this.todoForm.querySelector("#todo-description");
    this.newTodoDue = this.todoForm.querySelector("#todo-due");
    this.newTodoImportant = this.todoForm.querySelector("#todo-important");
    
    this.todoTitleInput = document.querySelector("#todo-title");
    this.todoFormDetails = document.querySelector(".new-todo-details");
    this.projectForm = document.querySelector('.new-project');

  }

  bindFunctions() {
    this.handleProjectClick = this.handleProjectClick.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
    this.handleTodoFormSubmit = this.handleTodoFormSubmit.bind(this);
    this.handleTodoCheckboxChange = this.handleTodoCheckboxChange.bind(this);
  }

  addEventListeners() {
    // Expand the form when focused on it
    this.todoForm.addEventListener("focusin", e => {
      this.todoFormDetails.style.display = "block";
    });

    this.todoForm.addEventListener("submit", e => {
      this.todoFormDetails.style.display = "none";
      this.handleTodoFormSubmit(e);
    });

    this.projectForm.addEventListener("submit", e => {
      this.handleProjectFormSubmit(e);
    });
  }

  checkLocalStorage() {
    const projectData = fetchFromLocalStorage('projectData');
    console.log(projectData);
    if(projectData) this.deserializeProjectData(projectData);
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
    let newProjectData = [...this.projectData, project];
    this.updateProjectData(newProjectData);

    return project;
  }

  // Creates and renders a new Todo
  createTodo(title, description, dueDate, priority) {
    console.log(this.projectData);
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
    return todo;
  }

  /*
    EVENT HANDLERS
  */

  /* Click handlers */
  
  handleProjectClick(projectObj) {
    this.renderProjectContent(projectObj)
  }
  
  renderProjectContent(projectObj) {
    // Focus on todo form if project has no todos
    if(projectObj.todoCount === 0) this.todoTitleInput.focus();
    this.setCurrentProject(projectObj);
    
    // Set the title
    this.contentTitle.textContent = this.currentProject.title;

    // TODO: Render buttons and hook event listeners
    /** Set the title with buttons
    /**
    /** this.contentTitle.innerHTML = `
    /** ${this.currentProject.title}
    /** <button class="action action-delete del-project"><i class="fa fa-trash"></i></button>
    /** <button class="action action-delete"><i class="fa fa-edit"></i></button>
    /** `;    
    **/

    // Clear the previously rendered todos
    this.todos.innerHTML = "";
    
    // Render project's todos
    projectObj.todos.forEach(todo => this.render(todo));
  }

  setCurrentProject(projectObj) {
    // Remove project-current class from previous selected project
    if(this.currentProjectEl.classList) this.currentProjectEl.classList.remove('project-current');
    
    // Change the state variables of current project
    this.currentProject = projectObj;
    this.currentProjectEl = projectObj.projectEl;
    
    // Add project-current class to current project element
    this.currentProjectEl.classList.add('project-current');
  }

  ///////////////////////////////////////////////////////////////////////

  updateProjectData(newProjectData) {
    this.projectData = newProjectData;
    localStorage.setItem('projectData', JSON.stringify(newProjectData));
  }

  ///////////////////////////////////////////////////////////////////////

  handleTodoDelete(todo) {
    if(confirm(`You are deleting the todo titled '${todo.title}'!`)) {
      let currentProjectIndex = this.projectData.indexOf(this.currentProject);
      let projectDataNew = [...this.projectData];
      projectDataNew[currentProjectIndex].todos.filter(todo => todo !== todo);

      this.currentProject.removeTodo(todo);
      this.todos.innerHTML = "";
      this.currentProject.todos.forEach(todo => this.render(todo));
      this.updateProjectData(projectDataNew);
    }
  }

  handleTodoCheckboxChange(e, todoObj, todoEl) {
    // Find current project's index in the list
    let currentProjectIndex = this.projectData.indexOf(this.currentProject);
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
    this.updateProjectData(projectDataNew);
  }

  getFormParams() {
    const todoTitle = this.newTodoTitle.value;
    const todoDesc = this.newTodoDesc.value;
    const todoDue = this.newTodoDue.value;
    const todoImportant = this.newTodoImportant.checked;
    
    return {todoTitle, todoDesc, todoDue, todoImportant}
  }

  /* Submit handlers */
  handleTodoFormSubmit(e) {
    e.preventDefault();
    let {todoTitle, todoDesc, todoDue, todoImportant} = this.getFormParams();
    const todoPriority = todoImportant ? "HIGH" : "NORMAL";
    const todo = this.createTodo(todoTitle, todoDesc, todoDue, todoPriority);
    this.todoForm.reset();
    this.render(todo);
  }

  handleProjectFormSubmit(e) {
    e.preventDefault();
    const projectForm = e.target;
    const projectTitle = projectForm.querySelector('#project-title').value;
    this.projectForm.reset();
    const project = this.createProject(projectTitle);
    this.render(project);
    this.renderProjectContent(project);
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
}

export default UI;
