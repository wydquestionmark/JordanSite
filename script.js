"use strict";
const lightbox=document.getElementById('lightbox');const lightboxImage=document.getElementById('lightbox-image');const closeButton=document.getElementById('lightbox-close');let previousFocus=null;
function openLightbox(button){previousFocus=document.activeElement;const image=button.querySelector('img');lightboxImage.src=button.dataset.full||image.src;lightboxImage.alt=image.alt;lightbox.hidden=false;document.body.classList.add('modal-open');closeButton.focus();}
function closeLightbox(){if(lightbox.hidden)return;lightbox.hidden=true;document.body.classList.remove('modal-open');lightboxImage.removeAttribute('src');previousFocus?.focus();}
document.querySelectorAll('.art').forEach(button=>button.addEventListener('click',()=>openLightbox(button)));closeButton.addEventListener('click',closeLightbox);lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});document.addEventListener('keydown',event=>{if(lightbox.hidden)return;if(event.key==='Escape')closeLightbox();if(event.key==='Tab'){event.preventDefault();closeButton.focus()}});
const stats = [...document.querySelectorAll('.stat-number')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const format = new Intl.NumberFormat('en-US');
let generation = 0;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function countTo(element, target, duration, cycle) {
  return new Promise(resolve => {
    const start = performance.now();
    function tick(now) {
      if (cycle !== generation || reduceMotion.matches) return resolve();
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format.format(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else { element.textContent = format.format(target); resolve(); }
    }
    requestAnimationFrame(tick);
  });
}

async function animateStats() {
  const cycle = ++generation;
  if (reduceMotion.matches) {
    stats.forEach(el => el.textContent = format.format(Number(el.dataset.target)));
    return;
  }
  while (cycle === generation && !reduceMotion.matches) {
    stats.forEach(el => el.textContent = '0');
    await sleep(250);
    if (cycle !== generation) break;
    // Random start times, independent of the visual order of the labels.
    const starts = stats.map(() => Math.random() * 2200);
    await Promise.all(stats.map(async (el, index) => {
      await sleep(starts[index]);
      if (cycle !== generation || reduceMotion.matches) return;
      await countTo(el, Number(el.dataset.target), 700 + Math.random() * 450, cycle);
    }));
    if (cycle !== generation) break;
    await sleep(5000);
  }
}
reduceMotion.addEventListener('change', () => {
  generation++;
  if (reduceMotion.matches) stats.forEach(el => el.textContent = format.format(Number(el.dataset.target)));
  else animateStats();
});
animateStats();


// Swap the lower-left Jordan still for its video on hover or keyboard focus.
// Mouse exit / blur restores the still and rewinds the clip.
document.querySelectorAll('.video-art').forEach(videoArt => {
  const video = videoArt.querySelector('video');
  let requested = false;
  function startVideo() {
    if (reduceMotion.matches) return;
    requested = true;
    const playRequest = video.play();
    if (playRequest && typeof playRequest.then === 'function') {
      playRequest.then(() => { if (requested) videoArt.classList.add('is-playing'); else video.pause(); }).catch(() => {});
    } else { videoArt.classList.add('is-playing'); }
  }
  function stopVideo() {
    requested = false;
    videoArt.classList.remove('is-playing');
    video.pause();
    video.currentTime = 0;
  }
  videoArt.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') startVideo(); });
  videoArt.addEventListener('pointerleave', stopVideo);
  videoArt.addEventListener('focus', startVideo);
  videoArt.addEventListener('blur', stopVideo);
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) stopVideo(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopVideo(); });
});
