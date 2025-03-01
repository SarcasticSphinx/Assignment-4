const theme_toggle = document.getElementById("theme-toggle");
const task_done_count = document.getElementById("task-done-count");
const remaining_task_count = document.getElementById("remaining-task-count");
const completed_btn = document.querySelectorAll(".completed-btn");
const activity_logs = document.getElementById("activity-logs");
const clear_logs_btn = document.getElementById("clear-btn");
const day = document.getElementById("day");
const date = document.getElementById("date");

//realtime date and time
day.innerText = new Date().toLocaleDateString("en-US", { weekday: "short" });
date.innerText = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

//theme toggle
theme_toggle.addEventListener("click", () => {
  const colors = ["#FFCCCC", "#CCFFCC", "#CCCCFF", "#FFFFCC", "#CCFFFF"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});

let task_done = 0;
let task_remaining = 6;
let activity_log = [];

function updateTaskCount() {
  task_done_count.innerText = `0${task_done}`;
  remaining_task_count.innerText = `0${task_remaining}`;
}

function taskCompleted() {
  if (task_remaining > 0) {
    task_done += 1;
    task_remaining -= 1;
    updateTaskCount();
  } else {
    alert("No remaining tasks!");
  }
}

function updateActivityLogs(task) {
  if (!task) return;

  activity_log.push(task);
  const HTML = activity_log
    .map((log) => {
      return `<p class="log-entry">You have completed the task "${log}" at ${new Date().toLocaleString()}</p>`;
    })
    .join("");

  activity_logs.innerHTML = HTML;
}

completed_btn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    alert("Board Updated Successfully!");
    const task = event.target.getAttribute("data-taskName");

    taskCompleted();
    updateActivityLogs(task);

    // Disable the clicked button
    event.target.disabled = true;
    event.target.classList.add("disabled");

    if (task_remaining === 0) {
      alert("Congratulations! You have completed all the current tasks.");
      return;
    }
  });
});

clear_logs_btn.addEventListener("click", () => {
  task_done = 0;
  task_remaining = 6;
  updateTaskCount();
  activity_log = [];
  activity_logs.innerHTML = "";
});
