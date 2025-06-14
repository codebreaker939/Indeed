const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const themeBtn = document.getElementById('themeToggle');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
