console.log("connected");

const imageContainer = document.querySelector('.image-container');
const imageElement = document.getElementById('image');

const images = [
  'file:///Users/yakobasebe/Pictures/2020-04-29%20(2).jpg',
  'file:///Users/yakobasebe/Pictures/2020-04-29.jpg',
  'file:///Users/yakobasebe/Pictures/2021-10-14.jpg',
  'file:///Users/yakobasebe/Pictures/IMG-20211217-WA0008.jpg',
  'file:///Users/yakobasebe/Pictures/2020-04-29%20(1).jpg'
];

let currentIndex = 0;

function displayNextImage() {
  imageElement.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

// Call the function initially to display the first image
displayNextImage();

// Set the interval to change the image every 3 seconds (3000 milliseconds)
setInterval(displayNextImage, 3000);

// Get the menu icon element
const menuIcon = document.querySelector('.menu-icon');

// Get the menu element
const menu = document.querySelector('.menu');

// Add event listener to the menu icon
menuIcon.addEventListener('click', () => {
  // Toggle the 'active' class on the menu element
  menu.classList.toggle('active');
});

const quoteButtons = document.querySelectorAll('.quote-button');

quoteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const quoteForm = event.target.nextElementSibling;
    quoteForm.style.display = 'block'; // Show the corresponding form when the button is clicked

    // Add click event listener to the submit button within the quote form
    const submitButton = quoteForm.querySelector('input[type="submit"]');
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent form submission

      // Get form input elements
      const nameInput = quoteForm.querySelector('.name-input');
      const telephoneInput = quoteForm.querySelector('#telephone');
      const messageInput = quoteForm.querySelector('.message-input');

      // Check if any of the required fields are empty
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
});