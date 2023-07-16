console.log("connected");

function toggleMenu() {
  const menu = document.getElementById("menu");
  const menuIcon = document.querySelector('.menu-icon');

  // Toggle the class to change the icon to a close button
  menuIcon.classList.toggle('close');

  // Toggle the menu visibility
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

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




