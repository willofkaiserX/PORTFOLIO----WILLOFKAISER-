// Site configuration - edit links/assets here without touching the rest of the code
const portfolioData = {
    profileImage: "assets/mypic.jpg",
    backgroundMusic: "assets/mainbgm.mp3",

    socials: {
        github: "https://github.com/willofkaiserX",
        instagram: "https://www.instagram.com/willofkaiser/?hl=en",
        linkedin: "https://www.linkedin.com/in/viraj-singh-273613418/"
    },

    projects: {
        imperialFoundations: "https://project-imperial-foundations.vercel.app/",
        imperialRealty: "",
        kaisersDilemma: "https://project-kaiser-s-dilemma-git-main-willofkaiserxs-projects.vercel.app/"
    }
};

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.about-image, .about-text, .skill-card, .interest-card, .project-card, .contact-info, .contact-form');
animatedElements.forEach(el => observer.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
});

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Typing effect for hero section (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.classList.contains('animated')) return;
                stat.classList.add('animated');

                const target = parseInt(stat.textContent, 10);
                // Skip animation for non-numeric stats (e.g. "Always") to avoid NaN
                if (isNaN(target)) return;

                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize skill bars animation on page load
window.addEventListener('load', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
            const progressBar = card.querySelector('.skill-progress');
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
        }, index * 100);
    });
});

console.log('Portfolio website loaded successfully! 🚀');

// Hero background video: graceful fallback + reduced-motion respect
(function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    const wrapper = document.querySelector('.hero-video-wrapper');
    if (!video || !wrapper) return;

    // If the video file is missing or fails to load, hide the wrapper
    // so the existing dark background + gradient glow show through instead.
    video.addEventListener('error', () => {
        wrapper.style.display = 'none';
    }, true);

    // Respect users who prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        video.removeAttribute('autoplay');
        video.pause();
    }
})();

// Background Music Toggle
(function initMusicToggle() {
    const audio = document.getElementById('bgm');
    const toggleBtn = document.getElementById('musicToggle');
    if (!audio || !toggleBtn) return;

    const label = toggleBtn.querySelector('.music-label');
    const STORAGE_KEY = 'musicPreference';
    const FADE_STEP_MS = 40;
    const FADE_DURATION_MS = 600;
    const TARGET_VOLUME = 0.4;

    audio.volume = 0;
    let fadeInterval = null;
    let hasInteracted = false;

    function setUI(isPlaying) {
        toggleBtn.classList.toggle('playing', isPlaying);
        toggleBtn.setAttribute('aria-pressed', String(isPlaying));
        if (label) label.textContent = isPlaying ? 'Music On' : 'Music Off';
    }

    function fadeAudio(target, onDone) {
        if (fadeInterval) clearInterval(fadeInterval);
        const steps = FADE_DURATION_MS / FADE_STEP_MS;
        const stepAmount = (target - audio.volume) / steps;

        fadeInterval = setInterval(() => {
            const next = audio.volume + stepAmount;
            if ((stepAmount > 0 && next >= target) || (stepAmount < 0 && next <= target)) {
                audio.volume = target;
                clearInterval(fadeInterval);
                fadeInterval = null;
                if (onDone) onDone();
            } else {
                audio.volume = next;
            }
        }, FADE_STEP_MS);
    }

    function play() {
        audio.play().then(() => {
            fadeAudio(TARGET_VOLUME);
            setUI(true);
            localStorage.setItem(STORAGE_KEY, 'on');
        }).catch(() => {
            // Autoplay was blocked; wait for the next user interaction
            setUI(false);
        });
    }

    function pause() {
        fadeAudio(0, () => audio.pause());
        setUI(false);
        localStorage.setItem(STORAGE_KEY, 'off');
    }

    toggleBtn.addEventListener('click', () => {
        hasInteracted = true;
        if (audio.paused) {
            play();
        } else {
            pause();
        }
    });

    // Music never autoplays on load (browser restrictions + good UX).
    // If the user previously turned it on, start it on their first interaction with the page.
    const savedPreference = localStorage.getItem(STORAGE_KEY);
    if (savedPreference === 'on') {
        const startOnFirstInteraction = () => {
            if (hasInteracted) return;
            hasInteracted = true;
            play();
            document.removeEventListener('click', startOnFirstInteraction);
            document.removeEventListener('keydown', startOnFirstInteraction);
        };
        document.addEventListener('click', startOnFirstInteraction);
        document.addEventListener('keydown', startOnFirstInteraction);
    }
})();