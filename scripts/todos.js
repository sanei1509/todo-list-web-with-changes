// VARIABLE GLOBALES
let user;
let todos = [];
// CONSTANTES UTILITARIAS
const priority = {
  LOW: "LOW",
  MED: "MED",
  HIGH: "HIGH",
};

/**
 * Filtra las tareas mostradas en la UI basandose en las palabras clave escritsa en la caja de busqueda
 */

function applySearchFilter() {
  // Obtenemos el valor de la caja de  busqueda y lo limpiamos
  const keywords = document.getElementById("search-keywords").value.trim();

  // Filtrado de tareas que coinciden con titulo "O" descripción
  const result = todos.filter((todo) => {
    const titleMatch = todo.title.toLowerCase().includes(keywords);
    const descriptionMatch = todo.descriptio.toLowerCase().includes(keywords);

    return titleMatch || descriptionMatch;
  });
  console.log("Resultado del filtro", result);
}

/**
 * Aplica filtro por tipo a las tareas
 *  @param {*} filterType Valores posibles (MY_DAY, IMPORTANT, ALL)
 *
 */

let filtro1 = document.getElementById("filtro");
let filtro2 = document.getElementById("filtro2");
let filtro3 = document.getElementById("filtro3");

const regularFilter = function (element) {
  element.classList.remove("active");
};

function applyTypeFilter(filterType) {
  switch (filterType) {
    case "MY_DAY":
      // TODO: Aplicar filtro de tareas diarias
      filtro1.classList.toggle("active");
      regularFilter(filtro2);
      regularFilter(filtro3);
      break;
    case "IMPORTANT":
      // TODO: Aplicar filtro de tareas marcadas como importantes
      filtro2.classList.toggle("active");
      regularFilter(filtro1);
      regularFilter(filtro3);
      break;
    case "ALL":
      // TODO: Mostrar todas las tareas
      filtro3.classList.toggle("active");
      regularFilter(filtro1);
      regularFilter(filtro2);
      break;
    default:
      console.error("Filtro no soportado");
      break;
  }
}

// Obtenemos la lista de tareas completa (actually HARDCODED == QUEMADA, pasara al servidor);
function fetchToDos() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 3);

      todos = [
        {
          id: 1,
          title: "Test 1",
          content: "Contenido de la tarea 1",
          completed: false,
          priority: priority.LOW,
          dueDate: dueDate,
          category: "",
          location: {
            latitude: -56.1887393,
            longitude: -34.8921648,
          },
          files: [
            "https://images.prismic.io/clubhouse/25ac590e-8e8d-4785-910a-be2a532b02a2_home_shapes_1.png?auto=format%2Ccompress&fit=max&q=50&w=800",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIj6Jcgoa1_3PeOF_QEhoAdiPoi7VAs3SKWhDDImmd9fKPK9gAiggGhauGGOjst2Fjfys&usqp=CAU",
          ],
          subTasks: [
            {
              title: "Titulo de la sub-tarea 1",
              completed: true,
            },
            {
              title: "Titulo de la sub-tarea 2",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Test 2",
          content: "Contenido de la tarea 2",
          completed: true,
          priority: priority.HIGH,
          category: "",
          subTasks: [
            {
              title: "Titulo de la sub-tarea 1",
              completed: true,
            },
          ],
        },
        {
          id: 3,
          title: "Test 3",
          content: "Contenido de la tarea 3",
          completed: true,
          priority: priority.MID,
        },
      ];

      resolve();
    }, 400);
  });
}

function initialLoad() {
  // showLoader();

  fetchToDos().then(() => {
    renderToDos();
    hideLoader();
  });
}

