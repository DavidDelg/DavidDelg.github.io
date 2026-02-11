const btnMenu = document.querySelector('.btn-menu');
const sidebar = document.querySelector('.sidebar');

btnMenu.addEventListener('click', (e) => {
  sidebar.classList.toggle('active');
  e.stopPropagation();
});
document.addEventListener('click', (e) => {
  if (e.target !== sidebar && e.target !== btnMenu) {
    sidebar.classList.remove('activo');
  }
});
const links = document.querySelectorAll('.sidebar a');

links.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    
  });
});