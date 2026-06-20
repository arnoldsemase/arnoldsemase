
   // -------------------------
    // DOM refs
    // -------------------------
    const header = document.getElementById('site-header');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.getElementById('mobilePanel') || document.getElementById('mobilePanel');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    

    // -------------------------
    // Navbar scroll behavior & active link highlight
    // -------------------------
    window.addEventListener('scroll', () => {
      const hdr = document.getElementById('site-header');
      if (window.scrollY > 30) hdr.classList.add('scrolled');
      else hdr.classList.remove('scrolled');
document.querySelectorAll('nav.primary a[data-nav]').forEach(link => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) link.classList.add('active');
        else link.classList.remove('active');
      });
    });

    // -------------------------
    // Mobile panel open/close
    // -------------------------
    const panel = document.getElementById('mobilePanel') || document.querySelector('.mobile-panel');
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        if (!panel.classList.contains('show')) {
          panel.classList.add('show');
          panel.style.right = '0';
          panel.setAttribute('aria-hidden', 'false');
        } else {
          panel.classList.remove('show');
          panel.style.right = '-100%';
          panel.setAttribute('aria-hidden', 'true');
        }
      }
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        if (panel) { panel.classList.remove('show'); panel.style.right = '-100%'; panel.setAttribute('aria-hidden','true'); }
        if (hamburger) hamburger.setAttribute('aria-expanded','false');
      });
    }
    mobileLinks.forEach(a => {
      a.addEventListener('click', () => {
        if (panel) { panel.classList.remove('show'); panel.style.right = '-100%'; panel.setAttribute('aria-hidden','true'); }
        if (hamburger) hamburger.setAttribute('aria-expanded','false');
      });
    });
    document.addEventListener('click', (e) => {
      if (panel && panel.classList.contains('show') && !panel.contains(e.target) && !hamburger.contains(e.target)) {
        panel.classList.remove('show'); panel.style.right = '-100%'; panel.setAttribute('aria-hidden','true');
        if (hamburger) hamburger.setAttribute('aria-expanded','false');
      }
    });

 

     document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (panel && panel.classList.contains('show')) {
              panel.classList.remove('show'); panel.style.right = '-100%'; panel.setAttribute('aria-hidden','true');
              if (hamburger) hamburger.setAttribute('aria-expanded','false');
            }
          }
        }
      });
    });

    
    if (hamburger) hamburger.addEventListener('keyup', (e) => { if (e.key === 'Enter') hamburger.click(); });

    
    window.dispatchEvent(new Event('scroll'));
    
    
    
    
    
    
    
    const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close-btn');


// Open modal
openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});



const contactBtn = document.getElementById("contactBtn");
const aboutSection = document.getElementById("about");
const contactSection = document.getElementById("contact");
const contactModal = document.querySelector(".modal"); // make sure this matches your modal

function isModalOpen() {
  // Checks if modal has computed display not equal to "none"
  return window.getComputedStyle(modal).display !== "none";
}

function toggleContactBtn() {
  const aboutTop = aboutSection.getBoundingClientRect().top;
  const contactTop = contactSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (!isModalOpen() && aboutTop < windowHeight * 0.8 && contactTop > windowHeight * 0.5) {
    contactBtn.classList.add("show");
  } else {
    contactBtn.classList.remove("show");
  }
}

// Scroll listener
window.addEventListener("scroll", toggleContactBtn);

// Also check on resize in case layout changes
window.addEventListener("resize", toggleContactBtn);

// Check every time modal opens/closes
const observer = new MutationObserver(toggleContactBtn);
observer.observe(modal, { attributes: true, attributeFilter: ["style", "class"] });

// Initial check
toggleContactBtn();




async function getIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}


//Submit
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // ✅ CHECK RECAPTCHA FIRST
  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse || captchaResponse.length === 0) {
    alert("Please confirm you are not a robot.");
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;

  // Dynamic messages array
  const messages = ["Please wait...", "Almost done...", "Sending final touches..."];
  let index = 0;

  // Change button text every 2 second
  const interval = setInterval(() => {
    submitBtn.textContent = messages[index % messages.length];
    index++;
  }, 2000);

  try {
    const ip = await getIP();

const payload = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  message: document.getElementById("message").value,
  ip: ip,
  captcha: captchaResponse   
};

    const res = await fetch("https://script.google.com/macros/s/AKfycbzE9O3pMb6fDV956qad-oW64lY79-A8K-TFEivRVsLRJCQPpmFNm38eAp16rFV8NmMi1A/exec", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.status === "success") {
      document.querySelector("#status").textContent = "Message sent successfully!";
      document.getElementById("contactForm").reset();
      grecaptcha.reset();
    } else {
      alert("Error: " + result.message);
    }

  } catch (err) {
    console.error(err);
    alert("An error occurred while sending your message.");
  } finally {
    clearInterval(interval);           // stop changing text
    submitBtn.disabled = false;        // re-enable button
    submitBtn.textContent = originalText; // restore original text
  }
});

