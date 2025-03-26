import { createUserProfileIcon } from './userProfileIcon';
import { createUserInfoItem } from './userInfoItem';
import { createTenantInfo } from './tenantInfo';

export function createAccountInfo(user, tenants, activeTenant, onSwitchTenant, fronteggInstance) {
  if (!user || !tenants || !activeTenant) {
    return;
  }
  const container = document.createElement('div');
  container.id = 'accountInfo';
  container.className = 'section-card account-card';

  const userRoles = user.roles.map(role => role.name).join(', ');

  const titleSection = document.createElement('div');
  titleSection.className = 'title-wrapper';
  titleSection.innerHTML = `
    <h1 class="title">Hello, ${user.name}!</h1>
    <button class="primary-button fit-content" aria-label="Open self-service portal">
      Self-service portal
    </button>
  `;

  const tenantsWrapper = document.createElement('div');
  tenantsWrapper.className = 'tenants-wrapper';

  const userCard = document.createElement('article');
  userCard.className = 'tenant-card';

  const userTitleDiv = document.createElement('div');
  userTitleDiv.className = 'tenant-title';
  userTitleDiv.appendChild(createUserProfileIcon(user));
  
  const nameElement = document.createElement('p');
  nameElement.className = 'tenant-name';
  nameElement.textContent = user.name;
  userTitleDiv.appendChild(nameElement);

  const userInfoDiv = document.createElement('div');
  userInfoDiv.className = 'tenant-info';
  userInfoDiv.appendChild(createUserInfoItem('Name', user.name));
  userInfoDiv.appendChild(createUserInfoItem('Email', user.email));
  userInfoDiv.appendChild(createUserInfoItem('Roles', userRoles));

  const editButton = document.createElement('button');
  editButton.className = 'secondary-button edit-button';
  editButton.setAttribute('aria-label', 'Edit user profile');
  editButton.textContent = 'Edit user';

  userCard.appendChild(userTitleDiv);
  userCard.appendChild(userInfoDiv);
  userCard.appendChild(editButton);

  const adminPortalButton = titleSection.querySelector('.primary-button');
  adminPortalButton.addEventListener('click', () => {
    window.location.href = '#/admin-box';
    fronteggInstance.showAdminPortal();
  });

  editButton.addEventListener('click', () => {
    window.location.href = '#/admin-box';
    fronteggInstance.showAdminPortal();
  });

  tenantsWrapper.appendChild(userCard);
  tenantsWrapper.appendChild(createTenantInfo(tenants, activeTenant, onSwitchTenant, fronteggInstance));

  container.appendChild(titleSection);
  container.appendChild(tenantsWrapper);

  return container;
}
