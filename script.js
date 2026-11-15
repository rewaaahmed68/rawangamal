/* ============================================
   RAWAN GAMAL — PORTFOLIO
   Interactions: typing, scroll, sparkles, tilt
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1) TYPING EFFECT
     ============================================ */
  const typedEl = document.getElementById('typed');
  const phrases = [
    'CCNA Certified',
    'Networking Enthusiast',
    'Problem Solver',
    'Lifelong Learner',
    'Book Lover'
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];

    if (deleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = deleting ? 40 : 85;

    if (!deleting && charIdx === current.length) {
      speed = 1700;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(typeLoop, speed);
  }

  setTimeout(typeLoop, 1500);

  /* ============================================
     2) NAVBAR / PROGRESS BAR / BACK-TO-TOP / ACTIVE LINK
     ============================================ */
  const navbar      = document.getElementById('mainNav');
  const progressBar = document.getElementById('progressBar');
  const backToTop   = document.getElementById('backToTop');
  const navLinks    = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar shrink
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);

    // Progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = (scrollY / docHeight) * 100 + '%';
    }

    // Back-to-top
    if (backToTop) backToTop.classList.toggle('show', scrollY > 420);

    // Active nav link
    let current = 'home';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     3) CLOSE MOBILE MENU ON LINK CLICK
     ============================================ */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* ============================================
     4) REVEAL ON SCROLL
     ============================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ============================================
     5) FOOTER YEAR
     ============================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================
     6) HERO SPARKLES (subtle floating dots)
     ============================================ */
  const hero = document.querySelector('.hero');
  if (hero) {
    const container = document.createElement('div');
    container.className = 'sparkle-container';
    hero.appendChild(container);

    const colors = ['#D9CFE8', '#F2C9D1', '#B5A8D9', '#8B5A7A', '#EDE7F6'];
    const sparkleCount = window.innerWidth < 768 ? 12 : 22;

    for (let i = 0; i < sparkleCount; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      const size = Math.random() * 6 + 3;
      s.style.left   = Math.random() * 100 + '%';
      s.style.bottom = Math.random() * 50 + '%';
      s.style.width  = size + 'px';
      s.style.height = size + 'px';
      s.style.background = colors[Math.floor(Math.random() * colors.length)];
      s.style.animationDelay    = Math.random() * 10 + 's';
      s.style.animationDuration = (Math.random() * 8 + 10) + 's';
      s.style.opacity = (Math.random() * 0.5 + 0.25).toFixed(2);
      container.appendChild(s);
    }
  }

  /* ============================================
     7) SKILL CARD SUBTLE TILT ON HOVER
     (desktop only — feels premium, not gimmicky)
     ============================================ */
  const isDesktop = window.matchMedia('(min-width: 992px)').matches;
  if (isDesktop) {
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform =
          `translateY(-8px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================
     8) SMOOTH SCROLL FALLBACK (older browsers)
     ============================================ */
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });
  }

});