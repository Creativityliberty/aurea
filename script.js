/* AURÉA — navigation, video accessibility, motion controls, live studio clock, and scroll animations. */
(() => {
  const header = document.getElementById('site-header');
  const menuButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const video = document.getElementById('hero-video');
  const motionButton = document.getElementById('motion-toggle');
  const motionLabel = motionButton?.querySelector('.motion-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByUser = false;

  // Header scroll detection
  const refreshHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 34);
  refreshHeader();
  window.addEventListener('scroll', refreshHeader, { passive: true });

  // Mobile menu open/close
  const setMenu = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    mobileMenu?.classList.toggle('is-open', open);
    if (mobileMenu) mobileMenu.inert = !open;
    header?.classList.toggle('menu-is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) setMenu(false);
  });

  // Video controls
  const syncMotionButton = () => {
    if (!motionButton || !motionLabel || !video) return;
    const paused = video.paused || reducedMotion.matches;
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Reprendre la vidéo' : 'Mettre la vidéo en pause');
    motionLabel.textContent = paused ? 'LECTURE' : 'PAUSE';
  };

  const applyMotionPreference = () => {
    if (!video) return;
    if (reducedMotion.matches || pausedByUser) {
      video.pause();
    } else {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') playAttempt.catch(syncMotionButton);
    }
    syncMotionButton();
  };

  motionButton?.addEventListener('click', () => {
    if (!video) return;
    pausedByUser = !video.paused;
    if (pausedByUser) video.pause();
    else if (!reducedMotion.matches) video.play().catch(syncMotionButton);
    syncMotionButton();
  });

  video?.addEventListener('play', syncMotionButton);
  video?.addEventListener('pause', syncMotionButton);
  reducedMotion.addEventListener?.('change', applyMotionPreference);
  applyMotionPreference();

  // Live Studio Clock (Paris Time CET / CEST)
  const timeElem = document.getElementById('studio-time');
  const updateStudioTime = () => {
    if (!timeElem) return;
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    timeElem.textContent = `${formatter.format(now)} CET`;
  };
  updateStudioTime();
  setInterval(updateStudioTime, 1000);

  // Reveal elements on scroll (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Consultation Form interactive submission feedback
  const consultationForm = document.getElementById('consultation-form');
  const formStatus = document.getElementById('form-status');
  if (consultationForm && formStatus) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultationForm.querySelector('.form-submit');
      if (submitBtn) {
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.style.opacity = '0.7';
      }
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Votre demande a été transmise avec succès. Notre atelier prendra contact sous 48 heures.';
      consultationForm.reset();
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.removeAttribute('disabled');
          submitBtn.style.opacity = '1';
        }
      }, 4000);
    });
  }
})();
