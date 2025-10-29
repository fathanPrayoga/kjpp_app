function openPopup(project) {
  if (project === 'asri') document.getElementById('popupAsri').style.display = 'flex';
  if (project === 'badrul') document.getElementById('popupBadrul').style.display = 'flex';
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}
