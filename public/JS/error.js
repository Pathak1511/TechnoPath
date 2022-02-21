/*Error back button code */
const back = document.querySelector('.btn-back');
back.addEventListener('click', function () {
  history.back();
});
