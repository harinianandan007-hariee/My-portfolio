
// =========================================
// 1. SELECT HTML ELEMENTS
// =========================================

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const scrollTop = document.getElementById("scrollTop");


// =========================================
// 2. DARK / LIGHT THEME TOGGLE
// =========================================

// Get the previously saved theme from localStorage
const savedTheme = localStorage.getItem("portfolio-theme");

// Apply the saved theme when the website opens
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

// Update the theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark-theme")) {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

updateThemeIcon();

// Change the theme when the button is clicked
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Save the selected theme
    const currentTheme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeIcon();
});


// =========================================
// 3. MOBILE HAMBURGER NAVIGATION
// =========================================

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    // Change hamburger icon into close icon
    menuToggle.querySelector("i").className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";

    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close menu when a navigation link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        menuToggle.querySelector("i").className = "fa-solid fa-bars";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// =========================================
// 4. TYPING TEXT ANIMATION
// =========================================

const typingText = document.getElementById("typingText");

const words = [
    "CSE Student",
    "Aspiring Developer",
    "Tech Enthusiast",
    "Future Data Scientist"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let speed = deleting ? 55 : 100;

    // Pause after completing a word
    if (!deleting && characterIndex === currentWord.length) {
        speed = 1400;
        deleting = true;
    }

    // Move to the next word
    if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 350;
    }

    setTimeout(typeEffect, speed);
}

// Start typing animation
typeEffect();


// =========================================
// 5. SCROLL REVEAL ANIMATION
// =========================================

// Select all elements with the reveal class
const revealElements = document.querySelectorAll(".reveal");

// IntersectionObserver checks when an element enters the screen
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

// Observe every reveal element
revealElements.forEach(element => {
    revealObserver.observe(element);
});


// =========================================
// 6. SCROLL TO TOP BUTTON
// =========================================

window.addEventListener("scroll", () => {

    // Show button after scrolling down
    if (window.scrollY > 400) {
        scrollTop.classList.add("show");
    } else {
        scrollTop.classList.remove("show");
    }

});

// Scroll smoothly to the top when clicked
scrollTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =========================================
// 7. ACTIVE NAVIGATION ON SCROLL
// =========================================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const currentId = entry.target.getAttribute("id");

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + currentId) {
                    link.classList.add("active");
                }

            });
        }

    });

}, {
    rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// =========================================
// 8. CONTACT FORM
// =========================================

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

// Replace this with your actual email address
const myEmail = "yourmail@example.com";

contactForm.addEventListener("submit", (event) => {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check that all fields contain information
    if (!name || !email || !message) {
        formNote.textContent = "Please complete all the fields.";
        return;
    }

    // Prepare the email subject and content
    const subject = encodeURIComponent("Portfolio Contact - " + name);

    const body = encodeURIComponent(
        "Hello Harini,\n\n" +
        message +
        "\n\nFrom: " + name +
        "\nEmail: " + email
    );

    // Open the visitor's default email application
    const mailtoLink = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    formNote.textContent = "Your email application should open now.";

});


// =========================================
// 9. AUTOMATIC COPYRIGHT YEAR
// =========================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();
