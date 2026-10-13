/**
 * ==============================================================================
 * VAIBHAV LAKDE - PORTFOLIO JAVASCRIPT ENGINE
 * Strictly Pure Vanilla JavaScript (ES6+) - Zero External Frameworks/Libraries
 * ==============================================================================
 */

'use strict';

/* ==============================================================================
   1. THEME CONTROLLER (Dark / Light Mode with LocalStorage)
   ============================================================================== */
const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem('vl_theme') || 'dark';
    this.applyTheme(savedTheme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
      });
    }
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vl_theme', theme);
  }
};

/* ==============================================================================
   2. TYPING EFFECT ENGINE (Hero Section)
   ============================================================================== */
const TypingEffect = {
  roles: [
    'Frontend Web Developer',
    'Web Content Author',
    'CMS Specialist',
    'Vanilla JavaScript Enthusiast'
  ],
  currentRoleIndex: 0,
  currentCharIndex: 0,
  isDeleting: false,
  element: null,

  init() {
    this.element = document.getElementById('typingText');
    if (!this.element) return;
    this.tick();
  },

  tick() {
    const currentRole = this.roles[this.currentRoleIndex];

    if (this.isDeleting) {
      this.currentCharIndex--;
    } else {
      this.currentCharIndex++;
    }

    this.element.textContent = currentRole.substring(0, this.currentCharIndex);

    let speed = this.isDeleting ? 45 : 90;

    if (!this.isDeleting && this.currentCharIndex === currentRole.length) {
      speed = 1800; // Pause at end of text
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      speed = 400; // Pause before typing new word
    }

    setTimeout(() => this.tick(), speed);
  }
};

/* ==============================================================================
   3. MOBILE NAVIGATION MENU
   ============================================================================== */
const MobileMenu = {
  init() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('active');
      btn.setAttribute('aria-expanded', isOpen);
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
};

/* ==============================================================================
   4. SKILLS FILTER TABS
   ============================================================================== */
const SkillsFilter = {
  init() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.skill-card');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
};

/* ==============================================================================
   5. PROJECT DETAILS MODAL CONTROLLER
   ============================================================================== */
