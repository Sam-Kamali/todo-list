const addBtn = document.getElementById("add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const saveTasksToLocalStorage = () => {
  const tasks = [];
  document.querySelectorAll(".task").forEach((taskElement) => {
    const taskName = taskElement.querySelector(".taskname").innerText;
    const isCompleted = taskElement.querySelector(".task-check").checked;
    tasks.push({ taskName, isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task.taskName, task.isCompleted);
    taskContainer.appendChild(taskElement);
    if (!task.isCompleted) taskCount += 1;
  });
  displayCount(taskCount);
};

const displayCount = (taskCount) => {
  countValue.innerHTML = taskCount;
};

const createTaskElement = (taskName, isCompleted) => {
  const task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `
    <input type="checkbox" class="task-check" ${isCompleted ? "checked" : ""}>
    <span class="taskname ${isCompleted ? "completed" : ""}">${taskName}</span>
    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
  `;

  task.querySelector(".delete").onclick = () => {
    task.remove();
    taskCount -= 1;
    displayCount(taskCount);
    saveTasksToLocalStorage();
  };

  task.querySelector(".edit").onclick = (e) => {
    let targetElement = e.target;
    if (!(e.target.className == "edit")) {
      targetElement = e.target.parentElement;
    }
    newTaskInput.value = targetElement.previousElementSibling?.innerText;
    targetElement.parentNode.remove();
    taskCount -= 1;
    displayCount(taskCount);
    saveTasksToLocalStorage();
  };

  task.querySelector(".task-check").onchange = (e) => {
    e.target.nextElementSibling.classList.toggle("completed");
    if (e.target.checked) {
      taskCount -= 1;
    } else {
      taskCount += 1;
    }
    displayCount(taskCount);
    saveTasksToLocalStorage();
  };

  return task;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (taskName === "") {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = createTaskElement(taskName, false);
  taskContainer.appendChild(task);

  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";

  saveTasksToLocalStorage();
};

addBtn.addEventListener("click", addTask);
window.onload = () => {
  taskCount = 0;
  loadTasksFromLocalStorage();
};
