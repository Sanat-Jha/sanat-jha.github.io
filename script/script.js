   // Particles.js Configuration
particlesJS('particles-js', {
  particles: {
      number: {
          value: 50,
          density: {
              enable: true,
              value_area: 1000
          }
      },
      color: {
          value: '#45ce4a'
      },
      shape: {
          type: 'circle'
      },
      opacity: {
          value: 0.5,
          random: false
      },
      size: {
          value: 3,
          random: true
      },
      line_linked: {
          enable: true,
          distance: 150,
          color: '#45ce4a',
          opacity: 0.4,
          width: 1
      },
      move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
      }
  },
  interactivity: {
      detect_on: 'canvas',
      events: {
          onhover: {
              enable: true,
              mode: 'repulse'
          },
          onclick: {
              enable: true,
              mode: 'push'
          },
          resize: true
      }
  },
  retina_detect: true
});

// Enhanced Scroll Animation
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
  );
};

const displayScrollElement = (element) => {
  element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
  element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
          displayScrollElement(el);
      } else {
          hideScrollElement(el);
      }
  })
}

// Throttle function for scroll performance
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
      const context = this,
          args = arguments;
      if (!inThrottle) {
          fn.apply(context, args);
          lastTime = Date.now();
          inThrottle = true;
      } else {
          clearTimeout(lastFn);
          lastFn = setTimeout(function() {
              if (Date.now() - lastTime >= wait) {
                  fn.apply(context, args);
                  lastTime = Date.now();
              }
          }, Math.max(wait - (Date.now() - lastTime), 0));
      }
  };
};

window.addEventListener('scroll', throttle(handleScrollAnimation, 250));

// [Rest of your existing JavaScript code]
   // Function to hide the loader and show the content
    function hideLoader() {
      document.getElementById('loader').style.display = 'none';
      document.body.style.display = 'block';
    }

    // Execute functions on page load
    window.onload = function() {
      setTimeout(hideLoader, 3000); // Hide loader after 3 seconds
    };


//Nav container
const navContainer = document.querySelector(".nav-div");
// Hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("toggle");

  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});

// Add click event listeners to all nav links
links.forEach((link) => {
  link.addEventListener("click", () => {
    // Closing the nav menu
    navLinks.classList.remove("open");
    
    // Reverting the toggle to original state
    hamburger.classList.remove("toggle");
    
    // Remove fade class from all links
    links.forEach((l) => l.classList.remove("fade"));
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
        const skillLevel = entry.target;
        // Get the stored target width and animate to it
        const targetWidth = skillLevel.getAttribute('data-width');
        skillLevel.style.width = targetWidth;
        
        // Unobserve after animation starts
        observer.unobserve(skillLevel);
      }
    });
  }

  // Create an intersection observer
  const observer = new IntersectionObserver(animateSkillBars, {
    threshold: 0.2,
    rootMargin: '50px'
  });

  // Initialize each skill level
  skillLevels.forEach(skillLevel => {
    // Store the original width as a data attribute
    const originalWidth = skillLevel.style.width;
    skillLevel.setAttribute('data-width', originalWidth);
    
    // Reset width to 0
    skillLevel.style.width = '0';
    
    // Observe the skill level
    observer.observe(skillLevel);
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

  // Load the Lottie animation
  lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // The container where the animation will render
    renderer: 'svg', // Renders the animation as SVG
    loop: true, // Loops the animation
    autoplay: true, // Automatically plays the animation
    path: './img/home.json' // Path to your Lottie animation JSON file
  });

