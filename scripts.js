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
    author: "Michael Draxlbaue",
    title: "American Studies in Austria",
    pages: 350,
    read: false,
  },
  {
    author: "Gyula László",
    title: "1910-ben szulettem",
    pages: 255,
    read: false,
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
                <p>
                Author: ${book.author}
                </p>
                <p>
                Title: ${book.title} 
                </p>
                <p>
                Pages: ${book.pages}
                </p>
                </p>${book.read ? "Read" : "Not Read Yet"}</p>
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

renderBooks();
