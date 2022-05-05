const form = document.querySelector('.chat__form') // форма или иначе подвал
const input = form.querySelector('.chat__input') // поле для ввода сообщения
const sendBtn = form.querySelector('.chat__send') // кнопка
const messagesList = document.querySelector('.chat__my-messages') // место в верстке для рендеринга
// набранных сообщений

let messages = [] // пустой массив для сообщений пользователя

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value.trim()) {
        const message = {
            text: input.value.trim(), // ввод пробелов не валиден
            date: new Date().toJSON() // текущая дата в формат JSON для помещения в localStorage
        }

        addToLocalStorage(message) // фунция добавления объекта message в LocalStorage
        input.value = ''

        renderList() // функция отображения введенных пользователем сообщений
    }
})

function addToLocalStorage(message) {
    messages = getMessagesFromLocalStorage() // получение массива сообщений из localStorage
    messages.push(message) // помещение в конец массива нового сообщения
    localStorage.setItem('messages', JSON.stringify(messages)) // запись в localStorage массива messages
}

function getMessagesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('messages') || '[]') // получение из localStorage либо
    // массива messages, либо пустого массива
}

function renderList() {
    messagesList.innerHTML = ''

    const html = messages.map((message) => {
        return `
          <div class="chat__message">
            <div class="chat__message-time"> ${new Date(message.date).toLocaleTimeString()} </div>
            <div class="chat__message-content"> ${message.text} </div>
          </div>
    `
    }).join('') // метод map c колбэком для создания html разметки в текстовом формате

    messagesList.innerHTML = html // помещение текстовой разметки в тег с классом chat__my-messages,
    // где будут отображаться введенные сообщения
}


