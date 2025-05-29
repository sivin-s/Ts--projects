"use strict";
class TodoManage {
    tasks = [];
    taskListElement; // HTML ELEMENT -> interface : properties and methods.
    taskInput;
    constructor() {
        // " as "  is a 'type assertion' tells typescript element still exist (mean sometimes it give null when we get null . null have no properties or methods ).
        this.taskListElement = document.getElementById("task-list");
        const form = document.getElementById("new-task-form");
        console.log('p>', form);
        this.taskInput = document.getElementById("task-input");
        form.addEventListener("submit", this.addTask.bind(this));
        // type narrowing is missing
    }
    addTask(event) {
        event.preventDefault();
        const text = this.taskInput.value.trim();
        if (text === "")
            return;
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        this.tasks.push(newTask);
        this.taskInput.value = '';
        this.renderTasks();
    }
    renderTasks() {
        this.taskListElement.innerHTML = "";
        this.tasks.forEach((task) => {
            const li = document.createElement('li');
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                task.completed = !task.completed;
            });
            li.appendChild(checkbox); // can append one node not support string and one or more nodes.
            li.append(`${task.text}`); // can append string or more nodes same time in parent.
            this.taskListElement.appendChild(li);
        });
    }
}
new TodoManage();
