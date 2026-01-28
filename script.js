const faders = document.querySelectorAll('.fade');

window.addEventListener('scroll', () => {
  faders.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
});

const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

images.forEach(img => {
  img.onclick = () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  };
});

lightbox.onclick = () => {
  lightbox.style.display = 'none';
};
