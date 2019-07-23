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

    this.renderDefaultContent();
    this.checkLocalStorage();
  }

  initDomElements() {
    this.projects = document.querySelector(".projects");
    this.todos = document.querySelector(".todos");
    this.content = document.querySelector(".content");
    this.projectHeader = document.querySelector(".project-header");
    this.projectTitle = document.querySelector(".project-title");
    this.projectActions = document.querySelector(".project-actions");

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
    // Make todo form visible
    this.todoForm.style.display = "block";
    // Focus on todo form if project has no todos
    if(projectObj.todoCount === 0) this.todoTitleInput.focus();
    this.setCurrentProject(projectObj);
    
    // Set the title
    this.projectTitle.textContent = this.currentProject.title;
    // Render action buttons
    this.projectActions.innerHTML = `
      <button class="action action-delete del-project"><i class="fa fa-trash"></i></button>
      <button class="action action-edit edit-project"><i class="fa fa-edit"></i></button>
    `;    
    
    const btnDelete = this.projectHeader.querySelector('.del-project')
    const btnEdit = this.projectHeader.querySelector('.edit-project')

    btnDelete.addEventListener('click', () => this.handleProjectDelete(this.currentProject));
    btnEdit.addEventListener('click', () => this.handleProjectEdit(this.currentProject));

    // Render todos of the project
    this.updateTodoListView(projectObj);
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
      this.updateTodoListView(this.currentProject);
      this.updateProjectData(projectDataNew);
    }
  }

  handleProjectDelete(project) {
    if(confirm(`You are deleting the project titled '${project.title}' and its content!`)) {
      this.updateProjectData(this.projectData.filter(item => item !== project));
      this.updateProjectListView(this.projectData);
    }
  }

  handleProjectEdit(project) {
    this.projectTitle.innerHTML = `
      <form class="project-title-form">
        <input type="text" class="edited-title" value=${project.title}></input>
      </form>
    `
    const projectEditForm = this.projectHeader.querySelector('.project-title-form');
    const projectTitleInput = this.projectHeader.querySelector('.edited-title');

    projectEditForm.addEventListener('submit', (e) => {
      // Get the new title value
      const newTitle = projectTitleInput.value;
      const currentProjectIndex = this.projectData.indexOf(this.currentProject);
      this.projectData[currentProjectIndex].title = newTitle;
      this.updateProjectData(this.projectData);
      this.updateProjectListView(this.projectData);
      this.renderProjectContent(this.projectData[currentProjectIndex])
      e.preventDefault();
    })
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

  // Renders the default placeholder content
  renderDefaultContent() {
    this.projectTitle.textContent = "You Got2Do Something";
    this.todos.textContent = "Start by opening or creating a project.";
    this.todoForm.style.display = "none";
  }

  // Renders the project's todos
  renderTodoList(projectObj) {
    projectObj.todos.forEach(todo => this.render(todo));
  }

  // Clears the given elements inner HTML
  clearInnerHTML(element) {
    element.innerHTML = "";
  }

  // Clears the project list and renders projects in given object
  updateProjectListView(projectData) {
    this.clearInnerHTML(this.projects);
    this.projectData.forEach(project => this.render(project));
  }

  // Clears the todo list and renders projects todo
  updateTodoListView(projectObj) {
    this.clearInnerHTML(this.todos);
    this.renderTodoList(projectObj);
  }

}

export default UI;
