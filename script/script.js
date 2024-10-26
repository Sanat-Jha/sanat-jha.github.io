


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
  "Sanat is the freelancer you a  re looking for.",
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