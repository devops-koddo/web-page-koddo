import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    console.log('KODDO Engineering Ecosystem Active');
    
    const app = document.getElementById('app');
    const header = document.querySelector('.site-header');
    const scrollProgress = document.querySelector('.scroll-progress');
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');

    // 1. Reveal App on load
    app.style.opacity = '1';

    // 2. Navbar & Scroll Progress logic
    window.addEventListener('scroll', () => {
        // Header transition
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Progress bar calculation
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // 3. Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (menuOverlay) menuOverlay.classList.remove('active');
            }
        });
    });

    // 4. Mobile Menu Toggle (Safe Check)
    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menuOverlay.classList.toggle('active');
            const isActive = menuOverlay.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isActive);
        });
    }

    // 5. Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .project-item, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });
});

// Helper for animations (re-injecting opacity via JS for better control)
document.addEventListener('scroll', () => {
    document.querySelectorAll('.visible').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});