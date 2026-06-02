const header = document.querySelector('.site-header');
const themeToggle = document.querySelector('.theme-toggle');
const THEME_STORAGE_KEY = 'oleen-theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    /* ignore */
  }
}

if (getStoredTheme() === 'dark') {
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
    setStoredTheme('light');
  } else {
    document.documentElement.dataset.theme = 'dark';
    setStoredTheme('dark');
  }

  updateThemeButton();
});
