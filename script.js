
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.16
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});
