function updateThemeToggleUI(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.classList.toggle('is-dark', theme === 'dark');

  toggle.querySelectorAll('.toggle-option').forEach(option => {
    option.classList.toggle(
      'is-active',
      option.dataset.themeOption === theme
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeToggleUI('light');
  } else {
    // dark is default
    document.documentElement.removeAttribute('data-theme');
    updateThemeToggleUI('dark');
  }

  // 🔑 THIS WAS MISSING
  initThemeToggle();
});

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const currentTheme =
      document.documentElement.getAttribute('data-theme') || 'dark';

    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      updateThemeToggleUI('light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      updateThemeToggleUI('dark');
    }
  });
}
