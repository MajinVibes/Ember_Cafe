/**
 * EMBER Café — Main JavaScript
 * Handles navigation drawer, reservation modal (demo), category filters,
 * form submission demo toasts, and favorite toggles.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initReservationModal();
  initMenuFilters();
  initDemoForms();
  initFavorites();
  initHeroIndicators();
});

/* ==========================================
   Mobile Navigation Drawer
   ========================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close drawer on clicking any link inside
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================
   Reservation Enquiry Modal (Demo Mode)
   ========================================== */
function initReservationModal() {
  const modal = document.querySelector('.modal-overlay');
  const openBtns = document.querySelectorAll('[data-open-modal="reservation"]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const form = document.querySelector('#reservation-form');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Guest';
      const guests = form.querySelector('[name="guests"]')?.value || '2';
      const time = form.querySelector('[name="time"]')?.value || '7:00 PM';
      
      closeModal();
      form.reset();

      showToast(`✨ [Demo Enquiry] Thank you, ${name}! Your enquiry for ${guests} guests at ${time} has been simulated.`);
    });
  }
}

/* ==========================================
   Menu Category Filters
   ========================================== */
function initMenuFilters() {
  const tabs = document.querySelectorAll('.category-tab');
  const items = document.querySelectorAll('.product-card[data-category]');

  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (targetCategory === 'all' || itemCategory === targetCategory) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================
   Demo Form Submissions (Contact & Newsletter)
   ========================================== */
function initDemoForms() {
  // Contact Form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('[name="name"]');
      const name = nameInput?.value || 'Friend';
      contactForm.reset();
      showToast(`📬 [Demo Mode] Message received, ${name}! As this is a fictional demonstration, no actual email is sent.`);
    });
  }

  // Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value || 'coffee lover';
      form.reset();
      showToast(`☕ [Demo Mode] Thank you! Simulated newsletter subscription confirmed.`);
    });
  });
}

/* ==========================================
   Favorite Heart Button Toggle
   ========================================== */
function initFavorites() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-favorite-btn');
    if (!btn) return;
    
    e.preventDefault();
    btn.classList.toggle('liked');
    const isLiked = btn.classList.contains('liked');
    const heartSvg = btn.querySelector('svg');
    if (heartSvg) {
      heartSvg.setAttribute('fill', isLiked ? '#D32F2F' : 'none');
      heartSvg.setAttribute('stroke', isLiked ? '#D32F2F' : 'currentColor');
    }

    const title = btn.closest('.product-card')?.querySelector('.product-title')?.textContent || 'item';
    if (isLiked) {
      showToast(`❤️ Added ${title} to your favorites!`);
    }
  });
}

/* ==========================================
   Hero Indicator Dots
   ========================================== */
function initHeroIndicators() {
  const dots = document.querySelectorAll('.hero-indicators .indicator-dot');
  if (!dots.length) return;

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
}

/* ==========================================
   Toast Notification Utility
   ========================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger entrance
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}
