(function(){
  const cards = Array.from(document.querySelectorAll('.hiw-card'));
  if (!cards.length) return;

  const reveal = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.25 });
  cards.forEach(c => reveal.observe(c));

  const setActive = () => {
    let best = null, bestDist = Infinity;
    const mid = window.innerHeight / 2;
    cards.forEach(c=>{
      const r = c.getBoundingClientRect();
      const dist = Math.abs((r.top + r.height/2) - mid);
      if (dist < bestDist){ bestDist = dist; best = c; }
    });
    cards.forEach(c => c.setAttribute('aria-current', String(c===best)));
  };
  setActive();
  window.addEventListener('scroll', setActive, { passive:true });
  window.addEventListener('resize', setActive);
})();