const ProjectModal = {
  details: {
    flipkart: {
      title: 'Flipkart E-Commerce Clone & Web Authoring Console',
      badge: 'Flagship Project',
      content: `
        <p><strong>Overview:</strong> A production-grade e-commerce application built strictly with pure HTML5, CSS3, and Vanilla JavaScript (ES6+) with zero third-party packages or framework overhead.</p>
        <h4>Key Technical Highlights:</h4>
        <ul>
          <li><strong>Semantic HTML5 Architecture:</strong> Fully accessible landmark structure, SVG iconography, and responsive design patterns.</li>
          <li><strong>CSS3 Modern Layouts:</strong> Flexbox for fluid UI controls and CSS Grid with <code>minmax(230px, 1fr)</code> for adaptive product catalogs.</li>
          <li><strong>Pure Vanilla JavaScript Engine:</strong> Debounced live search autocomplete, category filtering, interactive hero carousel, and multi-step cart math.</li>
          <li><strong>CMS Web Content Authoring Simulator:</strong> Real-time authoring panel that lets non-technical editors publish products and banners dynamically without editing code.</li>
          <li><strong>Browser Persistence:</strong> State synchronized with <code>localStorage</code> for carts and author updates.</li>
        </ul>
        <p><strong>Live Demo:</strong> <a href="https://vaibhavlakde.github.io/flipkart-clone/" target="_blank" style="color: var(--accent-primary); font-weight:600;">vaibhavlakde.github.io/flipkart-clone</a></p>
        <p><strong>GitHub Repository:</strong> <a href="https://github.com/vaibhavlakde/flipkart-clone" target="_blank" style="color: var(--accent-primary); font-weight:600;">github.com/vaibhavlakde/flipkart-clone</a></p>
      `
    },
    cms: {
      title: 'Web Content Authoring Simulator',
      badge: 'Content Management Focus',
      content: `
        <p><strong>Overview:</strong> An interactive website authoring interface demonstrating practical understanding of enterprise CMS concepts (such as AEM, WordPress, and Drupal content models).</p>
        <h4>Technical Highlights:</h4>
        <ul>
          <li><strong>Structured Content Schemas:</strong> Form-based data ingestion for products, promo copy, background themes, and metadata tags.</li>
          <li><strong>DOM-Level Live Ingestion:</strong> Dynamically validates user input, serializes schema objects, and renders updates directly to the web storefront.</li>
          <li><strong>Separation of Concerns:</strong> Demonstrates decoupling between the content authoring workflow and front-end template rendering.</li>
        </ul>
      `
    },
    'design-system': {
      title: 'Responsive Component Design System',
      badge: 'CSS3 & Accessibility',
      content: `
        <p><strong>Overview:</strong> A modular CSS3 design system built using CSS Custom Properties, accessible semantic widgets, and fluid typography.</p>
        <h4>Technical Highlights:</h4>
        <ul>
          <li><strong>Standardized Theme Tokens:</strong> Seamless dark and light mode themes via CSS Variables and HTML data attributes.</li>
          <li><strong>Fluid Breakpoints:</strong> Zero dependencies on CSS frameworks; pure media queries tailored for desktop, tablet, and mobile displays.</li>
          <li><strong>WCAG 2.1 Accessibility:</strong> Semantic focus states, ARIA landmarks, and high color-contrast ratios.</li>
        </ul>
      `
    }
  },

  init() {
    const backdrop = document.getElementById('projectModalBackdrop');
    const content = document.getElementById('modalContent');
    const closeBtn = document.getElementById('closeModalBtn');
    const triggerButtons = document.querySelectorAll('.view-details-btn');

    if (!backdrop || !content) return;

    triggerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.project;
        const data = this.details[key];
        if (!data) return;

        content.innerHTML = `
          <div style="margin-bottom: 8px;">
            <span class="tech-tag">${data.badge}</span>
          </div>
          <h3>${data.title}</h3>
          ${data.content}
        `;

        backdrop.classList.remove('hidden');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        backdrop.classList.add('hidden');
      });
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) {
        backdrop.classList.add('hidden');
      }
    });
  }
};

/* ==============================================================================
   6. CONTACT FORM VALIDATOR & TOAST NOTIFICATIONS
   ============================================================================== */
const ContactManager = {
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        const name = document.getElementById('contactName').value.trim();
        this.showToast(`Thank you, ${name}! Your message has been prepared.`, 'success');
        form.reset();
      }
    });
  },

  validateForm() {
    let isValid = true;

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');

    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const subjectErr = document.getElementById('subjectError');
    const messageErr = document.getElementById('messageError');

    // Clear previous errors
    [nameErr, emailErr, subjectErr, messageErr].forEach(el => {
      if (el) el.textContent = '';
    });

    if (!name.value.trim()) {
      nameErr.textContent = 'Please enter your full name.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      emailErr.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!subject.value.trim()) {
      subjectErr.textContent = 'Please enter a subject.';
      isValid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      messageErr.textContent = 'Please enter a message (at least 10 characters).';
      isValid = false;
    }

    return isValid;
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }
};

/* ==============================================================================
   7. BACK TO TOP BUTTON
   ============================================================================== */
const BackToTop = {
  init() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

/* ==============================================================================
   8. APPLICATION BOOTSTRAP
   ============================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  TypingEffect.init();
  MobileMenu.init();
  SkillsFilter.init();
  ProjectModal.init();
  ContactManager.init();
  BackToTop.init();

  console.log('✅ Vaibhav Lakde Portfolio initialized strictly with pure HTML5, CSS3, & Vanilla JavaScript.');
});
