// let tasks = [];
    
// function addTask() {
//   // Получаем значение из поля ввода
//   let taskInput = document.getElementById("taskInput");
//   let taskText = taskInput.value;
  
//   if (taskText !== "") {
//     // Добавляем новую задачу в массив
//     tasks.push(taskText);
    
//     // Очищаем поле ввода
//     taskInput.value = "";
    
//     // Обновляем список задач
//     updateTaskList();
//   }
// }

// function updateTaskList() {
//   // Очищаем список задач
//   let taskList = document.getElementById("taskList");
//   taskList.innerHTML = "";
  
//   // Добавляем каждую задачу в список
//   tasks.forEach(function(task) {
//     let listItem = document.createElement("li");
//     listItem.textContent = task;
//     taskList.appendChild(listItem);
//   });
// }