export default class Task{
  constructor(description,completed){
    this.description = description
    this.completed = false;
    this.id = Math.floor(Math.random()*1000);

  }
  get(propName){
    return  this[propName]
  }
  set(propName,newValue){
    this[propName] = newValue;
  }
}