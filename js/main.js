document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('nav-open');
      if (isOpen) {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '72px';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = '#fff';
        links.style.padding = '20px 24px';
        links.style.borderBottom = '1px solid #E2E8F0';
        links.style.gap = '18px';
      } else {
        links.style.display = 'none';
      }
    });
  }

  // Generic pill-button single-select groups
  document.querySelectorAll('[data-pill-group]').forEach(group => {
    group.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });
});
