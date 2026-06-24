import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // Show body after CSS/JS is ready to prevent FOUC
    document.body.classList.add('js-loaded');

    const header = document.querySelector('.site-header');
    const scrollProgress = document.querySelector('.scroll-progress');

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

    // Glow que sigue al cursor en el Hero (refracción dinámica tras el cristal)
    const cursorGlow = document.querySelector('[data-cursor-glow]');
    const heroSection = document.querySelector('.hero');
    if (cursorGlow && heroSection && window.matchMedia('(hover: hover)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let rafId = null;
        heroSection.addEventListener('pointermove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
                cursorGlow.style.opacity = '0.7';
            });
        });
        heroSection.addEventListener('pointerleave', () => {
            cursorGlow.style.opacity = '0';
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

    window.siteObserver = observer; // Exportar para uso dinámico

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

    // Galería de capturas por proyecto + lightbox
    const galleries = document.querySelectorAll('[data-gallery]');
    if (galleries.length) {
        // Lightbox compartido, creado una sola vez
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button type="button" class="lightbox-btn lightbox-close" aria-label="Cerrar">&times;</button>
            <button type="button" class="lightbox-btn lightbox-prev" aria-label="Anterior">&#8249;</button>
            <img class="lightbox-img" src="" alt="">
            <button type="button" class="lightbox-btn lightbox-next" aria-label="Siguiente">&#8250;</button>
        `;
        document.body.appendChild(lightbox);

        const lbImg = lightbox.querySelector('.lightbox-img');
        let activeImages = [];
        let activeIndex = 0;

        const renderLightbox = () => {
            const item = activeImages[activeIndex];
            if (item) {
                lbImg.src = item.src;
                lbImg.alt = item.alt;
            }
        };
        const openLightbox = (images, index) => {
            activeImages = images;
            activeIndex = index;
            renderLightbox();
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        };
        const step = (dir) => {
            if (!activeImages.length) return;
            activeIndex = (activeIndex + dir + activeImages.length) % activeImages.length;
            renderLightbox();
        };

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
        lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); step(1); });
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
        });

        galleries.forEach(gallery => {
            const mainBtn = gallery.querySelector('.gallery-main');
            const mainImg = gallery.querySelector('.gallery-main-img');
            const thumbs = Array.from(gallery.querySelectorAll('.gallery-thumb'));
            const images = thumbs.map(t => ({ src: t.dataset.src, alt: t.dataset.alt || '' }));

            const setActive = (index) => {
                const item = images[index];
                if (!item) return;
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = item.src;
                    mainImg.alt = item.alt;
                    mainImg.style.opacity = '1';
                }, 150);
                thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));
                gallery.dataset.current = index;
            };

            thumbs.forEach((thumb, i) => {
                thumb.addEventListener('click', () => setActive(i));
            });

            if (mainBtn) {
                mainBtn.addEventListener('click', () => {
                    openLightbox(images, Number(gallery.dataset.current || 0));
                });
            }
        });
    }

    // Carga dinámica de los últimos posts en el Index
    const latestPostsContainer = document.getElementById('latest-posts-container');
    if (latestPostsContainer) {
        async function fetchLatestPosts() {
            try {
                const response = await fetch('src/posts.json');
                const posts = await response.json();
                
                // Tomamos los 2 más recientes
                const latestPosts = posts.slice(0, 2);
                
                latestPostsContainer.innerHTML = latestPosts.map(post => `
                    <article class="blog-card glass-card reveal-init">
                        <div class="blog-card-image">
                            <img src="${post.image}" alt="${post.title}" loading="lazy">
                        </div>
                        <div class="blog-card-content">
                            <span class="blog-category">${post.category}</span>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <div class="blog-card-footer">
                                <span class="blog-date">${post.date}</span>
                                <a href="/blog/${post.id}/" class="blog-link">
                                    Leer más 
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </article>
                `).join('');

                // Re-activar el Intersection Observer para los nuevos elementos
                document.querySelectorAll('.blog-card').forEach(el => {
                    if (window.siteObserver) window.siteObserver.observe(el);
                });
                
            } catch (e) {
                console.error("Error cargando posts en index:", e);
                latestPostsContainer.innerHTML = "<p>Error al cargar artículos.</p>";
            }
        }
        fetchLatestPosts();
    }
});
