console.log("connected");

const imageContainer = document.querySelector(".image-container");
const imageElement = document.getElementById("image");

const images = [
  "file:///Users/yakobasebe/Pictures/2020-04-29%20(2).jpg",
  "file:///Users/yakobasebe/Pictures/2020-04-29.jpg",
  "file:///Users/yakobasebe/Pictures/2021-10-14.jpg",
  "file:///Users/yakobasebe/Pictures/IMG-20211217-WA0008.jpg",
  "file:///Users/yakobasebe/Pictures/2020-04-29%20(1).jpg",
];

let currentIndex = 0;

function displayNextImage() {
  imageElement.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}


displayNextImage();

// Set the interval to change the image every 3 seconds (3000 milliseconds)
setInterval(displayNextImage, 3000);



const quoteButtons = document.querySelectorAll('.quote-button');

quoteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const quoteForm = event.target.nextElementSibling;
    if (quoteForm.style.display === 'block') {
      // If the form is visible, hide it
      quoteForm.style.display = 'none';
    } else {
      // If the form is hidden, show it
      quoteForm.style.display = 'block';
    }
  });
});

// Add click event listener to the submit button within the quote form
const submitButtons = document.querySelectorAll('.quote-form input[type="submit"]');
submitButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the parent form element
    const quoteForm = event.target.closest('.quote-form');

    // Get form input elements
    const nameInput = quoteForm.querySelector('.name-input');
    const telephoneInput = quoteForm.querySelector('#telephone');
    const messageInput = quoteForm.querySelector('.message-input');

    if (nameInput.value === '' || telephoneInput.value === '' || messageInput.value === '') {
      // Display validation message
      alert('Please fill in all the required fields.');
    } else {
      // If all required fields are filled, hide the quote form
      quoteForm.style.display = 'none';
      // You can add code here to handle form submission, e.g., send data to the server.
    }
  });
});
const searchInputFocus = () => {
  console.log(`focus occurred`);
};

const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const topUpMenu = document.getElementById("menu");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("menu-hidden");
  topUpMenu.classList.toggle("menu-hidden");
});
