const addTaskBtn = document.querySelector('.add-task-btn');
        const createTaskBtn = document.querySelector('.create-task-btn');
        const saveTaskBtn = document.querySelector('.save-task-btn');
        const taskNameInput = document.getElementById('taskname');
        const taskDateInput = document.getElementById('taskdate');
        const addTaskModal = document.querySelector('.add-task-modal');
        const closeTaskModal = document.querySelector('.close-task-modal');
        const listBox = document.querySelector('.listbox');
        const saveInd = document.getElementById("saveIndex");
        const alert = document.querySelector('.alert');
        const alertMsgBox = document.querySelector('.alertmsgbox');
        const alertTxt = document.querySelector('.alerttxt');
        const taskModalTitle = document.querySelector('.task-modal-title');
        const activeTask = document.querySelector('.active-task span');
        const greetings = document.querySelector('.greeting');
        const todoTasks = [
            {
                taskname: 'Buy Laptop',
                taskdate: '25/6/2023'
            }
        ];
        let tsk = [];
        const deletedTask = [];
        // Day Greetings
        const greeting = function () {
            const hour = new Date().getHours();
            if (hour > 5 && hour < 10) {
                return 'Good morning'
            } else if (hour > 9 && hour < 19) {
                return 'Good afternoon'
            }
            else {
                return 'Good night'
            }
        }
        greetings.innerHTML = greeting();
        // Modal Open
        const modalOpen = function () {
            //addTaskModal.classList.remove('hidden');
            $(".hidden").show(400);
        }
        // Modal Close
        const modalClose = function () {
            //addTaskModal.classList.add('hidden');
            $(".hidden").hide(400);
        }
        // Alert Message Function
        const alertMessage = function (alertCl, msg) {
            alertMsgBox.style.display = 'block';
            alertMsgBox.classList.add(alertCl);
            alertTxt.innerHTML = msg;
            const stopTimeOut = setTimeout(() => {
                alertMsgBox.style.display = 'none';
                alertMsgBox.classList.remove(alertCl);
            }, "2000");
            function clearMessage() {
                clearTimeout(stopTimeOut);
            }
        }
        // Alert Input Field
        const alertInputMsg = function () {
            alert.style.display = 'block';
            const stopTimeOut = setTimeout(() => {
                alert.style.display = 'none';
            }, "2000");
            function clearMessage() {
                clearTimeout(stopTimeOut);
            }
        }
        // Modal Close and Open
        addTaskBtn.addEventListener('click', modalOpen);
        closeTaskModal.addEventListener('click', function () {
            modalClose();
            createTaskBtn.style.display = "block";
            saveTaskBtn.style.display = "none";
            taskNameInput.value = '';
            taskModalTitle.innerHTML = 'Add new task';
        });
        // Onload Todo Display
        $(document).ready(function () {
            let todo = localStorage.getItem("todo");
            if (todo === null) {
                tsk = [];
            } else {
                tsk = JSON.parse(todo);
                activeTask.innerHTML = tsk.length;
            }
            displayTodo();
        });
        // Create Todo Function
        createTaskBtn.addEventListener("click", (e) => {
            e.preventDefault();
            //let todo = localStorage.getItem("todo");
            if (taskNameInput.value) {
                tsk.push(taskNameInput.value);
                modalClose();
                activeTask.innerHTML = tsk.length;
                alertMessage('success-task-msg', 'Task Added Successfully!');
                taskNameInput.value = '';
            } else {
                alertInputMsg()
            }
            localStorage.setItem("todo", JSON.stringify(tsk));
            displayTodo();
        });
        // Todo Display Function
        function displayTodo() {
            let htmlCode = "";
            tsk.forEach((list, ind) => {
                const todoUpper = list.charAt(0).toUpperCase() + list.slice(1).toLowerCase();
                htmlCode +=
                    `<div class='task-flex'>
                    <p>${todoUpper}</p>
                    <div>
                        <button onclick='edit(${ind})' class='btn-task'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class='svg-edit'><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
                        <button onclick='deleteTodo(${ind})' class='btn-task'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class='svg-trash'><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                    </div>
                </div>`;
            });
            listBox.innerHTML = htmlCode;
        }
        // Task Edit Function
        function edit(ind) {
            modalOpen();
            saveInd.value = ind;
            let todo = localStorage.getItem("todo");
            tsk = JSON.parse(todo);
            taskNameInput.value = tsk[ind];
            createTaskBtn.style.display = "none";
            saveTaskBtn.style.display = "block";
            taskModalTitle.innerHTML = 'Edit task';
        }
        // Save Task Edit Function
        saveTaskBtn.addEventListener("click", () => {
            let id = saveInd.value;
            if (taskNameInput.value) {
                tsk[id] = taskNameInput.value;
                taskNameInput.value = '';
                taskModalTitle.innerHTML = 'Add new task';
                modalClose();
                alertMessage('edit-task-msg', 'Task Edited Successfully!');
            } else {
                alertInputMsg()
            }
            createTaskBtn.style.display = "block";
            saveTaskBtn.style.display = "none";
            localStorage.setItem("todo", JSON.stringify(tsk));
            displayTodo();
        });
        // Task Delete Function
        function deleteTodo(ind) {
            let todo = localStorage.getItem("todo");
            tsk = JSON.parse(todo);
            tsk.splice(ind, 1);
            activeTask.innerHTML = tsk.length;
            alertMessage('task-delete-msg', 'Task Deleted Successfully!');
            localStorage.setItem("todo", JSON.stringify(tsk));
            displayTodo();
        }