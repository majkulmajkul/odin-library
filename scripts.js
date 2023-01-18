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

function toggleModal() {
  modal.style.visibility === "hidden"
    ? (modal.style.visibility = "visible")
    : (modal.style.visibility = "hidden");
}

closeButton.addEventListener("click", toggleModal);
openButton.addEventListener("click", toggleModal);
form.addEventListener("submit", handleSubmit);

let books = [
  {
    author: "Anthony Burgess",
    title: "A Clockwork Orange",
    pages: 160,
    read: false,
  },
  {
    author: "Aldous Huxley",
    title: "Brave New World",
    pages: 201,
    read: true,
  },
  {
    author: "Jack London",
    title: "The Call Of The Wild",
    pages: 201,
    read: true,
  },
];

function handleSubmit(event) {
  event.preventDefault();
  const author = authorInput.value;
  const title = titleInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;
  books.push({
    author: author,
    title: title,
    pages: pages,
    read: read,
  });
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
