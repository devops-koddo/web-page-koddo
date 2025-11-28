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
