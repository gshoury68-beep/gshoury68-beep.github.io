document.getElementById('year').textContent = new Date().getFullYear();

// NAV TOGGLE
(function(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const open = nav.classList.toggle('open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

// CALENDLY — inline widget + fallback
const CALENDLY = { url: 'https://calendly.com/gshoury68/30min' };
(function initBooking(){
  const quick = document.getElementById('calendly-quick-link');
  const inlineHolder = document.getElementById('calendly-inline');
  if(!inlineHolder || !quick) return;
  if(CALENDLY.url && CALENDLY.url.indexOf('YOUR_CALENDLY_USERNAME') === -1){
    quick.href = CALENDLY.url; quick.textContent = 'Open booking page';
    inlineHolder.innerHTML = `<div class="calendly-inline-widget" data-url="${CALENDLY.url}" style="min-width:320px;height:680px;"></div>`;
    if(!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')){
      const s = document.createElement('script'); s.src='https://assets.calendly.com/assets/external/widget.js'; s.async=true; document.body.appendChild(s);
    }
  } else {
    quick.href = '#'; quick.textContent = 'Booking not configured';
    inlineHolder.innerHTML = '<p style="color:var(--muted)">Booking link not configured. Edit assets/script.js to add your Calendly URL.</p>';
  }

  ['book-intro','book-tech'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('click', (e)=>{ e.preventDefault(); if(CALENDLY.url.indexOf('YOUR_CALENDLY_USERNAME')===-1){ window.open(CALENDLY.url,'_blank','noopener'); } else { alert('Booking not configured'); } });
  });
})();

// VIDEO MODAL (re-usable)
(function createVideoModal(){
  const modal = document.createElement('div'); modal.id='video-modal';
  modal.style='position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(11,19,32,0.6);z-index:9999;';
  modal.innerHTML = `<div style="background:#fff;width:min(1100px,96%);border-radius:10px;padding:1rem;position:relative;">
    <div id="modal-close" style="position:absolute;right:12px;top:8px;cursor:pointer;font-weight:700">✕</div>
    <div id="video-container" style="min-height:300px;"></div>
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });
  modal.querySelector('#modal-close').addEventListener('click', closeModal);
  window.openVideo = function(yid){ const container = document.getElementById('video-container'); container.innerHTML = `<div style="position:relative;padding-top:56.25%"><iframe src="https://www.youtube.com/embed/${yid}" style="position:absolute;left:0;top:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe></div>`; modal.style.display='flex'; };
  function closeModal(){ const modal = document.getElementById('video-modal'); modal.style.display='none'; const c=document.getElementById('video-container'); if(c) c.innerHTML=''; }
})();

// COOKIE CONSENT (simple) + Plausible analytics loader
(function cookieConsent(){
  const key = 'tradelearn_cookie_consent';
  if(localStorage.getItem(key)){
    // if accepted and analytics enabled, initialize analytics
    if(localStorage.getItem(key) === 'accepted'){
      initAnalytics();
    }
    return;
  }
  const banner = document.createElement('div'); banner.className = 'cookie-banner';
  banner.innerHTML = `<p>We use cookies to improve your experience and for analytics. By continuing you accept our <a href="privacy.html">Privacy Policy</a>.</p>
    <div class="cookie-actions"><button id="cookie-accept" class="btn">Accept</button><button id="cookie-dismiss" class="btn" style="background:transparent;border:1px solid rgba(255,255,255,0.08)">Manage</button></div>`;
  document.body.appendChild(banner);
  document.getElementById('cookie-accept').addEventListener('click', function(){
    localStorage.setItem(key,'accepted'); banner.remove(); initAnalytics();
  });
  document.getElementById('cookie-dismiss').addEventListener('click', function(){ banner.remove(); localStorage.setItem(key,'dismissed'); });

  // Plausible analytics loader (privacy-first) — replace DATA_DOMAIN when you setup Plausible
  function initAnalytics(){
    try{
      if(window.__plausible_loaded) return;
      window.__plausible_loaded = true;
      const script = document.createElement('script');
      // TODO: replace 'YOUR_PLAUSIBLE_DOMAIN' with your actual domain (e.g. 'example.com')
      script.src = 'https://plausible.io/js/plausible.js';
      script.async = true; script.defer = true; script.setAttribute('data-domain','YOUR_PLAUSIBLE_DOMAIN');
      document.head.appendChild(script);
    }catch(e){console.warn('analytics failed',e)}
  }
})();

// click handler for inline Calendly links (open in new window)
document.addEventListener('click', function(e){
  var el = e.target;
  if(el.tagName === 'A' && el.href && el.href.indexOf('calendly.com') !== -1){
    window.open(el.href, '_blank', 'noopener');
  }
});
