// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Highlight active section in nav
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target === '#') return;
        e.preventDefault();
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');

const toggleBackToTop = () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
};

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    highlightNav();
    toggleBackToTop();
});

window.addEventListener('load', () => {
    highlightNav();
    toggleBackToTop();
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

contactForm.addEventListener('submit', event => {
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
        event.preventDefault();
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
        return;
    }

    formMessage.textContent = 'Sending your message...';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
});
// no image optimization feature (removed)