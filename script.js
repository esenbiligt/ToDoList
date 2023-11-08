let body = document.querySelector("body");

class Card {
  constructor(title, description, priority, status) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
  }
}

const toDoCards = [];
const doingCards = [];
const stuckCards = [];
const doneCards = [];

function printCards() {
  console.log("todo: ", toDoCards);
  console.log("doing: ", doingCards);
  console.log("stuck: ", stuckCards);
  console.log("done: ", doneCards);
  console.log("-----------------------------");
}

function createBoard(statusName, status) {
  let board = document.createElement("div");
  board.className = "board";
  board.innerHTML = `      <h1>${statusName}</h1>
  <div class="cardContainer" id='cardContainer${status}'></div>
  <button id="addTask${status}">Add Task</button>`;
  body.appendChild(board);
  document.getElementById(`addTask${status}`).addEventListener("click", () => {
    createAddTask();
    document.getElementById("statusSelect").value = status;
  });
}

let isEdit;
function createAddTask() {
  isEdit = false;
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
  <button id="addCardButton">Add Card</button>`;

  body.appendChild(addTask);
  document.getElementById("addCardButton").addEventListener("click", () => {
    if (
      document.getElementById("titleInput").value == "" ||
      document.getElementById("descriptionInput").value == ""
    ) {
      document.getElementById("titleInput").placeholder = "cannot be empty";
      document.getElementById("descriptionInput").placeholder =
        "cannot be empty";
    } else {
      let values = [
        document.getElementById("titleInput").value,
        document.getElementById("descriptionInput").value,
        document.getElementById("prioritySelect").value,
        document.getElementById("statusSelect").value,
      ];
      if (!isEdit) {
        switch (values[3]) {
          case "toDo":
            toDoCards.push(
              new Card(values[0], values[1], values[2], values[3])
            );
            break;
          case "doing":
            doingCards.push(
              new Card(values[0], values[1], values[2], values[3])
            );
            break;
          case "stuck":
            stuckCards.push(
              new Card(values[0], values[1], values[2], values[3])
            );
            break;
          case "done":
            doneCards.push(
              new Card(values[0], values[1], values[2], values[3])
            );
            break;
        }
        document.getElementById("addTask").remove();
        drawCards(values[3]);
        printCards();
      }
    }
  });
}

function drawCards(status) {
  let id = "cardContainer" + status;
  let arr = [];
  switch (status) {
    case "toDo":
      arr = toDoCards;
      break;
    case "doing":
      arr = doingCards;
      break;
    case "stuck":
      arr = stuckCards;
      break;
    case "done":
      arr = doneCards;
      break;
  }
  const clear = document.getElementById(id);
  clear.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.className = "cardDiv";
    cardDiv.innerHTML = `
    <div class='cardContent'>
      <h3>${arr[i].title}</h3>
      <p>${arr[i].description}</p>
      <p>${arr[i].priority}</p>
    </div>
    `;
    let doneButton = document.createElement("button");
    doneButton.class = "doneButton";
    doneButton.innerText = "D";
    doneButton.addEventListener("click", () => {
      let pushIndex = Array.from(cardDiv.parentNode.children).indexOf(cardDiv);
      document.getElementById("cardContainerdone").appendChild(cardDiv);
      doneCards.push(arr[pushIndex]);
      arr[pushIndex].status = "done";
      arr.splice(pushIndex, 1);
      printCards();
    });
    cardDiv.prepend(doneButton);
    let editNremove = document.createElement("div");
    editNremove.className = "editNremove";
    cardDiv.appendChild(editNremove);
    let removeButton = document.createElement("button");
    removeButton.className = "removeButton";
    removeButton.innerText = "X";
    removeButton.addEventListener("click", () => {
      let deleteIndex = Array.from(cardDiv.parentNode.children).indexOf(
        cardDiv
      );
      console.log(deleteIndex);
      cardDiv.remove();
      arr.splice(deleteIndex, 1);
      console.log(arr);
      printCards();
    });
    editNremove.appendChild(removeButton);
    let editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.innerText = "E";
    editButton.addEventListener("click", () => {
      createAddTask();
      let index = Array.from(cardDiv.parentNode.children).indexOf(cardDiv);
      isEdit = true;
      document.getElementById("addTask").style.backgroundColor = "lightblue";
      document.querySelector("h2").innerText = "Edit Task";
      document.getElementById("addCardButton").innerText = "Edit Card";
      document.getElementById("titleInput").value = arr[index].title;
      document.getElementById("descriptionInput").value =
        arr[index].description;
      document.getElementById("statusSelect").value = arr[index].status;
      document.getElementById("prioritySelect").value = arr[index].priority;
      document.getElementById("addCardButton").addEventListener("click", () => {
        if (
          document.getElementById("titleInput").value == "" ||
          document.getElementById("descriptionInput").value == ""
        ) {
          document.getElementById("titleInput").placeholder = "cannot be empty";
          document.getElementById("descriptionInput").placeholder =
            "cannot be empty";
        } else {
          console.log("status: ", arr[index].status);
          console.log("arr: ", { arr });
          if (
            arr[index].status != document.getElementById("statusSelect").value
          ) {
            switch (arr[index].status) {
              case "toDo":
                toDoCards.push(arr[index]);
                arr.splice(index, 1);
                arr = toDoCards;
                break;
              case "doing":
                doingCards.push(arr[index]);
                arr.splice(index, 1);
                arr = doingCards;
                break;
              case "stuck":
                stuckCards.push(arr[index]);
                arr.splice(index, 1);
                arr = stuckCards;
                break;
              case "done":
                doneCards.push(arr[index]);
                arr.splice(index, 1);
                arr = doneCards;
                break;
            }
            index = arr.length - 1;
            cardDiv.remove();
          }
          arr[index].title = document.getElementById("titleInput").value;
          arr[index].description =
            document.getElementById("descriptionInput").value;
          arr[index].status = document.getElementById("statusSelect").value;
          arr[index].priority = document.getElementById("prioritySelect").value;
          console.log(
            "new-status: ",
            document.getElementById("statusSelect").value
          );
          console.log("new-arr: ", { arr });
          drawCards(arr[index].status);
          document.getElementById("addTask").remove();
        }
      });
      printCards();
    });
    editNremove.appendChild(editButton);
    document.getElementById(id).appendChild(cardDiv);
  }
}

function initialize() {
  const statusList = ["toDo", "doing", "stuck", "done"];
  const statusName = ["To-do", "Doing", "Stuck", "Done"];
  for (let i = 0; i < statusList.length; i++) {
    createBoard(statusName[i], statusList[i]);
  }
}

initialize();
