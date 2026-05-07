// Animação de revelação ao rolar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));

  // Efeito parallax suave nos orbes do hero
  const heroSection = document.querySelector('.artisanal-gradient');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < 800) {
        heroSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
      }
    }, { passive: true });
  }