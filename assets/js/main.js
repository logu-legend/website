/**
 * LOGANATHAN P - Personal Portfolio
 * Core JavaScript: Navigation, Scroll Spy, Mobile Drawer & Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Dynamic Year in Footer ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Navbar Scroll Behavior ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- 3. Mobile Navigation Drawer ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    if (!mobileToggle || !mobileNav) return;
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  };

  const closeMobileNav = () => {
    if (!mobileToggle || !mobileNav) return;
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileToggle.classList.contains('is-active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Close mobile drawer on link click
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('is-open')) {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileNav();
      }
    }
  });

  // Close on Escape key press (Accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
      mobileToggle.focus();
    }
  });

  // --- 4. Section Scroll Spy ---
  const sections = document.querySelectorAll('main > section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --- 5. Interactive Accessible Contact Form Validation ---
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  const validateField = (input, errorEl, condition, errorMsg) => {
    if (condition) {
      input.classList.remove('is-invalid');
      errorEl.textContent = '';
      return true;
    } else {
      input.classList.add('is-invalid');
      errorEl.textContent = errorMsg;
      return false;
    }
  };

  // Live input error removal
  if (nameInput && emailInput && messageInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter your name (at least 2 characters).');
    });

    emailInput.addEventListener('input', () => {
      validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.');
    });

    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Please enter a message of at least 10 characters.');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      const isNameValid = validateField(nameInput, nameError, nameVal.length >= 2, 'Please enter your full name (minimum 2 characters).');
      const isEmailValid = validateField(emailInput, emailError, emailRegex.test(emailVal), 'Please enter a valid email address.');
      const isMessageValid = validateField(messageInput, messageError, messageVal.length >= 10, 'Please provide a message with at least 10 characters.');

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isMessageValid) messageInput.focus();
        return;
      }

      // Show submitting state
      submitBtn.disabled = true;
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'Opening Email Client...';

      // Prepare mailto link for genuine client dispatch
      const subject = encodeURIComponent(`Portfolio Inquiry from ${nameVal}`);
      const body = encodeURIComponent(
        `Hi Loganathan,\n\n${messageVal}\n\nFrom: ${nameVal}\nEmail: ${emailVal}`
      );
      const mailtoUrl = `mailto:pllogu58@gmail.com?subject=${subject}&body=${body}`;

      // Simulate network processing and dispatch
      setTimeout(() => {
        formFeedback.hidden = false;
        formFeedback.className = 'form-feedback is-success';
        formFeedback.innerHTML = `
          <strong>Thank you, ${escapeHtml(nameVal)}!</strong> Your message has been prepared. Opening your mail client now to deliver to <code>pllogu58@gmail.com</code>.
        `;

        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;

        // Trigger user's default email client
        window.location.href = mailtoUrl;

        // Reset form
        contactForm.reset();
      }, 700);
    });
  }

  // Utility to prevent HTML injection in feedback
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
});
