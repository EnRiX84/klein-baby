/* ============================================
   KLEIN BABY - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 600);
        }, 800);
    });

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // === Mobile Menu Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // === Active Nav Link on Scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // === AOS (Animate On Scroll) - Lightweight Implementation ===
    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                aosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    // === Counter Animation ===
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // === Hero Confetti Particles ===
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const colors = ['pink', 'blue', 'purple', 'yellow', 'green', 'orange', 'red'];
        for (let i = 0; i < 45; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.animationDuration = `${4 + Math.random() * 4}s`;
            const size = 2 + Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            // Some particles are squares (confetti-like)
            if (Math.random() > 0.5) {
                particle.style.borderRadius = '2px';
            }
            particlesContainer.appendChild(particle);
        }
    }

    // === Back to Top Button ===
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    // === Smooth Scroll for All Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Contact Form Handler ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) return;

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span>Invio in corso...</span> <i class="fas fa-spinner fa-spin"></i>';

            // Build mailto link
            const subject = `Richiesta informazioni da ${name}`;
            const body = `Nome: ${name}\nEmail: ${email}${phone ? '\nTelefono: ' + phone : ''}\n\nMessaggio:\n${message}`;
            const mailtoURL = `mailto:info@kleinbaby.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open user's email client
            btn.innerHTML = '<span>Apertura email...</span> <i class="fas fa-envelope"></i>';
            setTimeout(() => {
                window.location.href = mailtoURL;
                btn.innerHTML = '<span>Messaggio Inviato!</span> <i class="fas fa-check"></i>';
                btn.style.background = '#2d8a4e';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 500);
        });
    }

    // === Dynamic News from JSON ===
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        fetch('data/notizie.json')
            .then(r => r.json())
            .then(notizie => {
                if (!notizie || notizie.length === 0) {
                    const newsSection = document.getElementById('news');
                    if (newsSection) newsSection.style.display = 'none';
                    return;
                }
                const iconColors = ['orange', 'blue', 'green', 'purple'];
                const iconClasses = ['fa-tags', 'fa-snowflake', 'fa-baby-carriage', 'fa-star'];
                newsGrid.innerHTML = notizie.map((n, i) => {
                    const colorClass = iconColors[i % iconColors.length];
                    const iconClass = iconClasses[i % iconClasses.length];
                    const linkHtml = n.links && n.links.length > 0
                        ? `<a href="${n.links[0].url}" target="_blank" rel="noopener" class="news-link">${n.links[0].testo} <i class="fas fa-arrow-right"></i></a>`
                        : '';
                    return `<article class="news-card" data-aos="fade-up" data-aos-delay="${i * 100}">
                    <div class="news-image">
                        <div class="news-icon-placeholder ${colorClass}">
                            <i class="fas ${iconClass}"></i>
                        </div>
                        <span class="news-date">${n.data}</span>
                    </div>
                    <div class="news-body">
                        <h3>${n.titolo}</h3>
                        <p>${n.descrizione}</p>
                        ${linkHtml}
                    </div>
                </article>`;
                }).join('');
                newsGrid.querySelectorAll('[data-aos]').forEach(el => {
                    if (typeof aosObserver !== 'undefined') aosObserver.observe(el);
                });
            })
            .catch(() => {
                const newsSection = document.getElementById('news');
                if (newsSection) newsSection.style.display = 'none';
            });
    }

    // === Parallax Effect for Promo Section ===
    const promoSection = document.querySelector('.section-promo');
    if (promoSection) {
        window.addEventListener('scroll', () => {
            const rect = promoSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const overlay = promoSection.querySelector('.promo-overlay');
                if (overlay) {
                    const speed = 0.3;
                    overlay.style.transform = `translateY(${(rect.top * speed * -1)}px)`;
                }
            }
        }, { passive: true });
    }

    // === Accessories Gallery ===
    const galleryOverlay = document.getElementById('galleryOverlay');
    const accessoriCard = document.getElementById('accessori-card');

    if (galleryOverlay && accessoriCard) {
        const galleryImages = Array.from({length: 10}, (_, i) =>
            `images/accessories/${String(i + 1).padStart(2, '0')}.jpg`
        );
        let currentIndex = 0;
        let touchStartX = 0;

        const galleryImg = document.getElementById('galleryImage');
        const galleryCounter = document.getElementById('galleryCounter');
        const galleryThumbnails = document.getElementById('galleryThumbnails');

        // Generate thumbnails
        galleryImages.forEach((src, i) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `Accessorio ${i + 1}`;
            thumb.className = 'acc-gallery-thumb';
            thumb.addEventListener('click', () => showImage(i));
            galleryThumbnails.appendChild(thumb);
        });

        function showImage(index) {
            currentIndex = index;
            galleryImg.classList.add('fade');
            setTimeout(() => {
                galleryImg.src = galleryImages[index];
                galleryImg.classList.remove('fade');
            }, 200);
            galleryCounter.textContent = `${index + 1} / ${galleryImages.length}`;
            galleryThumbnails.querySelectorAll('.acc-gallery-thumb').forEach((t, i) => {
                t.classList.toggle('active', i === index);
            });
            // Preload adjacent images
            if (index > 0) { const img = new Image(); img.src = galleryImages[index - 1]; }
            if (index < galleryImages.length - 1) { const img = new Image(); img.src = galleryImages[index + 1]; }
        }

        function openGallery() {
            showImage(0);
            galleryOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeGallery() {
            galleryOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        accessoriCard.addEventListener('click', openGallery);
        document.getElementById('galleryClose').addEventListener('click', closeGallery);
        document.getElementById('galleryPrev').addEventListener('click', () => {
            showImage(currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1);
        });
        document.getElementById('galleryNext').addEventListener('click', () => {
            showImage(currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0);
        });

        // Close on backdrop click
        galleryOverlay.addEventListener('click', (e) => {
            if (e.target === galleryOverlay || e.target.classList.contains('acc-gallery-main') || e.target.classList.contains('acc-gallery-image-container')) {
                closeGallery();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!galleryOverlay.classList.contains('active')) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') showImage(currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1);
            if (e.key === 'ArrowRight') showImage(currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0);
        });

        // Touch swipe
        galleryOverlay.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        galleryOverlay.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) showImage(currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0);
                else showImage(currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1);
            }
        }, { passive: true });
    }

});
