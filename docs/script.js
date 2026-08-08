const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const countEl = document.getElementById('count');
const footerCount = document.getElementById('footer-count');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

let images = [];

// try manifest.json first, fallback to hard-coded list for resilience
async function loadImages() {
  try {
    const res = await fetch('manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('no manifest');
    const data = await res.json();
    // manifest can be { images: [...] } or [...] directly
    const list = Array.isArray(data) ? data : data.images;
    if (Array.isArray(list) && list.length) {
      // normalize to strings like "funny/xxx.jpg"
      return list.map(s => String(s).replace(/^\.\//,'').replace(/^docs\//,''));
    }
  } catch (e) {
    console.warn('manifest fetch failed, using fallback', e);
  }
  // fallback - must match actual files at deploy time. Keep in sync via scripts/sync-manifest.js (alphabetical)
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
    "funny/shoebill-yoga-lily-pad.jpg"
  ];
}

function render(list){
  grid.innerHTML = '';
  if (!list.length){
    empty.classList.remove('hidden');
    countEl.textContent = '0 shoebills';
    footerCount.textContent = '0';
    return;
  }
  empty.classList.add('hidden');
  countEl.textContent = `${list.length} shoebill${list.length===1?'':'s'}`;
  footerCount.textContent = String(list.length);

  list.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-label', `View shoebill ${i+1}: ${fileToCaption(src)}`);

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = src;
    img.alt = fileToCaption(src);
    // bust 404s quickly - hide card if missing
    img.onerror = () => {
      console.warn('missing', src);
      card.style.display = 'none';
      // update count if many missing
      const visible = [...grid.children].filter(c=>c.style.display!=='none').length;
      if(visible===0) empty.classList.remove('hidden');
    };

    const cap = document.createElement('div');
    cap.className = 'card-caption';
    cap.textContent = fileToCaption(src);

    card.appendChild(img);
    card.appendChild(cap);
    card.addEventListener('click', () => openLightbox(src));
    card.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' ') { e.preventDefault(); openLightbox(src); }
    });
    grid.appendChild(card);
  });
}

function fileToCaption(path){
  const file = path.split('/').pop() || path;
  return file.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ').replace(/\b\w/g, c=>c.toUpperCase());
}

function openLightbox(src){
  lightboxImg.src = src;
  lightboxImg.alt = fileToCaption(src);
  lightboxCaption.textContent = fileToCaption(src);
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
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
});

// also allow clicking image to close
lightboxImg.addEventListener('click', closeLightbox);

loadImages().then(list => {
  images = list;
  render(images);
});
