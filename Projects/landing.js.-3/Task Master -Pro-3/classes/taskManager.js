import { showTaskInUl, } from "../main.js";

export default class TaskManager {
  constructor() {
    this.actions = [];
  }
  addTask(description) {
    this.actions.push(description);
  }

  deleteTask(id) {
    let deleteIndex = this.actions.findIndex((action) => action.id == id);

    this.actions.splice(deleteIndex, 1);
  }

  updateTaskDescription(id, newDescription) {
    let updateIndex = this.actions.findIndex((action) => action.id == id);
    this.actions[updateIndex].description = newDescription;
  }

  completeTask(id) {
    let task = this.actions.find((action) => action.id === id);
    if (task) {
      task.completed = true;
      const ulComplete = document.querySelector("#com_id");
      ulComplete.innerHTML += `<li id="li_id" style="text-decoration: line-through;" class="list-group-item active d-flex justify-content-between" aria-current="true">
      ${task.description}
      <div class="box" style="cursor: pointer;">
        <i onclick="deleteCompletedTask(${task.id})" style="margin-left: 0.5rem" class="fa-solid fa-trash fa-beat"></i>
      </div>
    </li>`;

      this.deleteTask(id); 
      showTaskInUl(); 
    }
  }
}
  
