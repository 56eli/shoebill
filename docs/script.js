const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

let images = [];

// load from manifest.json (generated from docs/funny + docs/placeholder)
// fallback is hard-coded 20 to survive 404s — keep in sync via scripts/sync-manifest.js
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
    "funny/shoebill-barista-espresso-fail.jpg",
    "funny/shoebill-bathtub-rubber-ducks.jpg",
    "funny/shoebill-beach-float-sunscreen.jpg",
    "funny/shoebill-detective-noir-frog.jpg",
    "funny/shoebill-librarian-shush.jpg",
    "funny/shoebill-manager-flamingo-review.jpg",
    "funny/shoebill-selfie-duckface.jpg",
    "funny/shoebill-sushi-chef-chaos.jpg",
    "funny/shoebill-tiny-bicycle-wobble.jpg",
    "funny/shoebill-yoga-lily-pad.jpg",
    "placeholder/shoebill-astronaut-moon.jpg",
    "placeholder/shoebill-bbq-grill-apron.jpg",
    "placeholder/shoebill-boxing-gloves-ring.jpg",
    "placeholder/shoebill-construction-hardhat.jpg",
    "placeholder/shoebill-dj-rave-laser.jpg",
    "placeholder/shoebill-graduation-cap-toss.jpg",
    "placeholder/shoebill-magician-hat-rabbit.jpg",
    "placeholder/shoebill-shopping-cart-supermarket.jpg",
    "placeholder/shoebill-spa-cucumber-mask.jpg",
    "placeholder/shoebill-wedding-suit-flower.jpg"
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
