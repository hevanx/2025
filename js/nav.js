const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  const isOpen = navUl.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
