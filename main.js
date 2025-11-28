import './style.css'

console.log('Koddo Software Studio loaded.');

// Simple interaction for the "Start a Project" button
document.querySelector('.btn').addEventListener('click', (e) => {
  // Smooth scroll is handled by CSS, but we can add tracking or other logic here
  console.log('Start a Project clicked');
});

// Add a subtle parallax effect to the shapes if desired
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
        const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu button toggle
const menuBtn = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');

menuBtn.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
});

// Close menu on link click
const menuLinks = document.querySelectorAll('.mobile-nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
    });
});

// Close menu on overlay click
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
    }
});
