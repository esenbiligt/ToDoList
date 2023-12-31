let body = document.querySelector("body");
let container = document.createElement("div");
container.className = "container";
container.id = "container";
body.appendChild(container);

let dragMeDiv;
let dragMeCard;

class Card {
  constructor(title, description, priority, status) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
  }
}

let toDoCards = [];
let doingCards = [];
let stuckCards = [];
let doneCards = [];

function printCards() {
  let printCards = document.createElement("button");
  printCards.className = "printCards";
  printCards.id = "printCards";
  printCards.innerText = "Print Arrays";
  printCards.addEventListener("click", () => {
    console.log("-----------------------------");
    console.log("todo: ", toDoCards);
    console.log("doing: ", doingCards);
    console.log("stuck: ", stuckCards);
    console.log("done: ", doneCards);
    console.log("-----------------------------");
  });
  container.appendChild(printCards);
}

function countCards(status) {
  let id = "cardContainer" + status;
  let titleId = "title" + status;
  let count = document.getElementById(id).childElementCount;
  document.getElementById(titleId).innerText = count;
}

function sortArray(status) {
  let high = [];
  let medium = [];
  let low = [];
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
  for (let i = 0; i < arr.length; i++) {
    let priority = arr[i].priority;
    switch (priority) {
      case "high":
        high.push(i);
        break;
      case "medium":
        medium.push(i);
        break;
      case "low":
        low.push(i);
        break;
    }
  }
  let sort = high.concat(medium, low);
  switch (status) {
    case "toDo":
      toDoCards = sort.map((i) => toDoCards[i]);
      break;
    case "doing":
      doingCards = sort.map((i) => doingCards[i]);
      break;
    case "stuck":
      stuckCards = sort.map((i) => stuckCards[i]);
      break;
    case "done":
      doneCards = sort.map((i) => doneCards[i]);
      break;
  }
}

function createBoard(statusName, status) {
  let board = document.createElement("div");
  let id = "cardContainer" + status;
  board.className = "board";
  board.innerHTML = `
  <h1 class='boardTitle'>${statusName} <span id='title${status}' class='boardCounter'>0</span></h1>
  <div class="cardContainer" id='${id}'></div>
  <button class='addTaskButton' id="addTask${status}">Add Task</button>`;
  container.appendChild(board);
  document.getElementById(id).classList.add("dropTarget");
  document.getElementById(`addTask${status}`).addEventListener("click", () => {
    createAddTask();
    document.getElementById("statusSelect").value = status;
  });
  board.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  board.addEventListener("drop", (event) => {
    event = document.getElementById(id);
    let tempStatus = dragMeCard.status;
    let arr;
    let prevArr;
    switch (tempStatus) {
      case "toDo":
        prevArr = toDoCards;
        break;
      case "doing":
        prevArr = doingCards;
        break;
      case "stuck":
        prevArr = stuckCards;
        break;
      case "done":
        prevArr = doneCards;
        break;
    }
    let deleteIndex = prevArr.indexOf(dragMeCard);
    switch (id) {
      case "cardContainertoDo":
        dragMeCard.status = "toDo";
        arr = toDoCards;
        break;
      case "cardContainerdoing":
        dragMeCard.status = "doing";
        arr = doingCards;
        break;
      case "cardContainerstuck":
        dragMeCard.status = "stuck";
        arr = stuckCards;
        break;
      case "cardContainerdone":
        dragMeCard.status = "done";
        arr = doneCards;
        break;
    }
    arr.push(dragMeCard);
    prevArr.splice(deleteIndex, 1);
    drawCards(tempStatus);
    drawCards(arr[arr.length - 1].status);
  });
  board.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
}

let isEdit;
function createAddTask() {
  isEdit = false;
  document.getElementById("container").style.filter = "brightness(40%)";
  document.getElementById("container").style.pointerEvents = "none";
  let addTask = document.createElement("div");
  addTask.className = "addTask";
  addTask.classList.add("form");
  addTask.id = "addTask";

  addTask.innerHTML = `    <h1 id='addTaskTitle' class='blue'>Add Task</h1>
  <div>
    <label for="titleInput"><h2 class='skyBlue'>Title</h2></label>
    <input type="text" id="titleInput" class='input' placeholder="Title" required/>
  </div>
  <div>
    <label for="descriptionInput"><h2 class='skyBlue'>Description</h2></label>
    <input type="text" id="descriptionInput" class='input' placeholder="Description" required/>
  </div>
  <div>
    <label for="statusSelect"><h2 class='skyBlue'>Status</h2></label>
    <select name="status" id="statusSelect" class='input'>
      <option value="toDo">To Do</option>
      <option value="doing">Doing</option>
      <option value="stuck">Stuck</option>
      <option value="done">Done</option>
    </select>
  </div>
  <div>
    <label for="prioritySelect"><h2 class='skyBlue'>Priority</h2></label>
    <select name="priority" id="prioritySelect" class='input'>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  </div>
  <button id="addCardButton" class='button'>Add Card</button>`;

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
        countCards(values[3]);
        document.getElementById("container").style.filter = "brightness(100%)";
      }
      document.getElementById("container").style.pointerEvents = "auto";
    }
  });
}

