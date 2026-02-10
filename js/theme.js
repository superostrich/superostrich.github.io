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

// Apply saved theme (works even before sidebar exists)
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Toggle on button click
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const current =
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';

    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);

    // 👇 THIS is the key line
    updateThemeToggleUI(current);
  });
}