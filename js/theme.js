// ---- helpers ----
function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  }

  updateThemeToggleUI(theme);
}

// ---- UI sync ----
function updateThemeToggleUI(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.classList.toggle('is-light', theme === 'light');

  toggle.querySelectorAll('.toggle-option').forEach(option => {
    option.classList.toggle(
      'is-active',
      option.dataset.themeOption === theme
    );
  });
}

// ---- init ----
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved preference (dark is default)
  const savedTheme = localStorage.getItem('theme') === 'light'
    ? 'light'
    : 'dark';

  setTheme(savedTheme);

  // Wire up toggle
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
});