// Sebuah listener yang akan menjalankan kode yang ada didalamnya ketika event DOMContentLoaded dibuat maka semua element HTML sudah dimuat menjadi DOM dengan baik.
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  function addTodo() {
    const textTodo = document.getElementById("title").value; // mengambil elemen pada HTML
    const timestamp = document.getElementById("date").value; // mengambil elemen pada HTML

    const generatedID = generateId();
    const todoObject = generateTodoObject(
      generatedID,
      textTodo,
      timestamp,
      false
    );
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }

  function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted,
    };
  }

  function makeTodo(todoObject) {
    const textTitle = document.createElement("h2"); // membuat objek DOM
    textTitle.innerText = todoObject.task; // menyematkan konten berupa teks

    const textTimestamp = document.createElement("p"); // membuat objek DOM
    textTimestamp.innerText = todoObject.timestamp; // menyematkan konten berupa teks

    const textContainer = document.createElement("div"); // membuat objek DOM
    textContainer.classList.add("inner"); // menyematkan konten berupa teks
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    return container;
  }

  const todos = [];
  const RENDER_EVENT = "render-todo";

  document.addEventListener(RENDER_EVENT, function () {
    // console.log(todos);
    const uncompletedTODOList = document.getElementById("todos");
    uncompletedTODOList.innerHTML = " ";

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      uncompletedTODOList.append(todoElement);
    }
  });
});
