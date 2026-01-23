document.querySelectorAll('[data-nav]')?.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = link.getAttribute('data-nav');
    if (target) {
      window.location.href = target;
    }
  });
});
