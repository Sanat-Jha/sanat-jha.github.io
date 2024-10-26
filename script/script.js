
// Array of GIF file names
const gifs = [
  'img/SANAT1.gif',
  'img/SANAT2.gif',
  'img/SANAT3.gif',
  'img/SANAT4.gif',
  'img/SANAT5.gif',
  'img/SANAT6.gif',
  'img/SANAT7.gif',
  'img/SANAT8.gif',
  'img/SANAT9.gif'
];

// Function to randomly select a GIF
function showRandomGif() {
  const randomIndex = Math.floor(Math.random() * gifs.length);
  const loadingGif = document.getElementById('loadingGif');
  loadingGif.src = gifs[randomIndex]; // Set the random GIF
}

// Function to hide the loader and show the content
function hideLoader() {
  document.getElementById('loader').style.display = 'none'; // Hide the loader
  document.body.style.display = 'block'; // Show the body content
}

// Execute functions on page load
window.onload = function () {
  showRandomGif(); // Show a random GIF
  setTimeout(hideLoader, 2000); // Hide loader after 5 seconds
};


//Nav container
const navContainer = document.querySelector(".nav-div");

// Hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
  if (navLinks.classList[1] === "open") {

    // Ensuring scrollbar is disabled when nav menu is open
    document.body.style.overflow = "hidden";

    links.forEach((link) => {

      link.addEventListener("click", () => {

        // Closing the nav menu
        navLinks.classList.remove("open");

        // Making the scollbar visible
        document.body.style.overflow = "visible";

        // Reverting the toggle to original state
          hamburger.classList.remove("toggle");
        
      });
    });
  }

  // Closing the navbar
  hamburger.classList.toggle("toggle");

  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});

/* Scroll Bar */
const scrollUp = document.querySelector(".scroll-up");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  if (scrolled >= 200) {
    scrollUp.style.visibility = "visible";
  } else {
    scrollUp.style.visibility = "hidden";
  }
});

//Hobbies
const hobbies = document.getElementById("hobbies");

// Array of hobbies
const textArray = [
  "Sanat is a Tech Geek",
  "Sanat loves programming.",
  "Sanat is the freelancer you are looking for.",
  "Sanat can build you a web app",
  "Sanat can develop mobile apps",
];

let index = 0; //Tracking each text
let idx = 0; //Tracking the number of array elements

// Function that displays each text
function displayHobbies() {
  hobbies.innerHTML = textArray[idx].slice(0, index);
  index++;

  // Check if it has gotten to the end of eact text
  if (index > textArray[idx].length) {
    index = 0;
    idx++;

    // Checking if it has gotten to the end of the array
    if (idx == textArray.length) {
      idx = 0;
    }
  }
}

// Calling the method every 1 millisecond
setInterval(displayHobbies, 100);