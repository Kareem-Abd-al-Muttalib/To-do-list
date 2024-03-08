let btn = document.querySelector("#btn");
let inp = document.querySelector("#taken");
let tasks = document.querySelector(".tasks");

let tasksArr = []

window.addEventListener("load", ()=>{
  if (window.localStorage.tasks) {
    tasksArr = JSON.parse(window.localStorage.tasks);
    addToPage();
  }
});

btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (inp.value != "") {
    createTask(inp.value);
    inp.value = "";
    inp.focus();
  };
})

let createTask = (taskValue) => {
  if (inp.value) { 
    let task = {
      title : taskValue,
      id : Date.now(),
      completed: false,
    }
    tasksArr.push(task);
  }
  window.localStorage.tasks = JSON.stringify(tasksArr);
  addToPage();
};

let addToPage = () => {
  tasks.innerHTML = "";
  for (const task of tasksArr) {
    // create elements
    let sect = document.createElement("section");
    let newP = document.createElement("p");
    let newB = document.createElement("button");
    sect.classList = "task";
    newB.classList = "del";
    newB.innerText = "Delete";
    // Add to tasks div
    sect.id = task.id;
    sect.title = task.title;
    newP.innerHTML = sect.title;
    sect.append(newP);
    sect.append(newB);
    tasks.append(sect);

    if (task.completed == true) {
      sect.classList = "task done"
    }
  }
}

tasks.addEventListener("click", (e)=> {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteSect(e.target.parentElement.id);
  }
  if (e.target.parentElement.classList.contains("task")) {
    doneToggle(e.target.parentElement);
    // e.target.classList.toggle("done");
  }
});

let deleteSect = (taskId) => {
  tasksArr = tasksArr.filter((task)=>task.id != taskId)
  window.localStorage.tasks = JSON.stringify(tasksArr);
};

let doneToggle = (ele) => {
  for (const e of tasksArr) {
    if (ele.id == e.id) {
      e.completed == false ?  e.completed = true : e.completed = false;
    }
    }
    window.localStorage.tasks = JSON.stringify(tasksArr);
    addToPage()
}