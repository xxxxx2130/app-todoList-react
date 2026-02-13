import { signIn, signUp } from "./sign.js"

import { createTodoList, getTodoLists, deleteTodoList } from "./todoList.js";
import { createTodo, getTodos, deleteTodo, updateTodo } from "./todo.js";

const username = "toto";
const password = "rootroot";

async function run() {
    let token = '';
    await signIn(username, password)
        .then(t => { token = t })
        .catch(console.error)

    console.log("token", token)

    const title = "liste pour toto";
    let todoListId = '';
    await createTodoList(username, title, token)
        .then(todoList => { todoListId = todoList.id })
        .catch(console.error)

    console.log("todoListId", todoListId)

    await getTodoLists(username, token)
        .then(console.log)
        .catch(console.error)

    const content = "todo item 1";
    let todoId = '';
    await createTodo(content, todoListId, token)
        .then(todo => { todoId = todo.id })
        .catch(console.error)

    console.log("todoId", todoId)

    await getTodos(todoListId, token)
        .then(console.log)
        .catch(console.error)

    await updateTodo(todoId, true, token)
        .then(console.log)
        .catch(console.error)

    await deleteTodo(todoId, token)
        .then(console.log)
        .catch(console.error)

    await deleteTodoList(todoListId, token)
        .then(console.log)
        .catch(console.error)

    await signUp("tonton", "rootroot")
        .then(console.log)
        .catch(console.error)

}

run()