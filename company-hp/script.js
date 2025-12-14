document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple reveal animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .profile-table').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }
    // Flying Cat Animation
    function spawnFlyingCat() {
        const cat = document.createElement('img');
        cat.src = 'images/1765693275377.jpg';
        cat.classList.add('flying-cat');
        cat.alt = 'Flying Cat';

        // Randomize starting vertical position (10% to 80% of viewport height)
        const startY = Math.random() * (window.innerHeight * 0.7) + (window.innerHeight * 0.1);
        cat.style.top = `${startY}px`;

        // Decide direction: Left to Right or Right to Left
        const direction = Math.random() < 0.5 ? 'ltr' : 'rtl';
        const startX = direction === 'ltr' ? -200 : window.innerWidth;
        const endX = direction === 'ltr' ? window.innerWidth : -200;

        // Set initial position
        cat.style.left = `${startX}px`;

        // Add to body
        document.body.appendChild(cat);

        // Animate using Web Animations API for better performance and control
        const duration = Math.random() * 3000 + 4000; // Random duration between 4s and 7s
        const animation = cat.animate([
            { transform: `translateX(0)` },
            { transform: `translateX(${endX - startX}px)` }
        ], {
            duration: duration,
            easing: 'linear',
            fill: 'forwards'
        });

        // Flip image if moving right to left (assuming original image faces right)
        // Adjust scaleX based on your image's original orientation
        // Let's assume the generated image faces Right.
        if (direction === 'rtl') {
            cat.style.transform = 'scaleX(-1)';
        }

        animation.onfinish = () => {
            cat.remove();
        };
    }

    // Schedule random appearances
    function scheduleNextCat() {
        const minDelay = 10000; // 10 seconds
        const maxDelay = 30000; // 30 seconds
        const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

        setTimeout(() => {
            spawnFlyingCat();
            scheduleNextCat();
        }, randomDelay);
    }

    // Start the loop and spawn one immediately for demo purposes
    scheduleNextCat();
    setTimeout(spawnFlyingCat, 2000); // Spawn one shortly after load
});
