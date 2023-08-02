// Image slideshow
const imageElement = document.getElementById("image");
const images = [
  "https://lh3.googleusercontent.com/p/AF1QipOALGeO5Yb8cUHWHztUMda_NEHum0URtUDjLu10=w768-h768-n-o-v1",
  "https://lh3.googleusercontent.com/p/AF1QipPhYK_Lz151MK-vu7zjAFF3QcjYMipG0u1Fl7RY=w768-h768-n-o-v1",
  "https://lh3.googleusercontent.com/p/AF1QipOALGeO5Yb8cUHWHztUMda_NEHum0URtUDjLu10=w768-h768-n-o-v1",
  "https://lh3.googleusercontent.com/p/AF1QipN8To0bhuHBJijY7YLjHA0Q-hjQdilyQZjU9CZ6=w768-h768-n-o-v1",
  "https://lh3.googleusercontent.com/p/AF1QipMZX6tnsdA-_1ebk1nh803SI1xQKUelWad28GEs=w768-h768-n-o-v1",
  "https://lh3.googleusercontent.com/p/AF1QipNSI_NIREtJ_DgI5m6VWqDTcd9AygvKX1qp1bSN=w768-h768-n-o-k-v1",
];
let currentIndex = 0;

function displayNextImage() {
  imageElement.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

displayNextImage();
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

  // Get the form data using FormData
  const formData = new FormData(quoteFormElement);

  // Make the POST request to the server
  fetch("http://localhost:3000/posts", {
    method: "POST",
    body: formData, // Use the FormData object directly as the body
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the success response here
      console.log("Quote submitted successfully:", data);

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

// Fetch products and render them dynamically
fetchProducts();

function fetchProducts() {
  return fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const searchQuery = document.getElementById("searchInput").value;
  filterProducts(searchQuery);
});
function filterProducts(searchQuery) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = ""; // Clear the search results before rendering new ones

  // Fetch products from the server or use the existing data in products variable
  fetchProducts().then((products) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      searchResultsDiv.innerHTML = "<p>No results found.</p>";
    } else {
      renderProducts(filteredProducts);
    }
  });
}

function renderProducts(products) {
  const itemsContainer = document.getElementById("itemsContainer");
  itemsContainer.innerHTML = "";

  products.forEach((product) => {
    const itemElement = document.createElement("section");
    itemElement.className = "items";

    const imgElement = document.createElement("img");
    imgElement.src = product.image;
    imgElement.alt = product.name;
    imgElement.className = "product-image";

    const nameElement = document.createElement("section");
    nameElement.className = "name";
    nameElement.textContent = product.name;

    const priceElement = document.createElement("section");
    priceElement.className = "price";
    priceElement.textContent = `$${product.price}`;

    const infoElement = document.createElement("section");
    infoElement.className = "info";
    infoElement.textContent = product.info;

    itemElement.appendChild(imgElement);
    itemElement.appendChild(nameElement);
    itemElement.appendChild(infoElement);
    itemElement.appendChild(priceElement);

    itemsContainer.appendChild(itemElement);
  });
}
// Fetch products and render them dynamically on page load
fetchProducts().then((products) => {
  renderProducts(products);
});
const starRating = document.getElementById("star-rating");
const ratingText = document.getElementById("rating-text");
const reviewForm = document.getElementById("review-form");
const userReview = document.getElementById("user-review");

let userReviews = [];
// Function to handle mouseover event on stars
function handleStarHover(event) {
  const stars = Array.from(starRating.children);
  const hoveredStarIndex = stars.indexOf(event.target);
  stars.forEach((star, index) => {
    star.classList.toggle("active", index <= hoveredStarIndex);
  });

  // Update the rating text
  ratingText.textContent = `You're giving ${hoveredStarIndex + 1} star(s)!`;
}

// Function to reset the stars when the mouse leaves the star rating container
function resetStars() {
  const stars = Array.from(starRating.children);
  stars.forEach((star) => {
    star.classList.remove("active");
  });

  // Reset the rating text
  ratingText.textContent = "Hover over the stars to rate!";
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  const rating = document
    .querySelector(".star.active")
    .getAttribute("data-rating");
  const comment = document.getElementById("comment").value;

  // Add the user review to the userReviews array
  userReviews.push({ rating: rating, comment: comment });

  // Clear the form inputs and reset the star rating
  reviewForm.reset();
  resetStars();

  // Display the user reviews on the page
  displayUserReviews();
}

// Function to display the user reviews on the page
function displayUserReviews() {
  userReview.innerHTML = ""; // Clear the existing reviews

  userReviews.forEach((review) => {
    // Create a new review element and append it to the user-review container
    const newReview = document.createElement("div");
    newReview.classList.add("review");
    newReview.innerHTML = `
            <p>Rating: ${review.rating} stars</p>
            <p>${review.comment}</p>
        `;
    userReview.appendChild(newReview);
  });
}

// Attach event listeners
starRating.addEventListener("mouseover", handleStarHover);
starRating.addEventListener("mouseout", resetStars);
reviewForm.addEventListener("submit", handleSubmit);
