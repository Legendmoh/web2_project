// Sample books data
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", img: "img/gatsby.jpg" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", img: "img/mockingbird.jpg" },
  { id: 3, title: "1984", author: "George Orwell", img: "img/1984.jpg" }
];

// Display books on the dashboard
function displayBooks() {
  const bookList = document.getElementById("bookList");
  if (!bookList) return;

  bookList.innerHTML = books.map(book => `
    <div class="book-card">
      <img src="${book.img}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <button onclick="rentBook(${book.id})">Rent Book</button>
    </div>
  `).join('');
}

// Register a new user
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  // Check if user already exists
  if (localStorage.getItem(username)) {
    alert("Username already exists. Please choose another.");
    return;
  }

  // Save new user to localStorage
  localStorage.setItem(username, JSON.stringify({ password, rentals: [] }));
  alert("Registration successful!");
  window.location.href = "login.html";
});

// Login function
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem(username));
  
  if (user && user.password === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login credentials.");
  }
});

// Rent a book
function rentBook(bookId) {
  const currentUser = localStorage.getItem("currentUser");
  
  if (!currentUser) {
    alert("Please log in to rent books.");
    return;
  }

  const user = JSON.parse(localStorage.getItem(currentUser));
  const book = books.find(b => b.id === bookId);

  if (book && !user.rentals.some(r => r.id === bookId)) {
    user.rentals.push(book);
    localStorage.setItem(currentUser, JSON.stringify(user));
    alert("Book rented successfully!");
  } else {
    alert("You already rented this book.");
  }
}

// Initialize the dashboard if on the dashboard page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("bookList")) {
    displayBooks();
  }
});
