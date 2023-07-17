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




