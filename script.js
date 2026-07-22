// ── AAF Gorpara Automation Hub JavaScript ──

// ── DOM References ──
const loadingOverlay = document.getElementById('loading-overlay');
const errorNotification = document.getElementById('error-notification');
const errorMessage = document.getElementById('error-message');
const navbar = document.querySelector('.navbar');

// ── Error Handling ──
function showError(message) {
  if (!errorNotification || !errorMessage) return;
  errorMessage.textContent = message;
  errorNotification.classList.add('show');

  setTimeout(() => {
    errorNotification.classList.remove('show');
  }, 5000);
}

function hideLoading() {
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

// Global error handling
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
  showError('A resource failed to load. Some features may not work properly.');
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  showError('An unexpected error occurred. Please refresh the page.');
});

// ── Resource Loading ──
function initializeResources() {
  // CSS is loaded since styles.css is in head before JS
  // Font loading check
  const fontCheck = new FontFace('DM Sans', 'local("DM Sans")');
  fontCheck.load().then(() => {
    hideLoading();
  }).catch(() => {
    hideLoading();
  });

  // Timeout fallback
  setTimeout(() => {
    hideLoading();
  }, 2000);
}

// ── Navbar Scroll Effect ──
function initializeNavbar() {
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScroll > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });

      ticking = true;
    }
  });
}

// ── Scroll Animations ──
function initializeScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');

  if (!fadeElements.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });
}

// ── Smooth Scrolling ──
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ── Performance Monitoring ──
function initializePerformanceMonitoring() {
  window.addEventListener('load', function() {
    if ('performance' in window) {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      const loadTime = navigationTiming ? navigationTiming.loadEventEnd - navigationTiming.loadEventStart : 0;

      console.log(`Page load time: ${loadTime}ms`);
    }
  });
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', function() {
  initializeResources();
  initializeNavbar();
  initializeScrollAnimations();
  initializeSmoothScrolling();
  initializePerformanceMonitoring();
});
