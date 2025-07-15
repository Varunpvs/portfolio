document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Logic (remains the same) ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    menuToggle.addEventListener('click', () => mobileNavOverlay.classList.add('active'));
    menuClose.addEventListener('click', () => mobileNavOverlay.classList.remove('active'));
    mobileNavOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileNavOverlay.classList.remove('active'));
    });

    // --- Interactive Aurora/Glow Effect ---
    const interactiveElements = document.querySelectorAll('.glass-card, .btn.primary');
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--x', `${(x / rect.width) * 100}%`);
            el.style.setProperty('--y', `${(y / rect.height) * 100}%`);
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special handling for the timeline animation
                if (entry.target.classList.contains('timeline')) {
                    entry.target.classList.add('visible');
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.animate-scroll, .timeline').forEach(el => {
        animationObserver.observe(el);
    });

    // Observer for active nav link highlighting (remains the same)
    const sections = document.querySelectorAll('section');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => navObserver.observe(section));

});