/* Ted Klarich · Fairway Home Mortgage — shared behavior
   Scroll reveals, mobile menu, FAQ accordion, contact form handoff. */
(function () {
  'use strict';

  /* --- Scroll reveal --- */
  var revealTargets = document.querySelectorAll('.fade-up, .q-stack .q');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Mobile menu --- */
  var menu = document.querySelector('.mobile-menu');
  var toggle = document.querySelector('.menu-toggle');
  if (menu && toggle) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* --- Contact form ---
     No backend is wired up yet. Until one is (see README), the form opens the
     visitor's email client with everything they typed already filled in, so no
     lead is ever silently dropped. Replace this handler with a real POST once
     a form endpoint or CRM webhook is chosen. */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      data.forEach(function (value, key) {
        if (String(value).trim() !== '') {
          lines.push(key.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }) + ': ' + value);
        }
      });
      var to = form.getAttribute('data-email') || '';
      var subject = 'Website inquiry from ' + (data.get('name') || 'a visitor');
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      var note = document.getElementById('form-status');
      if (note) {
        note.textContent = 'Opening your email app with this message ready to send. ' +
          'Prefer to talk? Call or text (206) 401-1878.';
        note.style.display = 'block';
      }
    });
  }

  /* --- Footer year --- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
