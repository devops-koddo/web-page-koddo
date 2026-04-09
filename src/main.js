import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const scrollProgress = document.querySelector('.scroll-progress');
    const cursor = document.querySelector('.cursor');
    
    // Custom Liquid Cursor Interaction
    if (cursor) {
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            
            // Smarter follower logic
            requestAnimationFrame(() => {
                follower.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
            });
        });

        // Add hover effects for interactive elements
        document.querySelectorAll('a, button, .glass-card').forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('active'));
            el.addEventListener('mouseleave', () => follower.classList.remove('active'));
        });

        // Hide cursor when entering iframes (like the contact form)
        const hideCursor = () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        };
        const showCursor = () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        };

        document.querySelectorAll('iframe, .contact-form-container').forEach(el => {
            el.addEventListener('mouseenter', hideCursor);
            el.addEventListener('mouseleave', showCursor);
        });
    }

    // Scroll & Header Logic
    window.addEventListener('scroll', () => {
        const winScroll = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (scrollProgress) scrollProgress.style.width = scrolled + '%';
        if (header) {
            header.classList.toggle('scrolled', winScroll > 50);
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            const isActive = menuOverlay.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close on link click
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Semantic Intersection Observer for Animations (LLM Friendly)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.glass-card, .section-title, .hero-content, .project-item').forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });

    // Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
