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

  const todos = [];
  const RENDER_EVENT = "render-todo";

  document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
  });
});
