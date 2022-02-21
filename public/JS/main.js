// JS CODE TO TOGGLE LAPTOP DROPDOWN
const laptop = document.querySelector('.laptop');
const laptopDropdown = document.querySelector('.laptop-dropdown');
laptop.addEventListener('click', function () {
  laptopDropdown.classList.toggle('select');
});

// JS CODE TO TOGGLE MOBILE DROPDOWN
const mobile = document.querySelector('.mobile');
const mobileDropdown = document.querySelector('.mobile-dropdown');
mobile.addEventListener('click', function () {
  mobileDropdown.classList.toggle('select');
});

//JS CODE TO TOGGLE MENU TOGGLE
const btnMenu = document.querySelector('.openMenu');
const btnCloseMenu = document.querySelector('.closeMenu');
const navBar = document.querySelector('.nav');
btnMenu.addEventListener('click', function () {
  navBar.classList.add('select');
  btnCloseMenu.style.display = 'block';
  btnMenu.style.display = 'none';
});
btnCloseMenu.addEventListener('click', function () {
  navBar.classList.remove('select');
  btnCloseMenu.style.display = 'none';
  btnMenu.style.display = 'block';
});
// JS CODE TO TOGGLE CONTACT MODAL DROPDOWN
const contact = document.querySelector('.btnContact');
const modalContact = document.querySelector('.modal-section');
const closeBtn = document.querySelector('.close-btn');

contact.addEventListener('click', function () {
  modalContact.classList.toggle('select');
});

closeBtn.addEventListener('click', function () {
  modalContact.classList.remove('select');
});
