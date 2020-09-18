const BOOKS_URL = 'http://localhost:3000/books'

function getBooks (){
    fetch(BOOKS_URL)
    .then(response => response.json())
    .then(displayBooks)
}

function displayBooks (books){
    const list = document.querySelector('#books')

    books.forEach(book => {
        const card = document.createElement('div')
        const title = document.createElement('p')
        const genre = document.createElement('p')
        const image = document.createElement('img')
        const deleteButton = document.createElement('button')

        card.className = 'card'
        title.textContent = book.title
        genre.textContent = book.genre 
        image.src = 'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png'
        deleteButton.textContent = 'Delete Book'
        deleteButton.classList.add('delete')

        card.append(title, genre, image, deleteButton)
        list.appendChild(card)

        deleteButton.addEventListener('click', () => deleteBook(book))
    })

}


const form = document.querySelector('form')

form.addEventListener('submit', createBook)
getBooks()

function createBook(event){
    event.preventDefault()

    const formData = new FormData(event.target)
    const title = formData.get('title')
    const genre = formData.get('genre')

    fetch(BOOKS_URL,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, genre})
    }) .then(response => response.json())
        .then(console.log)
}

function deleteBook(book){
    fetch(`${BOOKS_URL}/${book.id}`,{
        method: 'DELETE'
    }) .then(response => response.json())
        .then(console.log)
}