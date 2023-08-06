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

// Toggle the menu list on small screens when the menu icon is clicked
const menuIcon = document.getElementById("menuIcon");
const menuList = document.getElementById("menuList");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("show");
});

// Show/hide the quote form
const getQuoteButton = document.getElementById("getQuoteButton");
const quoteForm = document.getElementById("quoteForm");
const quoteFormElement = document.getElementById("quoteFormElement");

getQuoteButton.addEventListener("click", () => {
  quoteForm.style.display =
    quoteForm.style.display === "block" ? "none" : "block";
  quoteFormElement.reset();
});

quoteFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quoteFormElement);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Replace "your_form_endpoint" with your Formspree form endpoint
  const formEndpointURL = "https://formspree.io/f/meqbebqj";

  axios
    .post(formEndpointURL, data)
    .then((response) => {
      console.log("Quote submitted successfully:", response.data);
      alert("Quote submitted successfully!");
      quoteFormElement.reset();
      quoteForm.style.display = "none"; // Hide the quote form after successful submission
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error submitting quote. Please try again later.");
    });
});

// Fetch products and render them dynamically on page load
async function fetchProducts() {
  const itemListApiUrl = "https://fakestoreapi.com/products";
  try {
    const response = await axios.get(itemListApiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function filterProducts(searchQuery) {
  const imageGridContainer = document.querySelector(".image-grid");
  const items = imageGridContainer.querySelectorAll(".items");

  items.forEach((item) => {
    const nameElement = item.querySelector(".product-name");
    const priceElement = item.querySelector(".product-price");
    const name = nameElement.textContent.toLowerCase();
    const price = priceElement.textContent.toLowerCase();

    if (
      name.includes(searchQuery.toLowerCase()) ||
      price.includes(searchQuery.toLowerCase())
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function renderProducts(products) {
  const imageGridContainer = document.querySelector(".section2");
  imageGridContainer.innerHTML = ""; // Clear the container before rendering new images

  products.forEach((product) => {
    const itemElement = document.createElement("div");
    itemElement.className = "items";

    const imgElement = document.createElement("img");
    imgElement.src = product.image;
    imgElement.alt = product.name;
    imgElement.className = "product-image";

    const nameElement = document.createElement("p");
    nameElement.textContent = product.name;
    nameElement.className = "product-name";

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price}`;
    priceElement.className = "product-price";

    itemElement.appendChild(imgElement);
    itemElement.appendChild(nameElement);
    itemElement.appendChild(priceElement);

    imageGridContainer.appendChild(itemElement);
  });
}

// Star rating and review handling
const starRating = document.getElementById("star-rating");
const ratingText = document.getElementById("rating-text");
const reviewForm = document.getElementById("review-form");
const userReview = document.getElementById("user-review");

let userReviews = [];

function handleStarHover(event) {
  const stars = Array.from(starRating.children);
  const hoveredStarIndex = stars.indexOf(event.target);
  stars.forEach((star, index) => {
    if (index <= hoveredStarIndex) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });

  // Update the rating text
  const activeStars = starRating.querySelectorAll(".star.active");
  const rating = activeStars.length > 0 ? activeStars.length : 0;
  ratingText.textContent = `You're giving ${rating} star(s)!`;
}

function handleStarClick(event) {
  const clickedStarIndex = Array.from(starRating.children).indexOf(
    event.target
  );
  const rating = clickedStarIndex + 1;
  const comment = document.getElementById("comment").value;

  // Add the user review to the userReviews array
  userReviews.push({ rating: rating, comment: comment });

  // Clear the form inputs and reset the star rating
  reviewForm.reset();
  resetStars();
  displayUserReviews();
}

function resetStars() {
  const stars = Array.from(starRating.children);
  stars.forEach((star) => {
    star.classList.remove("active");
  });

  // Reset the rating text
  ratingText.textContent = "Hover over the stars to rate!";
}
function handleSubmit(event) {
  event.preventDefault();
  const rating = document
    .querySelector(".star.active")
    ?.getAttribute("data-rating");
  const comment = document.getElementById("comment").value;

  if (!rating) {
    alert("Please select a star rating before submitting your review.");
    return;
  }

  // Add the user review to the userReviews array
  userReviews.push({ rating: rating, comment: comment });

  // Clear the form inputs and reset the star rating
  reviewForm.reset();
  resetStars();
  displayUserReviews();
}

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

// Attach event listeners for star rating and review handling
starRating.addEventListener("mouseover", handleStarHover);
starRating.addEventListener("mouseout", resetStars);
starRating.addEventListener("click", handleStarClick); // Add the click event listener
reviewForm.addEventListener("submit", handleSubmit);

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.trim(); // Trim whitespace from the input value

  if (searchQuery === "") {
    alert("Please enter a search query.");
    return;
  }

  fetchProducts()
    .then((products) => {
      if (!Array.isArray(products) || products.length === 0) {
        alert("No products found.");
        return;
      }

      const filteredProducts = products.filter(
        (product) =>
          (product.name &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.price && product.price.toString().includes(searchQuery))
      );

      if (filteredProducts.length === 0) {
        alert("No products found matching the search query.");
        return;
      }

      renderProducts(filteredProducts);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});

// Fetch products and render them dynamically on page load
fetchProducts().then((products) => {
  renderProducts(products);
});
displayUserReviews();
