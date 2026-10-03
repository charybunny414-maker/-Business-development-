/**
 * BALAHOJ BHARATH KUMAR - EDITORIAL GALLERY ENGINE
 * Clean Fullscreen Viewer, Keyboard Navigation, Touch Swipe, and Category Filtering.
 */

const GALLERY_PHOTOS = [
  { src: 'IMG-20260930-WA0007.jpg', title: 'Tech Corp Headquarters — Executive Leadership' },
  { src: 'IMG-20260930-WA0012.jpg', title: 'The Vintage Presence — Classic Sedan & Aviators' },
  { src: 'IMG-20260930-WA0010.jpg', title: 'Heart of the Soil — Canal Bridge & Traditional White' },
  { src: 'IMG-20260930-WA0009.jpg', title: 'Sacred Radiance — Illuminated Temple Gopuram' },
  { src: 'IMG-20260930-WA0014.jpg', title: 'The Strategist at Ease — Al Fresco Networking' },
  { src: 'IMG-20260930-WA0015.jpg', title: 'Unwavering Focus — Horizon Strategy' },
  { src: 'IMG-20260930-WA0006.jpg', title: 'Midnight Hustle — Unstoppable Drive' },
  { src: 'IMG-20260930-WA0016.jpg', title: 'Confident Strides — Contemporary Poise' },
  { src: 'IMG-20260930-WA0008.jpg', title: 'Ancient Blessings — Temple Sanctum Entrance' },
  { src: 'IMG-20260930-WA0013.jpg', title: 'Sacred Bond — Pushkarini Sanctuary' },
  { src: 'IMG-20260930-WA0011.jpg', title: 'Terrace Vista — Skyline Night Reflections' }
];

let activeIndex = 0;
const viewerModal = document.getElementById('viewerModal');
const viewerImage = document.getElementById('viewerImage');
const viewerTitle = document.getElementById('viewerTitle');

function openGalleryViewer(index) {
  activeIndex = index;
  updateViewer();
  viewerModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryViewer() {
  viewerModal.classList.remove('active');
  document.body.style.overflow = '';
}

function nextSlide() {
  activeIndex = (activeIndex + 1) % GALLERY_PHOTOS.length;
  updateViewer();
}

function prevSlide() {
  activeIndex = (activeIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
  updateViewer();
}

function updateViewer() {
  const item = GALLERY_PHOTOS[activeIndex];
  if (!item) return;

  viewerImage.style.opacity = '0';
  viewerImage.src = item.src;
  viewerImage.alt = item.title;
  viewerImage.onload = () => {
    viewerImage.style.opacity = '1';
  };

  viewerTitle.textContent = item.title;
}

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (!viewerModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeGalleryViewer();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

// Mobile touch swipe handling
let touchOriginX = 0;
viewerModal.addEventListener('touchstart', (e) => {
  touchOriginX = e.changedTouches[0].screenX;
}, { passive: true });

viewerModal.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const delta = touchEndX - touchOriginX;
  if (Math.abs(delta) > 40) {
    if (delta < 0) nextSlide();
    else prevSlide();
  }
}, { passive: true });

// Category Filtering logic
document.addEventListener('DOMContentLoaded', () => {
  const refineBtns = document.querySelectorAll('.refine-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  refineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      refineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
});
