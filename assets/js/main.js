document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    menuToggle.addEventListener('click', () => mobileNavOverlay.classList.add('active'));
    menuClose.addEventListener('click', () => mobileNavOverlay.classList.remove('active'));
    // Ensure all mobile nav links correctly close the menu
    mobileNavOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileNavOverlay.classList.remove('active'));
    });

    // --- Interactive Aurora/Glow Effect ---
    // Added .skill-tag to interactiveElements for consistent glow effect
    const interactiveElements = document.querySelectorAll('.glass-card, .btn.primary, .skill-tag');
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
                // Removed the specific timeline check here, as timeline now has animate-scroll class
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Observe all elements with .animate-scroll class for animation
    document.querySelectorAll('.animate-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // Observer for active nav link highlighting (update sections list to match current HTML)
    const sections = document.querySelectorAll(
        '#home, #summary, #skills, #experience, #projects, #contact'
    );
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
    }, { threshold: 0.5 }); // Adjust threshold if needed for better active link switching
    sections.forEach(section => navObserver.observe(section));

});