class Card {
  constructor(title, description, priority, status) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
  }
}

const cards = [];

let body = document.querySelector("body");

function createAddTask() {
  let addTask = document.createElement("div");
  addTask.classList.add("form");
  addTask.id = "addTask";

  addTask.innerHTML = `    <h2>Add Task</h2>
  <div>
    <label for="titleInput">Title</label>
    <input type="text" id="titleInput" placeholder="Title" required/>
  </div>
  <div>
    <label for="descriptionInput">Description</label>
    <input type="text" id="descriptionInput" placeholder="Description" required/>
  </div>
  <div>
    <label for="statusSelect">Status</label>
    <select name="status" id="statusSelect">
      <option value="toDo">To Do</option>
      <option value="doing">Doing</option>
      <option value="stuck">Stuck</option>
      <option value="done">Done</option>
    </select>
  </div>
  <div>
    <label for="prioritySelect">Priority</label>
    <select name="priority" id="prioritySelect">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  </div>
  <button id="addCard">Add Card</button>`;

  body.appendChild(addTask);
  document.getElementById("addCard").addEventListener("click", () => {
    if (
      document.getElementById("titleInput").value == "" ||
      document.getElementById("descriptionInput").value == ""
    ) {
      document.getElementById("titleInput").placeholder = "cannot be empty";
      document.getElementById("descriptionInput").placeholder =
        "cannot be empty";
    } else {
      cards.push(
        new Card(
          document.getElementById("titleInput").value,
          document.getElementById("descriptionInput").value,
          document.getElementById("prioritySelect").value,
          document.getElementById("statusSelect").value
        )
      );
      document.getElementById("addTask").remove();
    }
  });
}

createAddTask();
console.log(cards);
