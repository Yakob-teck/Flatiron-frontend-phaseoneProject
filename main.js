console.log("connected");

// Image slideshow
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
const getQuoteButton = document.getElementById("getQuoteButton");
const quoteForm = document.getElementById("quoteForm");

getQuoteButton.addEventListener("click", () => {
  quoteForm.style.display = "block";
});

const quoteFormElement = document.getElementById("quoteForm");
quoteFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  // Replace this part with your code to handle the form submission
  // For example, you can use JavaScript to send the data to a server or display a success message.

  // Clear the form after submission
  quoteFormElement.reset();
});
