let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let input = document.getElementById("taskInput");
let list = document.getElementById("taskList");
let themeBtn = document.getElementById("themeBtn");
let container = document.querySelector(".container");

function showTasks() {
  list.innerHTML = "";

  let doneCount = 0;

  tasks.forEach(function(task, index) {

    if (task.done === true) {
      doneCount = doneCount + 1;
    }

    let li = document.createElement("li");

    let left = document.createElement("div");
    left.className = "task-left";

    let circle = document.createElement("div");
    circle.className = "circle";

    if (task.done === true) {
      circle.classList.add("done");
    }

    // toggle task status
    circle.onclick = function () {
      if (task.done === true) {
        task.done = false;
      } else {
        task.done = true;
      }

      save();
      showTasks();
    };

    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.done === true) {
      span.classList.add("done-text");
    }

    let del = document.createElement("button");
    del.innerText = "X";
    del.className = "delete-btn";

    del.onclick = function () {
      tasks.splice(index, 1);
      save();
      showTasks();
    };

    left.appendChild(circle);
    left.appendChild(span);

    li.appendChild(left);
    li.appendChild(del);

    list.appendChild(li);
  });

  document.getElementById("total").innerText = tasks.length;
  document.getElementById("done").innerText = doneCount;
  document.getElementById("pending").innerText = tasks.length - doneCount;
}

document.getElementById("addBtn").onclick = function () {

  if (input.value === "") {
    return;
  }

  let newTask = {
    text: input.value,
    done: false
  };

  tasks.push(newTask);

  input.value = "";

  save();
  showTasks();
};

// add task on Enter key
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("addBtn").click();
  }
});

// save tasks to localStorage
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// toggle dark mode
themeBtn.onclick = function () {

  if (container.classList.contains("dark")) {
    container.classList.remove("dark");
  } else {
    container.classList.add("dark");
  }

};

showTasks();