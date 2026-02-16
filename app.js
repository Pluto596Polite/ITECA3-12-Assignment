// 1. IMPORT THE CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. IMPORT THE JS
import * as bootstrap from 'bootstrap';


const normalizePathSegment = (value) => {
  if (!value) {
    return '';
  }
  return value.replace(/\/+$/, '').toLowerCase();
};

const setActiveNavLink = () => {
  let currentFile = normalizePathSegment(
    window.location.pathname.split('/').pop()
  );

  if (currentFile === '' || currentFile === 'index.html') {
    currentFile = 'home.html';
  }

  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';

    if (href.startsWith('#') || href === '') {
      return;
    }

    const url = new URL(href, window.location.href);
    const linkFile = normalizePathSegment(url.pathname.split('/').pop());
    const isActive = currentFile === linkFile;

    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      document
        .querySelectorAll('.nav-link')
        .forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
