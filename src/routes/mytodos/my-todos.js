const patternTodo = (data) => {
  let div = document.createElement("div");
  div.className = "todo grey border-radi";
  div.innerHTML = `<div class="circle border-rad-50 cursor-p"></div> <span class="col-white" style="font-size: 15px;">${data}</span> <img class="cursor-p" src="../pictures/trash.svg" />`;
  return div;
};

function init() {
  let myTodos = document.getElementById("data:my-todos");
  for (let i = 1; i < 5; i++) {
    let res = patternTodo(String(i));
    myTodos.appendChild(res);
  }
}

init();
