let myLibrary = [
  new Book("1984", "George Orwell", "328", "No"),
  new Book("The Hobbit", "J.R.R. Tolkien", "310", "Yes"),
  new Book("The Catcher in the Rye", "J.D. Salinger", "277", "No")
];
console.log(myLibrary);

const books = document.getElementById("books");
const button = document.getElementById("buttonAdd")
const popup = document.querySelector(".popup");
const submit = document.getElementById("submit");
const cancel = document.getElementById("cancel");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");




function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    

}

function addBookToLibraby(){
    
        let titleValue = title.value;
        
        let authorValue = author.value;
        let pagesValue = pages.value;
        let readValue = read.value;
        let newBook = new Book(titleValue, authorValue, pagesValue, readValue);
        
    myLibrary.push(newBook);
    displayBook(newBook, myLibrary.length - 1);

    
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "Yes";
    
    popup.style.display = "none";
    
}   
button.addEventListener("click",()=>{
    popup.style.display = "flex";
    cancel.addEventListener("click",()=>{
        popup.style.display = "none";
    });
});

submit.addEventListener("click", (event) => {
    event.preventDefault();

    let titleValue = title.value;
    if (titleValue === "") {
        alert("Моля въведи заглавие");
        return;
    }
    let authorValue = author.value;
    let pagesValue = pages.value;
    let readValue = read.value;

    if (currentEditIndex === null) {
        
        let newBook = new Book(titleValue, authorValue, pagesValue, readValue);
        myLibrary.push(newBook);
    } else {
       
        myLibrary[currentEditIndex].title = titleValue;
        myLibrary[currentEditIndex].author = authorValue;
        myLibrary[currentEditIndex].pages = pagesValue;
        myLibrary[currentEditIndex].read = readValue;
    }

    refreshLibrary();

    
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "Yes";

    popup.style.display = "none";
    currentEditIndex = null; 
});

function displayBook(book,index) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.innerHTML = `
        <button class="delete">x</button>
        <h3>Tittle: ${book.title}</h3>
        <p class="author">Author: ${book.author}</p>
        <p class ="pages">Pages: ${book.pages}</p>
        <p class = "read">Read: ${book.read}</p>
        <button class="toggle"> Toggle Status</button>
        <button class="edit"> EDIT ME</button>

    `;
    books.appendChild(bookDiv);
    let edit = bookDiv.querySelector(".edit");
edit.addEventListener("click", () => {
    openEditPopup(index);
});

    let toggle = bookDiv.querySelector(".toggle")
    const readStatus = bookDiv.querySelector(".read");
    const remove = bookDiv.querySelector(".delete");


    toggle.addEventListener("click", () => {
        if (readStatus.textContent === "Read: Yes") {
            readStatus.textContent = "Read: No";
        } else {
            readStatus.textContent = "Read: Yes";
        }
    });
    

    remove.addEventListener("click", () => {
        books.removeChild(bookDiv);
        myLibrary.splice(index, 1);
    
    refreshLibrary();
    });
    
}
function refreshLibrary() {
    books.innerHTML = "";
    myLibrary.forEach((book, index) => {
        displayBook(book, index);
    });
}
myLibrary.forEach((book,index) => {displayBook(book,index)});

let currentEditIndex = null;

function openEditPopup(index) {
    currentEditIndex = index;
    let book = myLibrary[index];
    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;
    read.value = book.read;
    popup.style.display = "flex";
}

edit.addEventListener("click", () => {
    if (currentEditIndex === null) return; 
    
    
    let titleValue = title.value;
    if (titleValue === "") {
        alert("Моля, въведи заглавие");
        return;
    }
    let authorValue = author.value;
    let pagesValue = pages.value;
    let readValue = read.value;

   
    myLibrary[currentEditIndex].title = titleValue;
    myLibrary[currentEditIndex].author = authorValue;
    myLibrary[currentEditIndex].pages = pagesValue;
    myLibrary[currentEditIndex].read = readValue;

    refreshLibrary();  
    popup.style.display = "none";
});

cancel.addEventListener("click", () => {
    popup.style.display = "none";
});

