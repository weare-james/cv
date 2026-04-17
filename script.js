const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const allNavLinks = document.querySelectorAll('.nav-link');
const revealEls = document.querySelectorAll('.reveal');
const barFills = document.querySelectorAll('.bar-fill');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let currentId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  allNavLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = targetWidth + '%';
        }, 200);
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

barFills.forEach((fill) => barObserver.observe(fill));

updateActiveNav();
