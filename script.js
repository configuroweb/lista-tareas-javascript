// Intenta recuperar las tareas almacenadas en localStorage. Si no encuentra ninguna, inicializa 'tasks' como un arreglo vacío.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Guarda el arreglo de tareas en localStorage, convirtiendo el arreglo a una cadena JSON.
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Añade una nueva tarea al arreglo 'tasks' y luego actualiza la lista de tareas y el almacenamiento local.
function addTask() {
    // Obtiene el valor del input donde los usuarios escriben nuevas tareas.
    const taskInput = document.getElementById('newTask');
    // Verifica si el input no está vacío.
    if (taskInput.value) {
        // Añade la nueva tarea al arreglo 'tasks'. Cada tarea es un objeto con un ID único (basado en la fecha y hora actual), el texto de la tarea, y un estado de completado.
        tasks.push({ id: Date.now(), text: taskInput.value, completed: false });
        // Limpia el input después de añadir la tarea.
        taskInput.value = '';
        // Actualiza la lista de tareas mostrada al usuario.
        renderTasks();
        // Guarda el nuevo estado de 'tasks' en localStorage.
        saveTasks();
    }
}

// Cambia el estado de completado de una tarea específica y luego actualiza la lista de tareas y el almacenamiento local.
function toggleTaskCompletion(taskId) {
    // Encuentra el índice de la tarea a cambiar basándose en su ID.
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    // Si se encuentra la tarea, cambia su estado de 'completed'.
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        // Actualiza la lista de tareas y el almacenamiento.
        renderTasks();
        saveTasks();
    }
}

// Elimina una tarea específica del arreglo 'tasks' y luego actualiza la lista de tareas y el almacenamiento local.
function deleteTask(taskId) {
    // Filtra 'tasks' para excluir la tarea con el ID especificado.
    tasks = tasks.filter(task => task.id !== taskId);
    // Actualiza la lista de tareas y el almacenamiento.
    renderTasks();
    saveTasks();
}

// Renderiza la lista de tareas en el HTML.
function renderTasks() {
    // Obtiene el elemento que contendrá la lista de tareas.
    const tasksList = document.getElementById('tasksList');
    // Limpia la lista de tareas existente.
    tasksList.innerHTML = '';
    // Itera sobre el arreglo 'tasks', creando un elemento HTML para cada tarea y añadiéndolo a 'tasksList'.
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
                <button onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
}

// Añade un 'event listener' que renderiza la lista de tareas una vez se haya cargado el contenido de la página.
// También escucha el evento 'keypress' en el campo de entrada de nuevas tareas, permitiendo añadir tareas con la tecla 'Enter'.
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();

    const taskInput = document.getElementById('newTask');
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});


