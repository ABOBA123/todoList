let renderMonth;
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
let activeDate = new Date()
function changeMonth(moveTo) {
  if (moveTo) {
    renderMonth = new Date(
      renderMonth.getFullYear(),
      renderMonth.getMonth() + 1
    );
  } else {
    renderMonth = new Date(
      renderMonth.getFullYear(),
      renderMonth.getMonth() - 1
    );
  }
  renderCalendar(renderMonth);
}

function renderCalendar(date) {
  let data = date ? new Date(date) : new Date();
  renderMonth = data;
  year.innerText = data.getFullYear();
  let index = data.getMonth();
  month.innerText = months[index];
  let startDate = new Date(data.getFullYear(), data.getMonth(), 1);
  let endDate = new Date(data.getFullYear(), data.getMonth() + 1, 0);
  let matrix = [];
  let stepDate = startDate;
  while (stepDate.valueOf() <= endDate.valueOf()) {
    if (!matrix.length) {
      let dates = [];
      for (let i = 0; i < stepDate.getDay() - 1; i++) {
        dates.push(null);
      }
      if (stepDate.getDay() !== 0) {
        dates.push(stepDate);
      }
      matrix.push(dates);
    } else {
      if (matrix[matrix.length - 1].length < 7) {
        matrix[matrix.length - 1].push(stepDate);
      } else {
        matrix.push([stepDate]);
      }
    }
    stepDate = new Date(
      stepDate.getFullYear(),
      stepDate.getMonth(),
      stepDate.getDate() + 1
    );
  }
  while (calendar.firstChild) {
    calendar.removeChild(calendar.firstChild);
  }
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const daysListElement = document.getElementById("daysList");

  daysListElement.innerHTML = "";

  daysOfWeek.forEach((day) => {
    const listItem = document.createElement("li");
    listItem.textContent = day;
    daysListElement.appendChild(listItem);
  });

  matrix.forEach((row) => {
    let tr = document.createElement("tr");
    row.forEach((item) => {
      let th = document.createElement("th");
      if (item) {
        th.innerText = new Date(item).getDate();

        if (
          new Date(item).getDate() === new Date().getDate() &&
          new Date(item).getMonth() === new Date().getMonth() &&
          new Date(item).getFullYear() === new Date().getFullYear()
        ) {
          th.className = "today";
        }
        let clickDate = tr.className;
        th.onclick = function () {
          const elements = document.getElementsByClassName("click-date");
          activeDate = this
          if (this.classList.contains("click-date")) {
            this.classList.remove("click-date");
          } else {
            while (elements.length) {
              elements[0].classList.remove("click-date");
            }
            this.classList.add("click-date");
            if(activeDate){
              addTask(true)
            }
            else{
              addTask(false)
            }
          }
        };
      }
      tr.appendChild(th);
    });
    calendar.appendChild(tr);
  });
}
renderCalendar();
//////////////////////////////////////////////////////
const todoContainer = document.getElementById('Todo');
const buttonsContainer = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');
const popupButton = document.createElement('button');
const taskList = document.createElement('ul');
const backpopup = document.createElement('div');
const popup = document.createElement('div');

input.className = "calendar-input grey";
input.placeholder = "enter the task";
button.className = "count-case";
button.innerText = "Add Task";

popupButton.innerText="open all tasks"
popupButton.className = "count-case";
backpopup.className="back-popup"
popup.className="popup"
button.addEventListener('click', addTask);

buttonsContainer.appendChild(input);
buttonsContainer.appendChild(button);
buttonsContainer.appendChild(popupButton)
todoContainer.appendChild(buttonsContainer);
todoContainer.appendChild(taskList);

popupButton.onclick = function(){
    buttonsContainer.appendChild(backpopup);
    buttonsContainer.appendChild(popup);
    backpopup.onclick = function() {
        buttonsContainer.removeChild(backpopup);
        buttonsContainer.removeChild(popup);
    }
}


  

let tasks = []; // массив для хранения задач

function addTask() {
  const taskText = input.value.trim();
  
  if (taskText !== '') {
    tasks.push({text: taskText}); // добавление новой задачи в массив
    localStorage.setItem('tasks', JSON.stringify(tasks)); // хранение массива вlocalStorage
    
    const taskItem = document.createElement('li');
    taskItem.className = "task-text";
    taskItem.innerText = taskText;
    taskList.appendChild(taskItem);
    taskItem.onclick = function() {
      if (taskItem.className === "cross-case") {
        taskItem.className = "task-text";
      } else {
        taskItem.className = "cross-case";
      }
    }
    const popupItem = document.createElement('div');
    popupItem.className = "task-text";
    popupItem.onclick = function() {
      if (popupItem.className === "cross-case") {
        popupItem.className = "task-text";
      } else {
        popupItem.className = "cross-case";
      }
    }
    popupItem.innerText = taskText;
    popup.appendChild(popupItem);
  
    input.value = '';
  }
}
