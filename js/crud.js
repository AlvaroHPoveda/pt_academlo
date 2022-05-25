// -------------------------------LIST TASKS----------------------------------------------
// ---------------------------------------------------------------------------------------
const listTasks = async () => {
  let token = localStorage.getItem("token").split("|")[1];

  let requestOptionsGetListTasks = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  await fetch(
    "https://tasks-crud.academlo.com/api/tasks",
    requestOptionsGetListTasks
  )
    .then((response) => response.text())
    .then((data) => localStorage.setItem("listTasks", data))
    .catch((error) => error);

  let listTasks = JSON.parse(localStorage.getItem("listTasks"));

  let list = document.querySelector("#list");

  let fragment = "";
  listTasks.forEach((item) => {
    fragment += `
  <li class="list">
    <header class="headerList">
      <b>Tarea <span class="idTask">${item.id}</span></b>
      <button class="buttonDelete"></button>
      <button class="buttonScreenUpdateTask">
        <div class="dataTask">
          <p class="nameTask">${item.name}</p>
          <p class="descriptionTask">${item.description}</p> 
          <p class="statusTask">${item.status_id}</p> 
        </div>
      </button> 
    </header>
    <main class="mainList">
      <b class="nameTask">${item.name}</b>
      <span class="description">DESCRIPCIÓN</span>
      <p class="descriptionTask">${item.description}</p>
    </main>
    <footer>      
      <select class="selectStatus" onchange="valueSelect(this)">
        <option selected="true" disabled="disabled">
        ${
          item.status_id == 1
            ? "Iniciada"
            : item.status_id == 2
            ? "En pausa"
            : item.status_id == 3
            ? "Terminada"
            : "null"
        }</option>
        <option value='1,${item.id}'>Iniciada</option>
        <option value='2,${item.id}'>En pausa</option>
        <option value='3,${item.id}'>Terminada</option>
      </select>
    </footer>
  </li>  
  `;
  });
  list.innerHTML = fragment;
};
listTasks();

// -------------------------------CREATE TASKS--------------------------------------------
// ---------------------------------------------------------------------------------------
let buttonImgX = document.querySelector(".buttonImgX");
buttonImgX.addEventListener("click", (e) => {
  let screenCreateTask = document.querySelector(".screenCreateTask");
  screenCreateTask.style.left = "-100%";
});

let buttonScreenCreateTask = document.querySelector(".buttonNewTask");
buttonScreenCreateTask.addEventListener("click", (e) => {
  document.getElementById("nameTask").value = "";
  document.getElementById("descriptionTasks").value = "";
  let screenCreateTask = document.querySelector(".screenCreateTask");
  screenCreateTask.style.left = "0";
});
let createTasks = document.getElementById("createTask");
async function createTask(e) {
  e.preventDefault();
  e.stopPropagation();

  let name = document.getElementById("nameTask");
  let description = document.getElementById("descriptionTasks");

  let data = {
    name: name.value,
    description: description.value,
  };

  let requestOptionsPostCreateTask = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    redirect: "follow",
  };

  await fetch(
    "https://tasks-crud.academlo.com/api/tasks",
    requestOptionsPostCreateTask
  )
    .then((response) => response.text())
    // .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  listTasks();
  let screenCreateTask = document.querySelector(".screenCreateTask");
  screenCreateTask.style.left = "-100%";
}

createTasks.addEventListener("submit", createTask);

let buttonCancelCreate = document.querySelector(".buttonCancelCreate");

buttonCancelCreate.addEventListener("click", (e) => {
  let screenCreateTask = document.querySelector(".screenCreateTask");
  screenCreateTask.style.left = "-100%";
  e.stopPropagation();
});

// -------------------------------UPDATE TASKS--------------------------------------------
// ---------------------------------------------------------------------------------------
let buttonImgXUpdate = document.querySelector(".buttonImgXUpdate");
buttonImgXUpdate.addEventListener("click", (e) => {
  let screenCreateTask = document.querySelector(".screenUpdateTask");
  screenCreateTask.style.left = "-100%";
});

let token = localStorage.getItem("token").split("|")[1];
list.addEventListener("click", (e) => {
  editTask(e);
});

const editTask = (e) => {
  if (e.target.classList.contains("buttonScreenUpdateTask")) {
    setEditTask(e.target.parentElement);
    let screenUpdateTask = document.querySelector(".screenUpdateTask");
    screenUpdateTask.style.left = "0";
  }
  e.stopPropagation();
};

const setEditTask = (object) => {
  const task = {
    id: object.querySelector(".idTask").textContent,
    name: object.querySelector(".nameTask").textContent,
    description: object.querySelector(".descriptionTask").textContent,
    status: object.querySelector(".statusTask").textContent,
  };

  document.getElementById("nameTaskUpdate").value = task.name;
  document.getElementById("descriptionTasksUpdate").value = task.description;

  localStorage.setItem("id", task.id);
};

let UpdateTask = document.getElementById("UpdateTask");

async function postUpdate(e) {
  e.preventDefault();

  let name = document.getElementById("nameTaskUpdate");
  let description = document.getElementById("descriptionTasksUpdate");
  let taskId = localStorage.getItem("id");

  let dataUpdate = {
    name: name.value,
    description: description.value,
  };

  let requestOptionsPutUpdateTask = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataUpdate),
    redirect: "follow",
  };

  await fetch(
    `https://tasks-crud.academlo.com/api/tasks/${taskId}`,
    requestOptionsPutUpdateTask
  )
    .then((response) => response.text())
    // .then((result) => console.log(result))
    .catch((error) => error);

  listTasks();
  let screenCreateTask = document.querySelector(".screenUpdateTask");
  screenCreateTask.style.left = "-100%";
}

UpdateTask.addEventListener("submit", postUpdate);

let buttonCancel = document.querySelector(".buttonCancel");

buttonCancel.addEventListener("click", (e) => {
  let screenCreateTask = document.querySelector(".screenUpdateTask");
  screenCreateTask.style.left = "-100%";
});

// -------------------------------STATUS TASKS--------------------------------------------
// ---------------------------------------------------------------------------------------
async function valueSelect(selectObject) {
  let selectStatus = selectObject.value;
  let restSelect = selectStatus.split(",");

  let requestOptionsPutUpdateTask = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  await fetch(
    `https://tasks-crud.academlo.com/api/tasks/${restSelect[1]}/status/${restSelect[0]}`,
    requestOptionsPutUpdateTask
  )
    .then((response) => response.text())
    // .then((result) => console.log(result))
    .catch((error) => error);
}
// -------------------------------DELETE TASKS--------------------------------------------
// ---------------------------------------------------------------------------------------
list.addEventListener("click", (e) => {
  deleteTask(e);
});

const deleteTask = (e) => {
  if (e.target.classList.contains("buttonDelete")) {
    setDeleteTask(e.target.parentElement);
  }
  e.stopPropagation();
};

const setDeleteTask = async (object) => {
  const task = {
    id: object.querySelector(".idTask").textContent,
  };
  console.log(task);

  let requestOptionsDeleteTask = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  await fetch(
    `https://tasks-crud.academlo.com/api/tasks/${task.id}`,
    requestOptionsDeleteTask
  )
    .then((response) => response.text())
    // .then((result) => console.log(result))
    .catch((error) => error);

  listTasks();
};

// ---------------------------------------------------------------------------------------
