const BOOKSURL = 'http://localhost:3000/books'
const list = document.querySelector('#books')

fetch(BOOKSURL)
    .then(response => response.json())
    .then(displayBooks)


function displayBooks (books){
    books.forEach(displayBook)
}
function displayBook(book){
        const bookCard = document.createElement('div')
        const title = document.createElement('p')
        const genre = document.createElement('p')
        const image = document.createElement('img')
        const deleteButton = document.createElement('button')

        bookCard.classList = 'card'
        title.textContent = book.title
        genre.textContent = book.genre 
        image.src = 'https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png'
        deleteButton.textContent = 'Delete Book'
        deleteButton.classList = 'delete'

        bookCard.append(title, genre, image, deleteButton)
        list.appendChild(bookCard)

        deleteButton.addEventListener('click', () => {
            bookCard.remove()
            deleteBook(book)
    })
}
const form = document.querySelector('form')

form.addEventListener('submit', showBook)


function showBook(event){
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const title = formData.get('title')
    const genre = formData.get('genre')
    const book = {title, genre}

    displayBook(book)
    form.reset()
    fetch(BOOKSURL,{
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
    console.log(book.id)
    fetch(`http://localhost:3000/books/${book.id}`,{method: 'DELETE'})
    }
