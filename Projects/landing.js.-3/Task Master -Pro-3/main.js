import Task from "./classes/Task.js";
import TaskManager from "./classes/taskManager.js";

window.addAction = () => {
  let input = document.querySelector("#input").value;

  const action = new Task(input);

  manager.addTask(action);
  showTaskInUl();
  document.querySelector("#input").value = "";
};
window.deleteActionFromManager = function (id) {
  if (confirm("Are You Sure?")) {
    manager.deleteTask(id);
    console.log(manager);
    showTaskInUl();
    console.log(id);

  }
};

window.updateActionInTask = function (id) {
  let newTask = prompt("Enter New Description:");
  if(newTask == null || newTask == "") alert("Something went Wrong");
  else{

    manager.updateTaskDescription(id, newTask);
    showTaskInUl();
    document.querySelector("#input").value = "";

  }
};
window.updateCompleteTask = function (id){
  
  manager.completeTask(id);
  showTaskInUl();
};

window.deleteCompletedTask = function (id) {
  const liCompleted = document.querySelector("#li_id");
  if (confirm("Are You Sure?")) {
      liCompleted.remove();
  }
  showTaskInUl();
};

function showTaskInUl() {
  const ulElement = document.querySelector("#ul_id");
  ulElement.innerHTML = "";
  for (let action of manager.actions) {
    ulElement.innerHTML += `
      <li class="list-group-item active d-flex justify-content-between" aria-current="true">
        ${action.description}
        <div class="box" style="cursor: pointer;">
          <i onclick="updateCompleteTask(${action.id})" style="margin-left: 0.5rem" class="fa-solid fa-check fa-beat"></i>
          <i onclick="updateActionInTask(${action.id})" style="margin-left: 0.5rem" class="fa-solid fa-pen fa-beat"></i>
          <i onclick="deleteActionFromManager(${action.id})" style="margin-left: 0.5rem" class="fa-solid fa-trash fa-beat"></i>
        </div>
      </li>`;
  }
}

export { showTaskInUl };

let manager = new TaskManager();

