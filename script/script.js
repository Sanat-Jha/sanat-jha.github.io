
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
  setTimeout(hideLoader, 3000); // Hide loader after 5 seconds
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

// Hobbies
const hobbies = document.getElementById("hobbies");

// Array of hobbies without the text "Sanat"
const textArray = [
  " is a Tech Geek",
  " loves programming.",
  " is the freelancer you are looking for.",
  " can build you a web app",
  " can develop mobile apps",
];

let index = 0; // Tracking each character
let idx = 0; // Tracking the current array element
let isPaused = false; // To control the pause after each line

// Function that displays each text
function displayHobbies() {
  if (!isPaused) {
    // Always keep "Sanat" at the start and add the sliced part of the current text
    hobbies.innerHTML = "Sanat" + textArray[idx].slice(0, index);
    index++;

    // Check if it has reached the end of the current text
    if (index > textArray[idx].length) {
      isPaused = true; // Pause the animation
      setTimeout(() => {
        index = 0;
        idx++;
        
        // Reset idx if it reaches the end of the array
        if (idx == textArray.length) {
          idx = 0;
        }
        
        isPaused = false; // Resume the animation
      }, 1000); // 1-second pause after each line completes
    }
  }
}

// Calling the function every 100 milliseconds
setInterval(displayHobbies, 100);
