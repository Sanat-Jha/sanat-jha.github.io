

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
  " is a Tech Geek.",
  " loves programming.",
  " is the freelancer you are looking for.",
  " can build you a web app.",
  " can develop mobile apps.",
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

const aboutmeText = document.getElementById("aboutmeText");

// Define the loading animation function
function loadaboutme() {
  const aboutme = `Hi I am Sanat Jha, a BTech student at IIT Roorkee, a passionate software engineer skilled in Python, Django, and Flutter. With a foundation in C/C++, HTML, and CSS, I build dynamic web and mobile apps. A tech enthusiast at heart, I love bringing creativity and precision to my projects. Always ready to learn and do more.`;

  // Clear the text before starting the animation (optional)
  aboutmeText.innerText = '';

  aboutme.split('').forEach((char, index) => {
    setTimeout(() => {
      // Append character to innerText (spaces handled properly)
      aboutmeText.innerHTML +=  char;
      aboutmeText.scrollTop = aboutmeText.scrollHeight; // Ensure the text scrolls down
    }, index * 10); // 100ms delay per character
  });
}


// Create an intersection observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadaboutme();
      observer.unobserve(entry.target); // Stop observing after animation trigger
    }
  });
});

// Select the target element
observer.observe(aboutmeText);

// Select all the list items
const listItems = document.querySelectorAll('.qualifications li');

// Create an intersection observer
const observerborder = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // When the entry is in view, add the class to trigger the animation
    if (entry.isIntersecting) {
      entry.target.classList.add('show-border');
    }
  });
}, {
  // Set the root margin to ensure the items are observed when they are near the middle of the viewport
  rootMargin: '0px 0px -20% 0px', // This means start observing 50% before the middle
  threshold: 0.5 // Trigger when 50% of the element is in view
});

// Observe each list item
listItems.forEach(item => {
  observerborder.observe(item);
});




document.addEventListener("DOMContentLoaded", () => {
  // Select all skill-level elements
  const skillLevels = document.querySelectorAll('.skill-level');

  // Function to handle the animation of skill bars
  function animateSkillBars(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Get the target width from the inline style
              const skill = entry.target;
              const targetWidth = skill.dataset.targetWidth; // Get the width from data attribute

              // Start the animation
              skill.style.width = targetWidth; // Set the width to its target value

              // Unobserve the element after animation starts (to avoid repeated triggering)
              observer.unobserve(skill);
          }
      });
  }

  // Create an intersection observer
  const observer = new IntersectionObserver(animateSkillBars, {
      threshold: 1 // Start animation when 50% of the element is in the viewport
  });

  // Observe each skill level element
  skillLevels.forEach(skill => {
      // Store the target width in a data attribute
      const targetWidth = skill.style.width;
      skill.dataset.targetWidth = targetWidth;
      skill.style.width = "0%"; // Start at 0% width
      observer.observe(skill);
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.querySelector(".contact-details");
  const contactItems = document.querySelectorAll(".contact-item");

  // Intersection Observer to detect scrolling into the section
  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start the smooth border wave animation
        contactItems.forEach((item, index) => {
          setTimeout(() => {
            animateBorder(item);
          }, index * 150); // Delay for a smooth wave effect
        });
        observer.unobserve(contactSection); // Run animation only once
      }
    });
  }, observerOptions);

  observer.observe(contactSection);

  // Function to animate the border smoothly
  function animateBorder(item) {
    let opacity = 0;
    let increasing = true;
    const duration = 1000; // Total duration of the animation
    const startTime = performance.now();

    function updateBorder(time) {
      const elapsed = time - startTime;
      const progress = (elapsed % duration) / duration; // Normalize progress between 0 and 1

      // Create a smooth wave effect with opacity transition
      if (increasing) {
        opacity = Math.sin(progress * Math.PI);
      } else {
        opacity = 1 - Math.sin(progress * Math.PI);
      }

      // Set the border with smooth opacity transition
      item.style.border = `2px solid rgba(69, 206, 74, ${opacity})`;

      // Loop the animation until 2 seconds
      if (elapsed < duration) {
        requestAnimationFrame(updateBorder);
      } else {
        // Reset border at the end of the animation
        item.style.border = "none";
      }
    }

    // Start the smooth animation
    requestAnimationFrame(updateBorder);
  }
});
