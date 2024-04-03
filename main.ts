#!/usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];
let condition = true;

async function main() {
    while(condition) {
        let todosQuestions = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "Choose an action:",
                choices: ["Add Todo", "Delete Todo", "Exit"]
            }
        ]);

        switch (todosQuestions.action) {
            case "Add Todo":
                await addTodo();
                break;
            case "Delete Todo":
                await deleteTodo();
                break;
            case "Exit":
                condition = false;
                break;
        }
    }
}

async function addTodo() {
    let todoQuestion = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What would you like to add to your todos?"
        }
    ]);
    todos.push(todoQuestion.todo);
    console.log("Todo added:", todoQuestion.todo);
    displayTodos();
}

async function deleteTodo() {
    if (todos.length === 0) {
        console.log("No todos to delete.");
        return;
    }

    let todoToDeleteQuestion = await inquirer.prompt([
        {
            name: "index",
            type: "list",
            message: "Select the todo to delete:",
            choices: todos.map((todo, index) => ({ name: `${index + 1}. ${todo}`, value: index }))
        }
    ]);

    let index = todoToDeleteQuestion.index;
    let deletedTodo = todos.splice(index, 1);
    console.log("Todo deleted:", deletedTodo[0]);
    displayTodos();
}

function displayTodos() {
    console.log("Current todos:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
    console.log();
}

main();
