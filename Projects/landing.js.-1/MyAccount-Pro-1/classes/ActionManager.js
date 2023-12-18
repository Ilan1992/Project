export default class ActionManager{
  constructor(){
    this.actions = localStorage.getItem("actions")? JSON.parse(localStorage.getItem("actions")):[];
    this.balance = 0
    this.calcBalance();
  }
  addAction(action){
    this.actions.push(action);
    this.calcBalance();
  }
  updateAction(actionId,newAmount){
    let indexToUpdate = this.actions.findIndex(
      (action) => action.id == actionId
    );
    
    this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "income" ? newAmount : -newAmount;
    this.calcBalance();
  }
  deleteAction(actionId){
    let indexToDelete = this.actions.findIndex(
      (action) => action.id == actionId
    );
    this.actions.splice(indexToDelete, 1);
    this.calcBalance();
  }
  calcBalance(){
    this.balance = 0;
    for(let action of this.actions){
      this.balance += action.amount
    }
    document.querySelector('#balance').innerHTML = `<h3>Balance: ${this.balance}</h3>`;
  }

}