/* Enhanced Dark/Light Mode Theme Switcher with Persistence */

// -------------------------
// Theme Management System
// -------------------------

const ThemeManager = {
  // Get saved theme from localStorage or system preference
  getSavedTheme() {
    const saved = localStorage.getItem('theme-preference');
    if (saved) return saved;
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  // Apply theme to document
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme-preference', theme);
    
    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f0f' : '#ffffff');
    }
  },

  // Toggle between themes
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }));
  },

  // Initialize theme
  init() {
    const theme = this.getSavedTheme();
    this.applyTheme(theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme-preference')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});

// -------------------------
// Image Lazy Loading
// -------------------------

const ImageLazyLoader = {
  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Remove loading class
            img.classList.remove('loading');
            img.classList.add('loaded');
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all lazy-load images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ImageLazyLoader.init();
});

// -------------------------
// Performance: Network Status Detection
// -------------------------

const NetworkStatus = {
  init() {
    // Detect if user is online/offline
    window.addEventListener('online', () => {
      console.log('Network: Online');
      this.showNotification('You are back online!', 'success');
    });

    window.addEventListener('offline', () => {
      console.log('Network: Offline');
      this.showNotification('You are offline. Some features may not work.', 'warning');
    });
  },

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#4caf50' : '#ff9800'};
      color: white;
      border-radius: 8px;
      font-size: 14px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
  }
};

NetworkStatus.init();

// -------------------------
// Performance: Preload Critical Resources
// -------------------------

function preloadCriticalResources() {
  // Preload fonts
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Space+Grotesk:wght@600;700&display=swap';
  link.crossOrigin = true;
  document.head.appendChild(link);
}

document.addEventListener('DOMContentLoaded', preloadCriticalResources);

// -------------------------
// Analytics Helper (Ready for Google Analytics)
// -------------------------

const Analytics = {
  init() {
    // Track page views
    this.trackPageView();
    
    // Track button clicks
    this.trackButtonClicks();
    
    // Track form submissions
    this.trackFormSubmissions();
  },

  trackPageView() {
    // Google Analytics code would go here
    console.log('Page view tracked:', window.location.pathname);
  },

  trackButtonClicks() {
    document.querySelectorAll('button, a[role="button"]').forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('Button clicked:', btn.textContent.trim());
      });
    });
  },

  trackFormSubmissions() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', () => {
        console.log('Form submitted:', form.id || form.name);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Analytics.init();
});

// -------------------------
// Accessibility: Focus Management
// -------------------------

const AccessibilityManager = {
  init() {
    // Track focus for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    // Remove keyboard nav indicator on mouse
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    // Skip to main content link
    this.addSkipToMainLink();
  },

  addSkipToMainLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      left: -9999px;
      z-index: 999;
    `;
    skipLink.addEventListener('focus', () => {
      skipLink.style.left = '0';
      skipLink.style.top = '0';
      skipLink.style.position = 'fixed';
      skipLink.style.padding = '10px';
      skipLink.style.background = 'var(--accent)';
      skipLink.style.color = 'white';
      skipLink.style.textDecoration = 'none';
      skipLink.style.borderRadius = '4px';
    });
    skipLink.addEventListener('blur', () => {
      skipLink.style.left = '-9999px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AccessibilityManager.init();
});

// -------------------------
// Performance: Reduce Repaints with RequestAnimationFrame
// -------------------------

function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Any scroll-based logic here
      ticking = false;
    });
    ticking = true;
  }
});
