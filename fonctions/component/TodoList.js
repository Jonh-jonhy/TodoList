import { createElement } from "../dom.js"

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
        this.#element = element
        element.innerHTML = `<form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>

            <ul class="list-group">
            </ul>
        </main> `

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
        console.log(event.currentTarget.parentElement)
        event.currentTarget.parentElement.remove()
    }
}



class Todo {

    #task

    constructor(todo) {
        const id = `todo-${todo.id}`
        
        const li = createElement('li', {
            class: todo.completed ? 'todo list-group-item d-flex align-items-center fait' : 'todo list-group-item d-flex align-items-center a-faire'
        })
        const input = createElement('input', {
            class: 'form-check-input',
            type: 'checkbox',
            id,
            checked: todo.completed ? ' ' : false
        })

        input.addEventListener('change', (e) => {
            this.Toggle(e)
        })

        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: id
        })

        label.innerText = todo.title
        const deleteBtn = createElement('label', {
            class: 'ms-auto btn btn-danger btn-sm',
        })

        deleteBtn.innerHTML = `<i class="bi-trash"></i>`
        li.append(input)
        li.append(label)
        li.append(deleteBtn)

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