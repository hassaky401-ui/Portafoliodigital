(function() {
  'use strict';

  // Helpers
  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  // Modal video
  var modal = $('#videoModal');
  var modalVideo = $('#modalVideo');
  var closeModal = $('#closeModal');

  function openVideo(src) {
    if (!modalVideo || !modal) return;
    modalVideo.src = src;
    modal.setAttribute('aria-hidden', 'false');
    try {
      modalVideo.play();
    } catch (e) {
      console.log('Autoplay bloqueado');
    }
  }

  function closeVideo() {
    if (!modal || !modalVideo) return;
    modal.setAttribute('aria-hidden', 'true');
    modalVideo.pause();
    modalVideo.src = '';
  }

  // Event listeners para botones de video
  var videoButtons = $$('[data-video]');
  videoButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var src = this.getAttribute('data-video');
      openVideo(src);
    });
  });

  // Cerrar modal
  if (closeModal) {
    closeModal.addEventListener('click', closeVideo);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeVideo();
      }
    });
  }

  // Smooth scroll nav links
  var navLinks = $$('.nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Corner person toggle
  var cornerPerson = $('#cornerPerson');
  var cornerToggle = $('#cornerToggle');

  if (cornerToggle && cornerPerson) {
    cornerToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var hidden = cornerPerson.getAttribute('aria-hidden') === 'true';
      var newHidden = hidden ? 'false' : 'true';
      cornerPerson.setAttribute('aria-hidden', newHidden);
      cornerPerson.style.opacity = hidden ? '1' : '0.3';
      cornerPerson.style.pointerEvents = hidden ? 'auto' : 'none';
    });
  }

  // ESC key close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeVideo();
    }
  });

})();