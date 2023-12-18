import Action from "./classes/Action.js";
import ActionManager from "./classes/ActionManager.js";


window.addActionToManager = () => {
  let type = document.querySelector("#type").value;
  let description = document.querySelector("#description").value;
  let amount = +document.querySelector("#amount").value;

  const action = new Action(type, description, amount);

  manager.addAction(action);
  showActionsInTable();
  document.querySelector("#description").value = "";
  document.querySelector("#amount").value = "";
};

window.deleteActionFromManager = function (actionId) {
  if (confirm("Are You Sure?")) {
    manager.deleteAction(actionId);
    showActionsInTable();
  }
};

window.updateActionInManager = function (actionId) {
  let newAmount = prompt("Please Enter New Amount:");
  if (newAmount == null || newAmount == "") alert("Something went wrong");
  else {
    manager.updateAction(actionId, +newAmount);
    showActionsInTable();
  }
};

function showActionsInTable() {
  document.querySelector("#actions").innerHTML = "";
  localStorage.setItem("actions",JSON.stringify(manager.actions))
  for (let action of manager.actions) {
    document.querySelector("#actions").innerHTML += `<tr class="${
      action.type == "income" ? "text-success" : "text-danger"
    }">
      <th scope="row">${action.description}</th>
      <td>${action.amount}</td>
      <td onclick="updateActionInManager(${
        action.id
      })"><i style="cursor: pointer" class="fa-regular fa-pen-to-square"></i></td>
      <td onclick="deleteActionFromManager(${
        action.id
      })"><i style="cursor: pointer" class="fa-solid fa-trash"></i></td>
    </tr>`;
  }
}

let manager = new ActionManager();


showActionsInTable();
