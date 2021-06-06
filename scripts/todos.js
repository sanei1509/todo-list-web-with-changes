// VARIABLE GLOBALES
let user;
let todos = [];
// CONSTANTES UTILITARIAS
const taskPrority = {
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
 *  'parametro'  filterType Valores posibles (MY_DAY, IMPORTANT, ALL)
 *
 */

let filtro1 = document.getElementById("filtro");
let filtro2 = document.getElementById("filtro2");
let filtro3 = document.getElementById("filtro3");

const regular = function (element) {
  element.classList.remove("active");
};

function applyTypeFilter(filterType) {
  switch (filterType) {
    case "MY_DAY":
      // TODO: Aplicar filtro de tareas diarias
      filtro1.classList.toggle("active");
      regular(filtro2);
      regular(filtro3);
      break;
    case "IMPORTANT":
      // TODO: Aplicar filtro de tareas marcadas como importantes
      filtro2.classList.toggle("active");
      regular(filtro1);
      regular(filtro3);
      break;
    case "ALL":
      // TODO: Mostrar todas las tareas
      filtro3.classList.toggle("active");
      regular(filtro1);
      regular(filtro2);
      break;
    default:
      console.error("Filtro no soportado");
      break;
  }
}

// Obtenemos la lista de tareas completa (actually HARDCODED == QUEMADA, pasara al servidor);
function fetchToDos() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      todos = [
        {
          title: "Test1",
          contemt: "Contenido de la tarea 1",
          completed: false,
          priority: priority.LOW,
          dueDate: dueDate,
          category: "",
          location: {
            latitude: -56.2342345,
            longitude: -20.2324332,
          },
          tasks: [
            {
              title: "titulo de la sub-tarea-1",
              completed: true,
            },
            {
              title: "titulo de la sub-tarea-2",
              complete: false,
            },
          ],
          // LLENAR CON EJEMPLOS DE DATOS NECESARIOS DE LOS USUARIOS.
        },
      ];

      resolve();
    }, 400);
  });
}

//Renderiza o Muestra la lista de tareas en pantalla
function renderToDos() {
  // showLoader();

  fetchToDos().then(function () {
    hideLoader();
  });
}

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
