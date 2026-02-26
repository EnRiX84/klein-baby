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

            // Build WhatsApp message as fallback
            const waText = `Ciao! Sono ${name} (${email}${phone ? ', ' + phone : ''}).\n\n${message}`;
            const waURL = `https://wa.me/393381710933?text=${encodeURIComponent(waText)}`;

            // Since there is no backend API yet, redirect to WhatsApp
            btn.innerHTML = '<span>Apertura WhatsApp...</span> <i class="fab fa-whatsapp"></i>';
            setTimeout(() => {
                window.open(waURL, '_blank');
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

});
