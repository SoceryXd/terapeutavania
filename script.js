const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const year = document.querySelector('#year');
const form = document.querySelector('#contactForm');
const status = document.querySelector('#formStatus');

if (year) year.textContent = new Date().getFullYear();

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const mensagem = form.querySelector('[name="message"]').value.trim();

    if (!nome || !email || !mensagem) {
      if (status) status.textContent = 'Preencha todos os campos.';
      return;
    }

    if (status) status.textContent = 'Abrindo WhatsApp...';

    const texto = `Olá, Vânia! Meu nome é ${nome}. Meu e-mail é ${email}. Mensagem: ${mensagem}`;
    const whatsappUrl = `https://wa.me/5511955916420?text=${encodeURIComponent(texto)}`;

    window.open(whatsappUrl, '_blank', 'noopener');

    setTimeout(() => {
      window.location.href = 'obrigado.html';
    }, 700);
  });
}
