console.log("connected");

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

  // Get the form data
  const formData = new FormData(quoteFormElement);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Make the POST request to the server
  fetch("  http://localhost:3000/posts", {
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
// Sample database JSON (replace this with your actual data)
const database = {
  items: [
    {
      id: 1,
      name: "Ethiopian clay pottery",
      image:
        "https://ethiopianfood.files.wordpress.com/2013/08/my-three-dist.jpg",
      price: 5,
      info: "Ethiopian clay pottery",
    },
    {
      id: 2,
      name: "MESOB",
      image:
        "https://en.wikipedia.org/wiki/Mesob#/media/File:Addis-Abeba-Table_basse.jpg",
      price: 79.99,
      info: "Ethiopian Handmade mesobwork",
    },
    {
      id: 2,
      name: "flag",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/2560px-Flag_of_Ethiopia.svg.png",
      price: 79.99,
      info: "Ethiopian Handmade mesobwork",
    },
  ],

  posts: [
    {
      Id: 1,
      Name: "Ethiopian clay pottery",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 2,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 3,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 4,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 5,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 6,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 7,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
    {
      id: 8,
      Name: "Tomas Gebre",
      email: "yakoblema@gmail.com",
      Telephone: 4022002002,
      message: "Hi there",
    },
  ],
};

function searchItem() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const item = database.items.find((item) =>
    item.name.toLowerCase().includes(searchInput)
  );

  if (item) {
    const itemDetails = `
      <h2>${item.name}</h2>
      <img src="${item.image}" alt="${item.name}" style="width: 200px; height: 200px;">
      <p>Price: $${item.price}</p>
      <p>${item.info}</p>
    `;
    document.getElementById("itemDetails").innerHTML = itemDetails;
    document.getElementById("searchForm").style.display = "none";
  } else {
    document.getElementById("itemDetails").innerHTML = "<p>Item not found.</p>";
  }
}
