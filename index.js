const dialogCreateTodo = document.querySelector('dialog#create-todo')
const dialogRemoveTodo = document.querySelector('dialog#remove-todo')
const buttonCreateTodo = document.querySelector('button#create-todo')
const inputCreateTodo = dialogCreateTodo.querySelector('input')
const errorCreateTodo = dialogCreateTodo.querySelector('span')
const dialogNewList = document.querySelector('dialog#new-list')
const buttonNewList = document.querySelector('button#new-list')
let table = document.querySelector('table tbody')
let token, removeId


if (!dialogNewList.showModal) {
    dialogPolyfill.registerDialog(dialogNewList)
}
buttonNewList.addEventListener('click', () => {
    dialogNewList.showModal()
})
dialogNewList.querySelector('.yes').addEventListener('click', async() => {
    await newToken()
    location.href = '/'
})
dialogNewList.querySelector('.no').addEventListener('click', () => {
    dialogNewList.close()
})

if (!dialogRemoveTodo.showModal) {
    dialogPolyfill.registerDialog(dialogRemoveTodo)
}
dialogRemoveTodo.querySelector('.yes').addEventListener('click', async() => {
    await fetch(`/api/remove/${token}/${removeId}`)
    location.reload()
})
dialogRemoveTodo.querySelector('.no').addEventListener('click', () => {
    dialogRemoveTodo.close()
})

if (!dialogCreateTodo.showModal) {
    dialogPolyfill.registerDialog(dialogCreateTodo)
}
buttonCreateTodo.addEventListener('click', () => {
    dialogCreateTodo.showModal()
})
dialogCreateTodo.querySelector('.yes').addEventListener('click', async() => {
    const todo = inputCreateTodo.value
    if(todo) {
        await fetch(`/api/add/${token}`, {
            method: 'POST',
            body: todo
        })
        location.reload()
    }
})
dialogCreateTodo.querySelector('.no').addEventListener('click', () => {
    dialogCreateTodo.close()
})

async function newToken() {
    const response = await fetch('/api/uuid')
    const text = await response.text()
    localStorage.setItem('token', text)
    return text
}

async function getToken() {
    const storageToken = localStorage.getItem('token')
    if (!storageToken) {
        return newToken()
    }
    return storageToken
}

document.body.onload = async () => {
    const search = new URLSearchParams(location.search)
    token = search.get('token') || await getToken()
    document.querySelectorAll('.token').forEach(e => {
        e.href = `${location.origin}/?token=${token}`
    })

    const response = await fetch(`/api/get/${token}`)
    const todos = await response.json()
    todos.forEach((todo, i) => {
        const row = document.createElement('tr')
        const remove = document.createElement('td')
        const content = document.createElement('td')
        const button = document.createElement('button')
        const icon = document.createElement('i')

        button.className = 'mdl-button mdl-js-button mdl-button--icon mdl-color-text--red-600'
        content.className = 'mdl-data-table__cell--non-numeric mdl-checkbox__label'
        remove.className = 'mdl-data-table__cell--non-numeric'
        icon.className = 'material-icons'

        content.textContent = todo.content
        icon.textContent = 'delete'

        button.addEventListener('click', () => {
            dialogRemoveTodo.showModal()
            removeId = i
        })
        
        button.appendChild(icon)
        remove.appendChild(button)
        row.appendChild(remove)
        row.appendChild(content)
        table.appendChild(row)
    })
}