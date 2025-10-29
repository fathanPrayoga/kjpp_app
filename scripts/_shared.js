export function setupProfilePopup() {
  const profilePic = document.querySelector('.profile-pic img');
  const profilePopup = document.getElementById('profilePopup');

  if (profilePic && profilePopup) {
    profilePic.addEventListener('click', (e) => {
      e.stopPropagation();
      profilePopup.classList.add('active');
    });

    profilePopup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup-img img')) {
        profilePopup.classList.remove('active');
      }
    });
  }
}
