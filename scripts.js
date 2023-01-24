const closeButton = document.querySelector("#close-modal-button");
const openButton = document.querySelector("#open-modal-button");
const modal = document.querySelector(".modal");
const form = document.querySelector(".add-book-form");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-true");
const notReadInput = document.querySelector("#read-false");
const booksContainer = document.querySelector(".books-container");

class Book {
  constructor(author, title, pages, read) {
    (this.author = author),
      (this.title = title),
      (this.pages = pages),
      (this.read = read);
  }
}

function toggleModal() {
  modal.style.visibility === "hidden"
    ? (modal.style.visibility = "visible")
    : (modal.style.visibility = "hidden");
}

closeButton.addEventListener("click", toggleModal);
openButton.addEventListener("click", toggleModal);
form.addEventListener("submit", handleSubmit);

let books = [
  new Book("Anthony Burgess", "A Clockwork Orange", 160, false),
  new Book("Aldous Huxley", "Brave New World", 201, true),
  new Book("Jack London", "The Call Of The Wild", 232, true),
];

function handleSubmit(event) {
  event.preventDefault();
  const author = authorInput.value;
  const title = titleInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;

  const newBook = new Book(author, title, pages, read);

  books.push(newBook);

  renderBooks();
  toggleModal();
}

function createBooksHtmlContent() {
  return books
    .map(
      (book) =>
        `<div class="book-instance">
                <p class='book-instance-read-status'>${
                  book.read ? "Read" : "Not Read Yet"
                }</p>
                <p class="book-instance-small-text">
                Author: 
                </p>
                <h4 class='book-instance-title-text'>
                ${book.author}
                </h4>
                <p class="book-instance-small-text">
                Title:
                </p>
                <h4 class='book-instance-title-text'>
                ${book.title}
                </h4>
                <p class="book-instance-small-text">
                Pages:
                </p>
                <h4 class='book-instance-title-text'>
                ${book.pages}
                </h4>
                <button onclick='deleteBook("${
                  book.title
                }")'>Delete Book</button>
                <button onclick='toggleBookRead("${book.title}")'>${
          book.read ? "Marks as unread" : "Marks as read"
        }</button>
        
                
                
                </div>`
    )
    .join("");
}

function renderBooks() {
  booksContainer.innerHTML = createBooksHtmlContent();
}

function toggleBookRead(title) {
  books = books.map((book) =>
    book.title === title ? { ...book, read: !book.read } : book
  );
  renderBooks();
}

function deleteBook(title) {
  books = books.filter((book) => book.title !== title);

  renderBooks();
}

renderBooks();
