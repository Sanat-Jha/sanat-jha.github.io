   // Particles.js Configuration with Green Dots
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
          value: 0.6,
          random: true,
          anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.3,
              sync: false
          }
      },
      size: {
          value: 4,
          random: true,
          anim: {
              enable: true,
              speed: 2,
              size_min: 2,
              sync: false
          }
      },
      line_linked: {
          enable: true,
          distance: 150,
          color: '#45ce4a',
          opacity: 0.3,
          width: 1
      },
      move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: true,
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


// Glassmorphism Hamburger Menu JavaScript
const hamburgerMenuBtn = document.querySelector('.hamburger-menu-btn');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const menuNavLinks = document.querySelectorAll('.menu-nav-link');
const navbar = document.querySelector('nav');

// Open menu function
function openMenu() {
  hamburgerMenuBtn.classList.add('active');
  fullscreenMenu.classList.remove('hidden');
  fullscreenMenu.classList.add('show');
  fullscreenMenu.classList.remove('hide');
  document.body.classList.add('overflow-hidden');
  
  // Reset link animations
  menuNavLinks.forEach((link, index) => {
    link.style.animationDelay = `${(index + 1) * 0.05}s`;
  });
}

// Close menu function
function closeMenu() {
  hamburgerMenuBtn.classList.remove('active');
  fullscreenMenu.classList.add('hide');
  fullscreenMenu.classList.remove('show');
  document.body.classList.remove('overflow-hidden');
  
  // Hide menu after animation completes
  setTimeout(() => {
    fullscreenMenu.classList.add('hidden');
    fullscreenMenu.classList.remove('hide');
  }, 300);
}

// Hamburger button click
hamburgerMenuBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  if (fullscreenMenu.classList.contains('show')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close button click
closeMenuBtn.addEventListener('click', closeMenu);

// Menu nav links click
menuNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Add click effect
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
      link.style.transform = '';
    }, 150);
    
    // Close menu after a short delay for better UX
    setTimeout(closeMenu, 200);
  });
});

// Close menu when clicking on overlay
fullscreenMenu.addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('menu-overlay')) {
    closeMenu();
  }
});

// Prevent menu box clicks from closing menu
document.querySelector('.menu-box').addEventListener('click', function(e) {
  e.stopPropagation();
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && fullscreenMenu.classList.contains('show')) {
    closeMenu();
  }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
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

// Array of professional skills and capabilities in first person
const textArray = [
  " architect scalable web applications.",
  " create stunning user interfaces.",
  " develop full-stack solutions.",
  " optimize performance & UX.",
  " build responsive mobile apps.",
  " implement modern frameworks.",
  " deliver enterprise-grade software.",
  " solve complex technical challenges."
];

let index = 0; // Tracking each character
let idx = 0; // Tracking the current array element
let isTyping = true; // true for typing, false for deleting
let isPaused = false; // To control the pause

// Function that displays each text with proper typewriter effect
function displayHobbies() {
  if (!isPaused) {
    const baseText = "I can";
    let currentText = "";
    
    if (isTyping) {
      // Typing forward
      currentText = baseText + textArray[idx].slice(0, index);
      index++;
      
      // Check if finished typing the current text
      if (index > textArray[idx].length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isTyping = false; // Start deleting
          index = textArray[idx].length; // Set to full length for deletion
        }, 1500); // Pause before starting to delete
      }
    } else {
      // Deleting backward
      currentText = baseText + textArray[idx].slice(0, index);
      index--;
      
      // Check if finished deleting (but keep "I can")
      if (index <= 0) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isTyping = true; // Start typing next text
          idx = (idx + 1) % textArray.length; // Move to next text
          index = 0; // Reset character index
        }, 500); // Short pause before next text
      }
    }
    
    // Display text with cursor
    hobbies.innerHTML = currentText + '<span class="typing-cursor">|</span>';
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

// Contact Section Highlight Animation on Connect Button Click
document.addEventListener('DOMContentLoaded', function() {
  // Function to highlight contact cards
  function highlightContactCards() {
    const contactCards = document.querySelectorAll('.contact-item');
    
    contactCards.forEach((card, index) => {
      setTimeout(() => {
        // Add highlight animation
        card.style.transform = 'scale(1.05) translateY(-5px)';
        card.style.boxShadow = '0 20px 40px rgba(69, 206, 74, 0.4)';
        card.style.borderColor = '#45ce4a';
        card.style.transition = 'all 0.3s ease';
        
        // Add a pulsing effect
        card.style.animation = 'contactHighlight 1.5s ease-in-out';
        
        // Reset after animation
        setTimeout(() => {
          card.style.transform = '';
          card.style.boxShadow = '';
          card.style.borderColor = '';
          card.style.animation = '';
        }, 1500);
      }, index * 150); // Stagger the animation
    });
  }

  // Listen for connect button clicks
  const connectButtons = document.querySelectorAll('a[href="#contact"]');
  connectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Let the default scroll behavior happen first
      setTimeout(() => {
        // Wait for scroll to complete, then highlight
        setTimeout(highlightContactCards, 800);
      }, 100);
    });
  });
});

// Add CSS keyframes for contact highlight animation
const style = document.createElement('style');
style.textContent = `
  @keyframes contactHighlight {
    0% {
      transform: scale(1) translateY(0);
      box-shadow: 0 10px 20px rgba(69, 206, 74, 0.2);
    }
    50% {
      transform: scale(1.08) translateY(-8px);
      box-shadow: 0 25px 50px rgba(69, 206, 74, 0.5);
      border-color: #45ce4a;
    }
    100% {
      transform: scale(1.05) translateY(-5px);
      box-shadow: 0 20px 40px rgba(69, 206, 74, 0.4);
    }
  }
`;
document.head.appendChild(style);

