// JavaScript to fix the issue where clicking a link doesn't close the menu, add smooth scrolling, and enable drag-to-close functionality

// Select the navbar container
let navbar = document.querySelector('.navbar');
let isDragging = false;
let startX;

// Toggle the navbar visibility when the menu button is clicked
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.remove('inactive');
    navbar.classList.add('active');
    navbar.style.right = '0'; // Slide in from the right
};

// Hide the navbar when the close button is clicked
document.querySelector('#close-btn').onclick = () => {
    navbar.classList.remove('active');
    navbar.classList.add('inactive');
    navbar.style.right = '-100%'; // Slide out to the right
};

// Add event listeners to all links with the 'amenu' class
document.querySelectorAll('.amenu').forEach(link => {
    link.onclick = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        navbar.classList.remove('active');
        navbar.classList.add('inactive');
        navbar.style.right = '-100%'; // Slide out to the right

        // Smooth scroll to the target section
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
});

// Add drag-to-close functionality
navbar.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

navbar.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        if (deltaX > 0) {
            navbar.style.right = `${-deltaX}px`;
        }
    }
});

navbar.addEventListener('mouseup', (e) => {
    isDragging = false;
    const endX = e.clientX;
    if (endX - startX > 100) {
        navbar.classList.remove('active');
        navbar.classList.add('inactive');
        navbar.style.right = '-100%'; // Slide out to the right
    } else {
        navbar.style.right = '0'; // Reset position if not dragged far enough
    }
});

navbar.addEventListener('mouseleave', () => {
    isDragging = false;
});
