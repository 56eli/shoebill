const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

let images = [];

// load from manifest.json (generated from docs/funny/ only — placeholder deleted 2026-08-08)
// sorted oldest-first by file mtime (ascending); alphabetical tiebreaker when mtimes match
// fallback hard-coded 80 — keep in sync via scripts/sync-manifest.js
async function loadImages() {
  try {
    const res = await fetch('manifest.json');
    if (!res.ok) throw new Error('no manifest');
    const data = await res.json();
    let list = Array.isArray(data) ? data : data.images;
    if (Array.isArray(list) && list.length) {
      // Support both {src, mtime} objects and plain string arrays
      if (typeof list[0] === 'object' && list[0].src) {
        // Sort oldest-first by mtime (ascending); stable — preserves name order on tie
        list = list.slice().sort((a, b) => {
          const ma = a.mtime ?? Infinity;
          const mb = b.mtime ?? Infinity;
          if (ma !== mb) return ma - mb; // oldest first
          return String(a.src).localeCompare(String(b.src));
        });
        return list.map(s => String(s.src).replace(/^\.\//,'').replace(/^docs\//,''));
      }
      // Plain string array — already sorted by sync-manifest.js; just clean paths
      return list.map(s => String(s).replace(/^\.\//,'').replace(/^docs\//,''));
    }
  } catch (e) {
    console.warn('manifest fetch failed, using fallback', e);
  }
  // Fallback: oldest-first by mtime (ascending), alphabetical tiebreaker
  // Keep in sync with manifest.json via scripts/sync-manifest.js
  // Run: node scripts/sync-manifest.js  then copy the images array into this fallback
  return [
    "funny/shoebill-archaeologist-dino-bones.jpg",
    "funny/shoebill-archery-target-bullseye.jpg",
    "funny/shoebill-astronaut-moon.jpg",
    "funny/shoebill-astronomer-stargazer-charts.jpg",
    "funny/shoebill-astronomer-telescope-stargazing.jpg",
    "funny/shoebill-astronomy-telescope.jpg",
    "funny/shoebill-barber-straight-razor.jpg",
    "funny/shoebill-barista-espresso-fail.jpg",
    "funny/shoebill-bathtub-rubber-ducks.jpg",
    "funny/shoebill-bbq-grill-apron.jpg",
    "funny/shoebill-beach-float-sunscreen.jpg",
    "funny/shoebill-beekeeper-protective-suit-honey.jpg",
    "funny/shoebill-blacksmith-anvil-hammer.jpg",
    "funny/shoebill-blacksmith-sword-quench.jpg",
    "funny/shoebill-bowling-strike-alley.jpg",
    "funny/shoebill-boxing-gloves-ring.jpg",
    "funny/shoebill-bullfighter-cape.jpg",
    "funny/shoebill-carpenter-workbench-saw.jpg",
    "funny/shoebill-chemist-color-flasks.jpg",
    "funny/shoebill-chess-grandmaster.jpg",
    "funny/shoebill-circus-ape.jpg",
    "funny/shoebill-conductor-steam-train.jpg",
    "funny/shoebill-construction-hardhat.jpg",
    "funny/shoebill-curling-stone-broom.jpg",
    "funny/shoebill-deep-sea-diver-submersible.jpg",
    "funny/shoebill-dentist-chair-drill.jpg",
    "funny/shoebill-detective-magnifying-clue.jpg",
    "funny/shoebill-detective-noir-frog.jpg",
    "funny/shoebill-disco-skater-quads.jpg",
    "funny/shoebill-dj-rave-laser.jpg",
    "funny/shoebill-dog-walker-leashes-park.jpg",
    "funny/shoebill-farmer-tractor-hat.jpg",
    "funny/shoebill-fencer-epee-mask.jpg",
    "funny/shoebill-firefighter-hero.jpg",
    "funny/shoebill-florist-bouquet-ribbon.jpg",
    "funny/shoebill-gamer-stream-rgb.jpg",
    "funny/shoebill-gardener-bonsai-shears.jpg",
    "funny/shoebill-geologist-rock-hammer.jpg",
    "funny/shoebill-glassblower-molten-vase.jpg",
    "funny/shoebill-graduation-cap-toss.jpg",
    "funny/shoebill-harpist-classical-concert.jpg",
    "funny/shoebill-ice-sculptor-chainsaw-swan.jpg",
    "funny/shoebill-karate-black-belt-brick.jpg",
    "funny/shoebill-librarian-shush.jpg",
    "funny/shoebill-lifeguard-tower-whistle.jpg",
    "funny/shoebill-lighthouse-keeper.jpg",
    "funny/shoebill-magician-escape-artist.jpg",
    "funny/shoebill-magician-hat-rabbit.jpg",
    "funny/shoebill-mail-carrier-letters.jpg",
    "funny/shoebill-manager-flamingo-review.jpg",
    "funny/shoebill-maya-temple.jpg",
    "funny/shoebill-meteorologist-weather-map.jpg",
    "funny/shoebill-motorcycle-helmet.jpg",
    "funny/shoebill-ninja-katana-dojo.jpg",
    "funny/shoebill-orchestra-conductor-baton.jpg",
    "funny/shoebill-painter-easel-beret.jpg",
    "funny/shoebill-pancake-breakfast-syrup.jpg",
    "funny/shoebill-pastry-chef-croissant.jpg",
    "funny/shoebill-pilot-airplane-cockpit.jpg",
    "funny/shoebill-pilot-helicopter-headset.jpg",
    "funny/shoebill-pirate-parrot-lookout.jpg",
    "funny/shoebill-pizza-chef-toss.jpg",
    "funny/shoebill-potter-tea-ceremony.jpg",
    "funny/shoebill-pottery-wheel-messy-clay.jpg",
    "funny/shoebill-rockstar-guitar-solo.jpg",
    "funny/shoebill-roller-coaster-front-seat.jpg",
    "funny/shoebill-rower-scull-misty-lake.jpg",
    "funny/shoebill-safari-tour-guide-binoculars.jpg",
    "funny/shoebill-samurai-armor-cherry-blossom.jpg",
    "funny/shoebill-scientist-lab-goggles.jpg",
    "funny/shoebill-scuba-diver-coral-reef.jpg",
    "funny/shoebill-sculptor-marble-chisel.jpg",
    "funny/shoebill-selfie-duckface.jpg",
    "funny/shoebill-sheriff-badge.jpg",
    "funny/shoebill-shopping-cart-supermarket.jpg",
    "funny/shoebill-skiing-snow-slopes.jpg",
    "funny/shoebill-sommelier-wine-glass.jpg",
    "funny/shoebill-spa-cucumber-mask.jpg",
    "funny/shoebill-subway-commuter-newspaper.jpg",
    "funny/shoebill-sushi-chef-chaos.jpg",
    "funny/shoebill-tailor-measuring-tape-suit.jpg",
    "funny/shoebill-tiny-bicycle-wobble.jpg",
    "funny/shoebill-traffic-cop-whistle-vest.jpg",
    "funny/shoebill-ultimate-frisbee.jpg",
    "funny/shoebill-watchmaker-magnifier-gears.jpg",
    "funny/shoebill-wedding-suit-flower.jpg",
    "funny/shoebill-welder-spark-mask.jpg",
    "funny/shoebill-windsurfer.jpg",
    "funny/shoebill-woodchopper-flannel-axe.jpg",
    "funny/shoebill-yoga-lily-pad.jpg",
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
  document.documentElement.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox(){
  lightbox.classList.add('hidden');
  lightboxImg.removeAttribute('src');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

// Lightbox click outside or close button
lightbox.addEventListener('click', (e)=>{
  if(e.target===lightbox || e.target.classList.contains('lightbox-bg')) closeLightbox();
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
});
lightboxImg.addEventListener('click', closeLightbox);

// Touch gesture support on mobile: swipe down/up or tap to dismiss
let touchStartY = 0;
let touchStartX = 0;

lightbox.addEventListener('touchstart', (e)=>{
  if (e.touches.length === 1) {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }
}, { passive: true });

lightbox.addEventListener('touchend', (e)=>{
  if (e.changedTouches.length === 1) {
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    // swipe vertically > 60px dismisses lightbox
    if (Math.abs(deltaY) > 60 && Math.abs(deltaY) > Math.abs(deltaX)) {
      closeLightbox();
    }
  }
}, { passive: true });

loadImages().then(list => {
  images = list;
  render(images);
});
