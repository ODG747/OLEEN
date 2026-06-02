const header = document.querySelector('.site-header');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('oleen-theme');

if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}

function updateThemeButton() {
  if (!themeToggle) {
    return;
  }

  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle.textContent = isDark ? 'Theme clair' : 'Theme sombre';
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

function updateHeaderShadow() {
  if (!header) {
    return;
  }

  header.classList.toggle('is-scrolled', window.scrollY > 8);
}

updateHeaderShadow();
updateThemeButton();
window.addEventListener('scroll', updateHeaderShadow, { passive: true });

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';

  if (isDark) {
    delete document.documentElement.dataset.theme;
    localStorage.setItem('oleen-theme', 'light');
  } else {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('oleen-theme', 'dark');
  }

  updateThemeButton();
});