//Renderiza o Muestra la lista de tareas en pantalla
function renderToDos() {
  const todosContainer = document.getElementById("todos-container");
  const todoTemplate = document.getElementById("todo-template");

  todosContainer.innerHTML = "";

  if (todos.length > 0) {
    for (let todosIndex = 0; todosIndex < todos.length; todosIndex++) {
      // Creamos un clon a partir del elemento template "todo-temlpate"
      const todoClone = todoTemplate.content.cloneNode(true);

      //Seleccionamos todos los elementos que vamos a utilizar
      const todoCloneCardElement = todoClone.querySelector(".card");
      const todoCloneTitleElement = todoClone.querySelector(".card-title");
      const todoCloneContentElement = todoClone.querySelector(".card-text");
      const todoCloneActionsElement = todoClone.querySelector(
        ".card-floating-actions"
      );
      const todoCloneChangeTodoStatusButtonElement = todoClone.querySelector(
        ".btn-change-todo-status"
      );
      const todoCloneViewTodoButtonElement =
        todoClone.querySelector(".btn-view-todo");
      const todoCloneDeleteTodoButtonElement =
        todoClone.querySelector(".btn-delete-todo");
      const changeStatusIconElement =
        todoCloneChangeTodoStatusButtonElement.querySelector("i.bi");

      // ##########################################
      // Seteo de eventos
      // ##########################################

      // Al entrar a una tarjeta mostrar iconos flotantes de acción
      todoCloneCardElement.addEventListener("mouseenter", () => {
        todoCloneActionsElement.classList.remove("d-none");
      });

      // Agregamos evento que oculta las acciones cuando el mouse sale de la card
      todoCloneCardElement.addEventListener("mouseleave", () => {
        todoCloneActionsElement.classList.add("d-none");
      });

      // Agregamos evento para cambiar el estado de una tarea (completa / no completa)
      todoCloneChangeTodoStatusButtonElement.addEventListener("click", () => {
        todos[todosIndex].completed = !todos[todosIndex].completed;
        renderToDos();
      });

      // Agregamos evento para ver todos los datos de una tarea
      todoCloneViewTodoButtonElement.addEventListener("click", () => {
        alert("Ver tarea ID: " + todos[todosIndex].id);
      });

      // Agregamos evento para eliminar una tarea
      todoCloneDeleteTodoButtonElement.addEventListener("click", () => {
        alert("Eliminar tarea ID: " + todos[todosIndex].id);
      });

      // ##########################################
      // Seteo de contenido
      // ##########################################

      // Seteamos el color del borde en base a la priodidad de la tarea
      todoCloneCardElement.classList.add(
        getTodoBorderClass(todos[todosIndex].priority)
      );

      // Si la tarea esta completada, agregamos una clase para tachar el titulo
      if (todos[todosIndex].completed) {
        todoCloneTitleElement.classList.add("text-decoration-line-through");
        changeStatusIconElement.classList.add("bi-circle-fill");
      } else {
        changeStatusIconElement.classList.add("bi-circle");
      }

      // Seteamos el titulo de la tarea en el clon
      todoCloneTitleElement.innerText = todos[todosIndex].title;

      // Seteamos el contenido de la tarea en el clon
      todoCloneContentElement.innerText = todos[todosIndex].content;

      // Agregamos la tarea clonada al contenedor de tareas
      todosContainer.appendChild(todoClone);
    }
  } else {
    const createTodoHint = document.getElementById("create-new-todo-hint");

    createTodoHint.classList.remove("d-none");
    todosContainer.classList.add("d-none");
  }
}

// TODO: Dada la prioridad de la tarea, retorna la clase para aplicar en la tarjeta
function getTodoBorderClass(todoPriority) {
  switch (todoPriority) {
    case priority.HIGH:
      return "border-danger";
    case priority.MID:
      return "border-warning";
    default:
      return "border-success";
  }
}

// TODO: SI la tarea esta completada ir cambiando el icono flotanta correspondiente

// Creamos una tarea Nueva
function createToDo() {}
// Editamos el valor de una tarea
function editToDo() {}
// Eliminamos una tarea
function deleteToDo() {}

function changeToDoPriority() {}

function openToDoCreator() {
  const todoCreatorElement = document.getElementById("todo-creator-modal");
  const bootstrapModal = new bootstrap.Modal(todoCreatorElement);

  bootstrapModal.show();
}
