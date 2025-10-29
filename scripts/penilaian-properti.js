import { setupProfilePopup } from './_shared.js';
setupProfilePopup();

window.openPopup = function (project) {
  if (project === 'asri') document.getElementById('popupAsri').style.display = 'flex';
  if (project === 'badrul') document.getElementById('popupBadrul').style.display = 'flex';
};

window.closePopup = function (id) {
  document.getElementById(id).style.display = 'none';
};
