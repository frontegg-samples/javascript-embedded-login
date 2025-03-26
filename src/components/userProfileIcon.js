import { getInitials } from '../utils/getInitials';

export function createUserProfileIcon(user) {
  const container = document.createElement('div');
  container.className = 'tenant-logo';

  if (user.profilePictureUrl) {
    const img = document.createElement('img');
    img.src = user.profilePictureUrl;
    img.alt = `${user.name}'s profile`;
    img.width = 24;
    img.height = 24;
    
    // Handle image load errors
    img.onerror = (e) => {
      e.target.style.display = 'none';
      const initialsDiv = document.createElement('div');
      initialsDiv.className = 'initials';
      initialsDiv.setAttribute('role', 'img');
      initialsDiv.setAttribute('aria-label', 'User initials');
      initialsDiv.textContent = getInitials(user.name);
      container.appendChild(initialsDiv);
    };
    
    container.appendChild(img);
  } else {
    // Create initials element if no profile picture
    const initialsDiv = document.createElement('div');
    initialsDiv.className = 'initials';
    initialsDiv.setAttribute('role', 'img');
    initialsDiv.setAttribute('aria-label', 'User initials');
    initialsDiv.textContent = getInitials(user.name);
    container.appendChild(initialsDiv);
  }

  return container;
}