function drawCards(status) {
  sortArray(status);
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
    cardDiv.classList.add("drag");
    cardDiv.draggable = "true";
    let titleText = arr[i].title;
    let descriptionText = arr[i].description;
    console.log("title ", arr[i].title.length);
    console.log("desc ", arr[i].description.length);

    if (arr[i].title.length >= 35 || arr[i].description.length >= 35) {
      if (arr[i].title.length >= 35) {
        titleText = titleText.substring(0, 32).concat("...");
      }
      if (arr[i].description.length >= 35) {
        descriptionText = descriptionText.substring(0, 32).concat("...");
      }
    }

    cardDiv.innerHTML = `
    <div class='cardContent'>
      <div class='wrap'><h3>${titleText}</h3></div>
      <div class='wrap'><p>${descriptionText}</p></div>
      <p class="skyBlue">${arr[i].priority}</p>
    </div>
    `;
    cardDiv.addEventListener("dragstart", (event) => {
      dragMeDiv = event.target;
      let index = Array.from(dragMeDiv.parentNode.children).indexOf(dragMeDiv);
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
      dragMeCard = arr[index];
      console.log(dragMeCard);
    });
    let doneButton = document.createElement("button");
    doneButton.className = "doneButton";
    doneButton.classList.add("button");
    doneButton.innerText = "✓";
    doneButton.addEventListener("click", () => {
      let pushIndex = Array.from(cardDiv.parentNode.children).indexOf(cardDiv);
      let tempStatus = arr[pushIndex].status;
      doneCards.push(arr[pushIndex]);
      doneCards[doneCards.length - 1].status = "done";
      arr.splice(pushIndex, 1);
      cardDiv.remove();
      drawCards("done");
      countCards(tempStatus);
      countCards("done");
    });
    cardDiv.prepend(doneButton);
    let editNremove = document.createElement("div");
    editNremove.className = "editNremove";
    cardDiv.appendChild(editNremove);
    let removeButton = document.createElement("button");
    removeButton.className = "removeButton";
    removeButton.classList.add("button");
    removeButton.innerText = "x";
    removeButton.addEventListener("click", () => {
      let deleteIndex = Array.from(cardDiv.parentNode.children).indexOf(
        cardDiv
      );
      let tempStatus = arr[deleteIndex].status;
      console.log("temp status", tempStatus);
      cardDiv.remove();
      arr.splice(deleteIndex, 1);
      countCards(tempStatus);
    });
    editNremove.appendChild(removeButton);
    let editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.classList.add("button");
    editButton.innerText = "✎";
    editButton.addEventListener("click", () => {
      createAddTask();
      document.getElementById("container").style.pointerEvents = "none";
      let index = Array.from(cardDiv.parentNode.children).indexOf(cardDiv);
      isEdit = true;
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
      document.getElementById("addTask").style.backgroundColor = "lightblue";
      document.getElementById("addTaskTitle").innerText = "Edit Task";
      document.getElementById("addCardButton").innerText = "Edit Card";
      document.getElementById("titleInput").value = arr[index].title;
      document.getElementById("descriptionInput").value =
        arr[index].description;
      document.getElementById("statusSelect").value = arr[index].status;
      document.getElementById("prioritySelect").value = arr[index].priority;
      document.getElementById("addCardButton").addEventListener("click", () => {
        let tempStatus = arr[index].status;
        if (
          document.getElementById("titleInput").value == "" ||
          document.getElementById("descriptionInput").value == ""
        ) {
          document.getElementById("titleInput").placeholder = "cannot be empty";
          document.getElementById("descriptionInput").placeholder =
            "cannot be empty";
        } else {
          if (
            arr[index].status != document.getElementById("statusSelect").value
          ) {
            arr[index].status = document.getElementById("statusSelect").value;
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
          drawCards(arr[index].status);
          countCards(tempStatus);
          countCards(arr[index].status);
          document.getElementById("addTask").remove();
          document.getElementById("container").style.filter =
            "brightness(100%)";
          document.getElementById("container").style.pointerEvents = "auto";
        }
      });
    });
    editNremove.appendChild(editButton);
    document.getElementById(id).appendChild(cardDiv);
  }
  countCards(status);
}

function initialize() {
  const statusList = ["toDo", "doing", "stuck", "done"];
  const statusName = ["To do", "Doing", "Stuck", "Done"];
  for (let i = 0; i < statusList.length; i++) {
    createBoard(statusName[i], statusList[i]);
  }
}

initialize();
