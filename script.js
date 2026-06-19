
const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav?.classList.remove('open')));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const form = document.querySelector('#contactForm');
const status = document.querySelector('#formStatus');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (status) status.textContent = 'Abrindo WhatsApp com sua mensagem...';
    const nome = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const mensagem = form.querySelector('[name="message"]').value.trim();
    const texto = `Olá, Vânia! Meu nome é ${nome}. Meu e-mail é ${email}. Mensagem: ${mensagem}`;
    window.open(`https://wa.me/5511955916420?text=${encodeURIComponent(texto)}`, '_blank');
    setTimeout(() => { window.location.href = 'obrigado.html'; }, 900);
  });
}
