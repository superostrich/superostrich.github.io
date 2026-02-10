// menu.js 
  fetch('/nav.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('nav-container').innerHTML = html;
      initThemeToggle(); // ← important
      updateThemeToggleUI(
        document.documentElement.getAttribute('data-theme') || 'dark'
      );
    });