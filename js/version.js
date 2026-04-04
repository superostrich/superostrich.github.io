document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('changelog');
  const path = container.dataset.path;

  try {
    const res = await fetch(path);
    const text = await res.text();

    const lines = text.split('\n');

    const versionRaw = lines[2]?.trim();
    const version = versionRaw?.replace(/^v/i, '');
    const date = lines[3]?.trim();

    document.getElementById('version').textContent = version || 'N/A';
    document.getElementById('date').textContent = date || 'N/A';

  } catch (err) {
    console.error('Failed to load changelog:', err);
  }
});