export function createUserInfoItem(title, value) {
  const container = document.createElement('div');
  container.className = 'tenant-info-item';
  
  const titleElement = document.createElement('p');
  titleElement.className = 'tenant-info-item-title';
  titleElement.textContent = title;
  
  const valueElement = document.createElement('p');
  valueElement.className = 'tenant-info-item-value';
  valueElement.textContent = value;
  
  container.appendChild(titleElement);
  container.appendChild(valueElement);

  return container;
}
