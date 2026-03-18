// Mendoza Pressure Pros - Scripts

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Scroll animations
const animatedElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animations for siblings
      const parent = entry.target.parentElement;
      const siblings = parent.querySelectorAll('[data-animate]');
      const siblingIndex = Array.from(siblings).indexOf(entry.target);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, siblingIndex * 100);

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => observer.observe(el));

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const service = formData.get('service');
  const message = formData.get('message');
  const email = formData.get('email');

  // Build SMS/text message body
  const body = `Hi, I'm ${name}. I'm interested in ${service} service.${message ? ' ' + message : ''}${email ? ' Email: ' + email : ''}`;

  // Open SMS or phone - fallback to tel link
  window.location.href = `sms:4802004912?body=${encodeURIComponent(body)}`;

  // Show success state
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
