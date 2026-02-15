import { createElement } from "../dom.js"
import { cloneTemplate } from "../dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class TodoList {

    /**
     * @type {Todo[]} 
     */
    #todos = []

    /**
     * @type {HTMLElement}
     */
    #element

    /**
     * @param {Todo[]} todos
     */
    constructor(todos) {
        this.#todos = todos
    }

    /**
     * @type {HTMLElement}
     */
    appendTo(element) {
        element.append(
            cloneTemplate('todoList-layout')
        )
        this.#element = element

        for (const task of this.#todos) {
            const todo = new Todo(task)
            todo.appendTo(element.querySelector('.list-group'))
        }

        const addBtn = element.querySelector('form button')
        addBtn.addEventListener('click', (e) => {
            this.addTask(e)
        })

        const taskStatutBtn = element.querySelectorAll('.btn-group .btn')

        taskStatutBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.#element.querySelector('.btn-group button.active').classList.remove('active')
                const listStatut = this.#element.querySelector('.list-group')

                e.currentTarget.classList.add('active')

                const filter = e.currentTarget.getAttribute('data-filter')
                if (filter === 'done') {
                    listStatut.classList.add('hide-todo')
                    listStatut.classList.remove('hide-done')

                } else if (filter === 'todo') {
                    listStatut.classList.add('hide-done')
                    listStatut.classList.remove('hide-todo')

                } else {
                    listStatut.classList.remove('hide-done')
                    listStatut.classList.remove('hide-todo')
                }
            })
        });

    }

    /**
     * @param {PointerEvent} event 
     */
    addTask(event) {
        event.preventDefault()
        const form = this.#element.querySelector('form')
        const title = new FormData(form).get('title').toString().trim()
        if (title === '') {
            return
        }

        const newTask = {
            id: Date.now(),
            title,
            completed: false
        }

        const todo = new Todo(newTask)
        todo.prependTo(this.#element.querySelector('.list-group'))
        form.reset()
    }

    /**
     * @param {PointerEvent} event
     * @returns {Todo}
     */
    remove(event) {
        event.preventDefault()
        event.currentTarget.parentElement.remove()
    }
}



class Todo {

    #task

    constructor(todo) {
        const id = `todo-${todo.id}`

        const li = cloneTemplate('todoList-item').firstElementChild
        if (todo.completed) {
            li.setAttribute('class','todo list-group-item d-flex align-items-center fait')
        } else {
            li.setAttribute('class','todo list-group-item d-flex align-items-center a-faire')
        }

        const input = li.querySelector('input')
        input.setAttribute('class', 'form-check-input')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('id', id)
        if (todo.completed) {
            input.setAttribute('checked',' ')
        }
        input.addEventListener('change', (e) => {
            this.Toggle(e)
        })

        const label = li.querySelector('label')
        label.setAttribute('class', 'ms-2 form-check-label')
        label.setAttribute('id', id)
        label.innerText = todo.title

        const deleteBtn = li.querySelector('.btn')
        deleteBtn.setAttribute('class', 'ms-auto btn btn-danger btn-sm')
        deleteBtn.innerHTML = `<i class="bi-trash"></i>`

        deleteBtn.addEventListener('click', (e) => {
            this.remove(e)
        })

        this.#task = li
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.append(this.#task)
    }

    /**
     * @param {HTMLElement} element 
     */
    prependTo(element) {
        element.prepend(this.#task)
    }

    /**
     * @param {PointerEvent} event 
     */
    remove(event) {
        event.preventDefault()
        this.#task.remove()
    }

    /**
     * @param {PointerEvent} event 
     */
    Toggle(event) {
        if (event.currentTarget.checked) {
            this.#task.classList.add('fait')
            this.#task.classList.remove('a-faire')
        } else {
            this.#task.classList.add('a-faire')
            this.#task.classList.remove('fait')
        }
    }
}