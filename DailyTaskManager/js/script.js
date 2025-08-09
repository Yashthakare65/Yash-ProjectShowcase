document.addEventListener("DOMContentLoaded", () => {
  const taskNameInput = document.getElementById("taskName");
  const taskCategoryInput = document.getElementById("taskCategory");
  const taskDateInput = document.getElementById("taskDate");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = (filter = "All") => {
    taskList.innerHTML = "";

    let filteredTasks =
      filter === "All" ? tasks : tasks.filter(task => task.category === filter);

    filteredTasks.forEach((task, index) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");
      if (task.completed) taskCard.classList.add("completed");

      const taskDetails = document.createElement("div");
      taskDetails.classList.add("task-details");
      taskDetails.innerHTML = `<strong>${task.name}</strong>
        <div class="task-meta">${task.category} | Due: ${task.date}</div>`;

      const actions = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks(filter);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(filter);
      });

      actions.appendChild(checkbox);
      actions.appendChild(deleteBtn);

      taskCard.appendChild(taskDetails);
      taskCard.appendChild(actions);
      taskList.appendChild(taskCard);
    });
  };

  addTaskBtn.addEventListener("click", () => {
    const name = taskNameInput.value.trim();
    const category = taskCategoryInput.value;
    const date = taskDateInput.value;

    if (!name || !date) {
      alert("Please fill out task name and due date!");
      return;
    }

    tasks.push({ name, category, date, completed: false });
    saveTasks();
    renderTasks();

    taskNameInput.value = "";
    taskDateInput.value = "";
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      renderTasks(btn.dataset.filter);
    });
  });

  renderTasks();
});
