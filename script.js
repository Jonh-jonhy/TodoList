import { createElement } from "./fonctions/dom.js";
import { fetchJSON } from "./fonctions/api.js";
import { TodoList } from "./fonctions/component/TodoList.js";

try {
    const data = await fetchJSON('https://jsonplaceholder.typicode.com/users/1/todos?_limit=5')
    const list = new TodoList(data)
    list.appendTo(document.querySelector('#todolist'))
} catch (error) {
    const errorDiv = createElement('div',{
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    errorDiv.innerText = 'impossible de contacter le server'
    document.body.prepend(errorDiv)
    console.log(error)
}