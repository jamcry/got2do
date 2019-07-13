import './style.css';
import UI from './components/UI';

const ui = new UI();

const p1 = ui.createProject("Project1");
p1.newTodo("Todo Item 1", "sample todo item is this", new Date(), "HIGH");
p1.newTodo("Todo Item 2", "sample todo item is this", new Date(), "HIGH");

const p2 = ui.createProject("Project2");
p2.newTodo("2.nd project Todo Item 1", "sample todo item is this", new Date(), "HIGH");
p2.newTodo("2.nd project Todo Item 2", "sample todo item is this", new Date(), "HIGH");
