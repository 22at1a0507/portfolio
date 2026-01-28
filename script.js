const themeToggle = document.getElementById('themeToggle');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item');
const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.header nav');

const galleryData = [
  {
    src: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Pencil Art',
    desc: 'Creating detailed portrait drawings and sketches with pencils'
  },
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Music Lover',
    desc: 'Curating playlists and discovering new artists across genres'
  },
  {
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Programming',
    desc: 'Building projects and solving complex algorithmic problems'
  },
  {
    src: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Reading',
    desc: 'Exploring tech books and fiction novels in my free time'
  },
  {
    src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Sketchbook',
    desc: 'My creative space where ideas come to life through pencil art'
  },
  {
    src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Musical Journey',
    desc: 'Exploring different instruments and musical compositions'
  }
];

let currentImageIndex = 0;

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initScrollAnimations() {
  const faders = document.querySelectorAll('.fade');
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  
  faders.forEach(fader => appearOnScroll.observe(fader));
}

function initLightbox() {
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox(index);
    });
  });
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  });
  
  lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    updateLightboxContent();
  });
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxContent();
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function updateLightboxContent() {
  const data = galleryData[currentImageIndex];
  lightboxImg.src = data.src;
  lightboxTitle.textContent = data.title;
  lightboxDesc.textContent = data.desc;
}

function initMobileMenu() {
  if (!menuToggle || !headerNav) return;
  
  menuToggle.addEventListener('click', () => {
    headerNav.style.display = headerNav.style.display === 'flex' ? 'none' : 'flex';
    if (headerNav.style.display === 'flex') {
      headerNav.style.position = 'absolute';
      headerNav.style.top = '100%';
      headerNav.style.left = '0';
      headerNav.style.right = '0';
      headerNav.style.backgroundColor = 'var(--bg-secondary)';
      headerNav.style.flexDirection = 'column';
      headerNav.style.padding = '2rem';
      headerNav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      headerNav.style.gap = '1.5rem';
    }
  });
  
  headerNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
      headerNav.style.display = 'none';
    }
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      headerNav.style.display = '';
      headerNav.style.position = '';
      headerNav.style.top = '';
      headerNav.style.left = '';
      headerNav.style.right = '';
      headerNav.style.backgroundColor = '';
      headerNav.style.flexDirection = '';
      headerNav.style.padding = '';
      headerNav.style.boxShadow = '';
      headerNav.style.gap = '';
    }
  });
}

function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => entry.target.style.width = width, 300);
      }
    });
  }, { threshold: 0.5 });
  
  skillLevels.forEach(level => observer.observe(level));
}

function initTiltEffect() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.cert-card'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  themeToggle.addEventListener('click', toggleTheme);
  initScrollAnimations();
  initSkillBars();
  initLightbox();
  initMobileMenu();
  initTiltEffect();
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
  
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', () => button.style.transform = 'scale(0.98)');
    button.addEventListener('mouseup', () => button.style.transform = '');
    button.addEventListener('mouseleave', () => button.style.transform = '');
  });
});
