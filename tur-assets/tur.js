'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const smallScreen = window.matchMedia('(max-width: 850px)');

function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}

function syncMenu() {
  menuToggle.hidden = !smallScreen.matches;
  if (!smallScreen.matches) closeMenu();
}

syncMenu();
smallScreen.addEventListener('change', syncMenu);
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = isOpen;
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});

const dateButtons = document.querySelectorAll('[data-date]');
const selectedDate = document.querySelector('#selected-date');
const bookingLinks = document.querySelectorAll('.booking-link');

function selectDate(button) {
  dateButtons.forEach(candidate => {
    const active = candidate === button;
    candidate.classList.toggle('selected', active);
    candidate.setAttribute('aria-pressed', String(active));
  });
  const date = button.dataset.date;
  selectedDate.textContent = date;
  const message = `Привет! Интересует яхтенное путешествие по Турции ${date}. Подскажите, есть ли места?`;
  bookingLinks.forEach(link => {
    link.href = `https://wa.me/79213968419?text=${encodeURIComponent(message)}`;
  });
}

dateButtons.forEach(button => button.addEventListener('click', () => selectDate(button)));
selectDate(document.querySelector('.date-option.selected'));
