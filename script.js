const addBtn = document.getElementById("add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;
/* saveTasksToLocalStorage function gathers all tasks and their states (name and completion status) and stores them in local storage as a JSON string.
This function is called whenever a task is added, edited, or deleted.*/
const saveTasksToLocalStorage = () => {
  const tasks = [];
  document.querySelectorAll(".task").forEach((taskElement) => {
    const taskName = taskElement.querySelector(".taskname").innerText;
    const isCompleted = taskElement.querySelector(".task-check").checked;
    tasks.push({ taskName, isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
/* The loadTasksFromLocalStorage function retrieves the tasks from local storage and recreates the task elements. */
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
/*The createTaskElement function creates a task element with the given name and completion status and sets up the event listeners for the edit and delete buttons as well as the checkbox. */
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

//  WITHOUT LOCAL STORAGE
/*
const addBtn = document.getElementById("add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.getElementById("tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;
const displayCount = (taskCount) => {
  countValue.innerHTML = taskCount;
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
  const task = `<div class="task">
    <input type="checkbox" class="task-check"><span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
</div>`;
  // INSERTING THE task ELEMENT INTO THE taskContainer USING insertAdjacentHTML method
  taskContainer.insertAdjacentHTML("beforeend", task);
  //adding the delete button
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });
  //adding the edit button
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
    };
  });
  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};
addBtn.addEventListener("click", addTask);
window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
*/
