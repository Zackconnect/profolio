const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

const setMenuState = (open) => {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  const icon = menuToggle.querySelector('i');
  if (icon) {
    icon.className = open ? 'fas fa-times' : 'fas fa-bars';
  }
  navMenu.classList.toggle('active', open);
};

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.classList.toggle('active');
  setMenuState(Boolean(isOpen));
});

const closeMobileMenu = () => setMenuState(false);

const highlightNav = () => {
  const scrollY = window.pageYOffset;
  let activeSet = false;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove('active-link'));
      const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
      activeLink?.classList.add('active-link');
      activeSet = true;
    }
  });

  if (!activeSet) {
    navLinks.forEach((link) => link.classList.remove('active-link'));
  }
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const target = this.getAttribute('href');
    if (!target || target === '#') return;
    event.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
  });
});

const toggleBackToTop = () => {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.pageYOffset > 500);
};

backToTop?.addEventListener('click', () => {
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

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    closeMobileMenu();
  }
});

contactForm?.addEventListener('submit', (event) => {
  const name = contactForm.querySelector('input[name="name"]')?.value.trim();
  const email = contactForm.querySelector('input[name="email"]')?.value.trim();
  const message = contactForm.querySelector('textarea[name="message"]')?.value.trim();

  if (!name || !email || !message) {
    event.preventDefault();
    if (formMessage) {
      formMessage.textContent = 'Please fill in all required fields.';
      formMessage.classList.add('error');
      formMessage.classList.remove('success');
    }
    return;
  }

  if (formMessage) {
    formMessage.textContent = 'Sending your message...';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
  }
});
