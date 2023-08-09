document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to update the tasks in local storage
    const updateLocalStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };
  
    // Load stored tasks on page load
    storedTasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  
    addTaskButton.addEventListener('click', function () {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        storedTasks.push({ text: taskText, completed: false });
        updateLocalStorage();
        createTaskElement({ text: taskText, completed: false });
        taskInput.value = '';
      }
    });
  
    taskList.addEventListener('click', function (event) {
      const target = event.target;
  
      if (target.tagName === 'BUTTON') {
        const taskElement = target.parentElement;
        const taskIndex = Array.from(taskElement.parentElement.children).indexOf(taskElement);
        const taskData = storedTasks[taskIndex];
  
        if (target.className === 'delete') {
          if(confirm('Are you sure you want to delete this task?')) {
            storedTasks.splice(taskIndex, 1);
            updateLocalStorage();
            taskElement.remove();
          }
        } else if (target.className === 'edit') {
          const taskSpan = taskElement.querySelector('span');
          const editedText = prompt('Edit task:', taskData.text);
  
          if (editedText !== null) {
            storedTasks[taskIndex].text = editedText;
            updateLocalStorage();
            taskSpan.textContent = editedText;
          }
        }
      } else if (target.tagName === 'SPAN') {
        const taskElement = target.parentElement;
        const taskIndex = Array.from(taskElement.parentElement.children).indexOf(taskElement);
  
        taskElement.classList.toggle('completed');
        storedTasks[taskIndex].completed = !storedTasks[taskIndex].completed;
        updateLocalStorage();
      }
    });
  
    function createTaskElement(taskData) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span>${taskData.text}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>`;
      taskList.appendChild(listItem);
  
      if (taskData.completed) {
        listItem.classList.add('completed');
      }
    }
  });
  