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
const quoteFormElement = document.getElementById("quoteFormElement");

getQuoteButton.addEventListener("click", () => {
  if (quoteForm.style.display === "block") {
    quoteForm.style.display = "none";
  } else {
    quoteForm.style.display = "block";
    quoteFormElement.reset();
  }
});

quoteFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form data
  const formData = new FormData(quoteFormElement);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Make the POST request to the server
  fetch("http://localhost:3000/form", {
    method: "POST",
    headers: {
      // Set the Content-Type header to "multipart/form-data"
      "Content-Type": "multipart/form-data",
    },
    body: formData, // Use the FormData object directly as the body
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the success response here
      console.log(formDataObject);
      //console.log("Data sent successfully:", data);

      // Display a success message to the user
      alert("Quote submitted successfully!");

      // Clear the form after submission
      quoteFormElement.reset();
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);

      alert("Error submitting quote. Please try again later.");
    });
});
const menuIcon = document.getElementById("menuIcon");
const menuList = document.getElementById("menuList");

// Toggle the menu list on small screens when the menu icon is clicked
menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("show");
});
