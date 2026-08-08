const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

let images = [];

// load from manifest.json (generated from docs/funny/ only — placeholder deleted 2026-08-08)
// fallback hard-coded 30 — keep in sync via scripts/sync-manifest.js
async function loadImages() {
  try {
    const res = await fetch('manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('no manifest');
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.images;
    if (Array.isArray(list) && list.length) {
      return list.map(s => String(s).replace(/^\.\//,'').replace(/^docs\//,''));
    }
  } catch (e) {
    console.warn('manifest fetch failed, using fallback', e);
  }
  return [
    "funny/shoebill-astronaut-moon.jpg",
    "funny/shoebill-barista-espresso-fail.jpg",
    "funny/shoebill-bathtub-rubber-ducks.jpg",
    "funny/shoebill-bbq-grill-apron.jpg",
    "funny/shoebill-beach-float-sunscreen.jpg",
    "funny/shoebill-bowling-strike-alley.jpg",
    "funny/shoebill-boxing-gloves-ring.jpg",
    "funny/shoebill-construction-hardhat.jpg",
    "funny/shoebill-dentist-chair-drill.jpg",
    "funny/shoebill-detective-noir-frog.jpg",
    "funny/shoebill-disco-skater-quads.jpg",
    "funny/shoebill-dj-rave-laser.jpg",
    "funny/shoebill-farmer-tractor-hat.jpg",
    "funny/shoebill-firefighter-hero.jpg",
    "funny/shoebill-gamer-stream-rgb.jpg",
    "funny/shoebill-gardener-bonsai-shears.jpg",
    "funny/shoebill-graduation-cap-toss.jpg",
    "funny/shoebill-librarian-shush.jpg",
    "funny/shoebill-magician-hat-rabbit.jpg",
    "funny/shoebill-mail-carrier-letters.jpg",
    "funny/shoebill-manager-flamingo-review.jpg",
    "funny/shoebill-ninja-katana-dojo.jpg",
    "funny/shoebill-orchestra-conductor-baton.jpg",
    "funny/shoebill-painter-easel-beret.jpg",
    "funny/shoebill-pancake-breakfast-syrup.jpg",
    "funny/shoebill-pilot-airplane-cockpit.jpg",
    "funny/shoebill-pirate-parrot-lookout.jpg",
    "funny/shoebill-pizza-chef-toss.jpg",
    "funny/shoebill-rockstar-guitar-solo.jpg",
    "funny/shoebill-roller-coaster-front-seat.jpg",
    "funny/shoebill-scientist-lab-goggles.jpg",
    "funny/shoebill-scuba-diver-coral-reef.jpg",
    "funny/shoebill-selfie-duckface.jpg",
    "funny/shoebill-shopping-cart-supermarket.jpg",
    "funny/shoebill-skiing-snow-slopes.jpg",
    "funny/shoebill-spa-cucumber-mask.jpg",
    "funny/shoebill-sushi-chef-chaos.jpg",
    "funny/shoebill-tiny-bicycle-wobble.jpg",
    "funny/shoebill-wedding-suit-flower.jpg",
    "funny/shoebill-yoga-lily-pad.jpg"
  ];
}

function render(list){
  grid.innerHTML = '';
  if (!list.length){
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  list.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-label', `View shoebill ${i+1}`);

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = src;
    img.alt = `shoebill ${i+1}`;
    img.onerror = () => {
      card.style.display = 'none';
      const visible = [...grid.children].filter(c=>c.style.display!=='none').length;
      if(visible===0) empty.classList.remove('hidden');
    };

    card.appendChild(img);
    card.addEventListener('click', () => openLightbox(src));
    card.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' ') { e.preventDefault(); openLightbox(src); }
    });
    grid.appendChild(card);
  });
}

function openLightbox(src){
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}
function closeLightbox(){
  lightbox.classList.add('hidden');
  lightboxImg.removeAttribute('src');
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', (e)=>{
  if(e.target===lightbox || e.target.classList.contains('lightbox-bg')) closeLightbox();
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
});
lightboxImg.addEventListener('click', closeLightbox);

loadImages().then(list => {
  images = list;
  render(images);
});
