const languageButton = document.getElementById('translate');
const menuButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const darkModeToggle = document.getElementById('toggle');
const modalProjeto = document.getElementById('modal-projeto');
const fecharModal = document.getElementById('fechar-modal');

let currentLanguage = 'pt';

const projetos = [
  {
    titulo: {
      pt: 'Landing page - Tomatos Pizza',
      en: 'Tomatos Pizza landing page'
    },
    descricao: {
      pt: 'Projeto de uma página de apresentação para uma pizzaria, desenvolvido para praticar estruturação e estilos para web.',
      en: 'A presentation page for a pizza restaurant, built to practice web page structure and styling.'
    },
    imagem: 'Captura de tela 2026-10-08 145202.png',
    tecnologias: ['HTML', 'CSS', 'JS']
  },
  {
    titulo: {
      pt: 'Tomato Pizza',
      en: 'Tomato Pizza'
    },
    descricao: {
      pt: 'Uma segunda versão do projeto de pizzaria, com foco na organização visual e na apresentação dos produtos.',
      en: 'A second version of the pizza restaurant project, focused on visual layout and product presentation.'
    },
    imagem: 'Captura de tela 2026-10-08 150455.png',
    tecnologias: ['HTML', 'CSS', 'JS']
  },
  {
    titulo: {
      pt: 'Landing page - Tomatos Pizza',
      en: 'Tomatos Pizza landing page'
    },
    descricao: {
      pt: 'Projeto de uma página de apresentação para uma pizzaria, desenvolvido para praticar estruturação e estilos para web.',
      en: 'A presentation page for a pizza restaurant, built to practice web page structure and styling.'
    },
    imagem: 'Captura de tela 2026-10-08 145202.png',
    tecnologias: ['HTML', 'CSS', 'JS']
  }
];

function atualizarIdiomaModal() {
  const projeto = projetos[Number(modalProjeto.dataset.projeto)];

  if (projeto) {
    document.getElementById('titulo-modal').textContent = projeto.titulo[currentLanguage];
    document.getElementById('descricao-modal').textContent = projeto.descricao[currentLanguage];
  }
}

languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
  document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-pt][data-en]').forEach((element) => {
    element.textContent = element.dataset[currentLanguage];
  });

  languageButton.textContent = currentLanguage === 'pt' ? 'EN' : 'PT-BR';
  document.title = currentLanguage === 'pt'
    ? 'Lucas Pavesi | Portfólio'
    : 'Lucas Pavesi | Portfolio';

  document.querySelector('[name="name"]').placeholder =
    currentLanguage === 'pt' ? 'Seu nome' : 'Your name';

  document.querySelector('[name="email"]').placeholder =
    currentLanguage === 'pt' ? 'seu@email.com' : 'you@email.com';

  document.querySelector('[name="message"]').placeholder =
    currentLanguage === 'pt' ? 'Escreva sua mensagem...' : 'Write your message...';

  atualizarIdiomaModal();
});

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');

  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);

  localStorage.setItem(
    'portfolio-theme',
    darkModeToggle.checked ? 'dark' : 'light'
  );
});

function abrirProjeto(card) {
  const index = Number(card.dataset.projeto);
  const projeto = projetos[index];

  if (!projeto) return;

  modalProjeto.dataset.projeto = String(index);

  document.getElementById('titulo-modal').textContent =
    projeto.titulo[currentLanguage];

  document.getElementById('descricao-modal').textContent =
    projeto.descricao[currentLanguage];

  const imagemModal = document.getElementById('imagem-modal');
  imagemModal.src = projeto.imagem;
  imagemModal.alt = projeto.titulo[currentLanguage];

  const tecnologiasModal = document.getElementById('tecnologias-modal');
  tecnologiasModal.innerHTML = projeto.tecnologias
    .map((tecnologia) => `<span>${tecnologia}</span>`)
    .join('');

  modalProjeto.showModal();
}

document.querySelectorAll('.container-projeto').forEach((card) => {
  card.addEventListener('click', () => abrirProjeto(card));

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      abrirProjeto(card);
    }
  });
});

fecharModal.addEventListener('click', () => {
  modalProjeto.close();
});

modalProjeto.addEventListener('click', (event) => {
  if (event.target === modalProjeto) {
    modalProjeto.close();
  }
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = currentLanguage === 'pt'
    ? 'Contato pelo portfólio'
    : 'Portfolio contact';
  const emailLabel = currentLanguage === 'pt' ? 'E-mail' : 'Email';
  const messageLabel = currentLanguage === 'pt' ? 'Mensagem' : 'Message';

  const body = `${data.get('name').trim()}
${emailLabel}: ${data.get('email').trim()}

${messageLabel}:
${data.get('message').trim()}`;

  const whatsappUrl =
    `https://wa.me/5531981087010?text=${encodeURIComponent(`${subject}\n\n${body}`)}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();