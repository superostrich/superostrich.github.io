
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function closeLightbox() {
  lightbox.style.display = 'none';

  lightboxImage.hidden = true;

  lightboxVideo.pause();
  lightboxVideo.src = '';
  lightboxVideo.hidden = true;
}

document.addEventListener('click', e => {
  const videoLink = e.target.closest('a.lightbox-video');
  const img = e.target.closest('.gallery img, .preview img, img.thumb');

  // VIDEO
  if (videoLink) {
    e.preventDefault();

    lightboxImage.hidden = true;

    lightboxVideo.src = videoLink.href;
    lightboxVideo.hidden = false;

    lightbox.style.display = 'flex';
    return;
  }

  // IMAGE (unchanged behavior)
  if (!img) return;

  lightboxVideo.hidden = true;
  lightboxVideo.pause();

  lightboxImage.hidden = false;
  lightboxImage.src = img.src;

  lightbox.style.display = 'flex';
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.style.display === 'flex') {
    closeLightbox();
  }
});