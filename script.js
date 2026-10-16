// ── AAF Gorpara Automation Hub JavaScript ──

// ── DOM References ──
const loadingOverlay = document.getElementById('loading-overlay');
const errorNotification = document.getElementById('error-notification');
const errorMessage = document.getElementById('error-message');
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// ── Default Fallback Portals Data ──
const defaultPortals = [
  {
    id: 1,
    number: "Automation — 01",
    category: "general",
    icon: "fa-solid fa-chart-bar",
    iconClass: "icon-1",
    title: "Section Wise Daily Per Hour Production Report",
    description: "Tracks hourly production output section-by-section. Auto-generates structured daily reports, eliminating manual tabulation and reducing reporting lag.",
    launchUrl: "https://script.google.com/a/macros/brac.net/s/AKfycbxp3LXb9Zcs4fl_i6-KyRB8mXF5Xm_dsKgz5f5C9MaLoK5KP5KIzDy3-sHQRNi_UZTMPg/exec",
    repoUrl: "https://github.com/bashir-CSE/Section-Wise-Daily-Per-Hour-Production-Report---AAF",
    btnClass: "btn-1",
    cardClass: "card-1"
  },
  {
    id: 2,
    number: "Automation — 02",
    category: "general",
    icon: "fa-solid fa-clipboard-list",
    iconClass: "icon-2",
    title: "Paperless Production Planning & Costing Portal",
    description: "A digital-first planning portal that replaces paper-based workflows. Enables planners to allocate, schedule, and track production tasks from a single interface.",
    launchUrl: "https://script.google.com/macros/s/AKfycbwrXmZSX4KyUq3JNnaZu_D5VaFGrvZNQUEom-axTn1T7uaZXw-6LSq171KWMYG21q2b/exec",
    repoUrl: "https://github.com/bashir-CSE/Production-Planner-AAF-Gorpara",
    btnClass: "btn-2",
    cardClass: "card-2"
  },
  {
    id: 3,
    number: "Automation — 03",
    category: "general",
    icon: "fa-solid fa-receipt",
    iconClass: "icon-3",
    title: "Autometed Billing System",
    description: "Automates your billing for daily. Instantly generates formatted bills, saving time for both requesters and approvers.",
    launchUrl: "https://script.google.com/macros/s/AKfycbxDPlD55dBjdJhyICPBKr_wYzNQ_498vY69JoTxva9hNEPFyzD2IfSHCyXc-SElgnHR0Q/exec",
    repoUrl: "https://github.com/bashir-CSE/Snack-s-Bill-Generator-for-Gorpara",
    btnClass: "btn-3",
    cardClass: "card-3"
  },
  {
    id: 4,
    number: "Automation — 04",
    category: "general",
    icon: "fa-solid fa-chart-line",
    iconClass: "icon-4",
    title: "Dashboard - KPI",
    description: "Monitors key performance indicators in real-time to provide operational insights and data-driven decision-making.",
    launchUrl: "https://datastudio.google.com/reporting/0f741963-765e-4637-9764-64232839975a",
    repoUrl: "",
    btnClass: "btn-4",
    cardClass: "card-4"
  },
  {
    id: 5,
    number: "Automation — 05",
    category: "report",
    icon: "fa-solid fa-file-invoice-dollar",
    iconClass: "icon-5",
    title: "Bill by Aarong",
    description: "Monitors key performance indicators in real-time to provide operational insights and data-driven decision-making.",
    launchUrl: "https://misaafgorpara-cmd.github.io/bill-by-aarong/",
    repoUrl: "",
    btnClass: "btn-5",
    cardClass: "card-5"
  },
  {
    id: 6,
    number: "Automation — 06",
    category: "report",
    icon: "fa-solid fa-clipboard-list",
    iconClass: "icon-6",
    title: "Area Wise Finish Store Stock Report",
    description: "Finish Store এর স্টক রিপোর্টকে Area Wise Format এ তৈরি করার জন্য এই পোর্টালটি তৈরি করা হয়েছে।",
    launchUrl: "https://misaafgorpara-cmd.github.io/Area-Wise-Finish-Store-Stock-Report/",
    repoUrl: "https://github.com/misaafgorpara-cmd/Area-Wise-Finish-Store-Stock-Report",
    btnClass: "btn-6",
    cardClass: "card-6"
  }
];

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
window.addEventListener('error', function (e) {
  console.error('Global error:', e.error);
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function (e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ── Raw Bootstrap Card Rendering (Launch Button matches portal icon color) ──
function createCard(portal) {
  const item = document.createElement('div');
  item.className = 'item h-100 p-2';

  // Determine button color class according to portal iconClass / btnClass
  const btnColorClass = portal.btnClass || (portal.iconClass ? portal.iconClass.replace('icon-', 'btn-') : 'btn-1');
  const cardColorClass = portal.cardClass || (portal.iconClass ? portal.iconClass.replace('icon-', 'card-') : 'card-1');

  item.innerHTML = `
    <div class="card h-100 shadow-sm border portal-card ${cardColorClass}">
      <div class="card-body d-flex flex-column p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-secondary-subtle text-secondary-emphasis px-3 py-2">${portal.number}</span>
          <span class="portal-icon bg-${portal.iconClass} text-${portal.iconClass}" aria-hidden="true">
            <i class="${portal.icon}"></i>
          </span>
        </div>
        <h5 class="card-title fw-bold mb-2">${portal.title}</h5>
        <p class="card-text text-body-secondary small flex-grow-1 mb-4">${portal.description}</p>
        <div class="mt-auto">
          <a href="${portal.launchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-portal ${btnColorClass} w-100 d-flex align-items-center justify-content-center gap-2">
            <span>Launch Portal</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  return item;
}

// ── Initialize Portals & Owl Carousel ──
async function loadPortals() {
  const carouselContainer = $('#portals-carousel');

  let portals = [];
  try {
    const response = await fetch('portals.json');
    if (!response.ok) {
      throw new Error(`Failed to load portals.json: ${response.status}`);
    }
    portals = await response.json();
  } catch (error) {
    console.warn('Could not fetch portals.json directly, using fallback data:', error);
    portals = defaultPortals;
  }

  if (carouselContainer.length) {
    // Empty any existing carousel content if reloaded
    if (carouselContainer.hasClass('owl-loaded')) {
      carouselContainer.trigger('destroy.owl.carousel');
      carouselContainer.find('.owl-stage-outer').children().unwrap();
      carouselContainer.removeClass('owl-loaded');
    }

    carouselContainer.empty();

    // Append all cards
    portals.forEach(portal => {
      const cardElement = createCard(portal);
      carouselContainer.append(cardElement);
    });

    // Initialize Owl Carousel with smooth slide animations
    const owl = carouselContainer.owlCarousel({
      loop: portals.length > 2,
      margin: 22,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      smartSpeed: 700,
      center: true,
      navText: [
        '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>',
        '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>'
      ],
      responsive: {
        0: {
          items: 1,
          center: false,
          margin: 12
        },
        576: {
          items: 2,
          center: true,
          margin: 16
        },
        992: {
          items: 3,
          center: true,
          margin: 20
        },
        1200: {
          items: 3,
          center: true,
          margin: 24
        }
      }
    });

    // Mouse wheel support for sliding
    owl.on('mousewheel', '.owl-stage', function (e) {
      const delta = e.originalEvent && e.originalEvent.deltaY !== undefined 
        ? e.originalEvent.deltaY 
        : (e.deltaY || 0);
      if (delta > 0) {
        owl.trigger('next.owl');
      } else {
        owl.trigger('prev.owl');
      }
      e.preventDefault();
    });
  }

  initializeScrollAnimations();
}

// ── Resource Loading ──
function initializeResources() {
  const fontCheck = new FontFace('DM Sans', 'local("DM Sans")');
  fontCheck.load().then(() => {
    hideLoading();
  }).catch(() => {
    hideLoading();
  });

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
        if (lastScroll > 30) {
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

// ── Mobile Navigation ──
function initializeMobileNav() {
  if (!navToggle || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  }

  navToggle.addEventListener('click', toggleMenu);
  navLinks.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (e.target.closest('.nav-links') || e.target.closest('.nav-toggle')) return;
    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

// ── Smooth Scrolling ──
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
  window.addEventListener('load', function () {
    if ('performance' in window) {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      const loadTime = navigationTiming ? navigationTiming.loadEventEnd - navigationTiming.loadEventStart : 0;

      console.log(`Page load time: ${loadTime}ms`);
    }
  });
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', function () {
  initializeResources();
  initializeNavbar();
  initializeMobileNav();
  initializeSmoothScrolling();
  initializePerformanceMonitoring();
  loadPortals();
});
