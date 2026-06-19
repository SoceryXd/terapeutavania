const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const topbar = document.querySelector('#topbar');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 20);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Movimento leve nos cards no desktop
if (window.matchMedia('(min-width: 901px)').matches) {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -3;
      const rotateY = ((x / rect.width) - 0.5) * 3;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

const form = document.querySelector('#contactForm');
const status = document.querySelector('#formStatus');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (status) status.textContent = 'Abrindo WhatsApp...';

    const nome = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const mensagem = form.querySelector('[name="message"]').value.trim();

    const texto = `Olá, Vânia! Meu nome é ${nome}. Meu e-mail é ${email}. Mensagem: ${mensagem}`;
    const whatsappUrl = `https://wa.me/5511955916420?text=${encodeURIComponent(texto)}`;

    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      window.location.href = 'obrigado.html';
    }, 700);
  });
}
