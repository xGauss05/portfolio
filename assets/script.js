// Mobile Menu
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
  handleParallax();
  handleHeaderScroll();
};

// Header scroll shadow
function handleHeaderScroll() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Parallax on Hero Section
function handleParallax() {
  const scrollY = window.scrollY;
  const homeImg = document.querySelector('.home-img');
  const homeText = document.querySelector('.home-text');
  if (homeImg) homeImg.style.transform = `translateY(${scrollY * 0.12}px)`;
  if (homeText) homeText.style.transform = `translateY(${scrollY * 0.06}px)`;
}

// Intersection Observer – section entrance animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('animate-in');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll(
  '.row, .box, .skills-content, .home-text, .home-img, .contact-center, .contact-btn'
).forEach((el) => {
  el.classList.add('animate-ready');
  observer.observe(el);
});

// Staggered card animations
document.querySelectorAll('.projects-content, .education-content, .experience-content').forEach((container) => {
  container.querySelectorAll('.row, .box').forEach((card, i) => {
    card.style.setProperty('--stagger-delay', `${i * 80}ms`);
  });
});

// Navbar active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.remove('active-link'));
      const active = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-link');
    }
  });
}, { threshold: 0.4 }).observe !== undefined &&
sections.forEach((section) =>
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('active-link'));
        const a = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active-link');
      }
    });
  }, { threshold: 0.4 }).observe(section)
);
