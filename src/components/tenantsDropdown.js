import { getInitials } from "../utils/getInitials";

export function createTenantsDropdown(items, selected, onSelect) {
  const container = document.createElement("div");
  container.className = "dropdown";

  const button = document.createElement("button");
  button.className = "dropdown-button";
  
  const buttonIcon = document.createElement("img");
  buttonIcon.src = "/icons/unfold-more.svg";
  buttonIcon.alt = "Other tenants";
  button.appendChild(buttonIcon);

  const menu = document.createElement("div");
  menu.className = "dropdown-menu";

  button.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("mousedown", (event) => {
    if (!container.contains(event.target)) {
      menu.classList.remove("show");
    }
  });

  items.forEach((item) => {
    const itemButton = document.createElement("button");
    itemButton.className = `dropdown-item ${
      selected?.id === item.id ? "active" : ""
    }`;

    // Create content container
    const contentDiv = document.createElement("div");
    contentDiv.className = "dropdown-item-content";
    
    // Create initials display
    const initialsDiv = document.createElement("div");
    initialsDiv.className = "initials";
    initialsDiv.textContent = getInitials(item.name);
    
    // Assemble content
    contentDiv.appendChild(initialsDiv);
    contentDiv.appendChild(document.createTextNode(item.name));
    
    // Add content to item button
    itemButton.appendChild(contentDiv);
    
    // Add selected indicator if needed
    if (selected?.id === item.id) {
      const checkmarkImg = document.createElement("img");
      checkmarkImg.src = "/icons/checkmark.svg";
      checkmarkImg.alt = "Selected tenant";
      itemButton.appendChild(checkmarkImg);
    }

    itemButton.addEventListener("click", () => {
      onSelect(item);
      menu.classList.remove("show");
    });

    menu.appendChild(itemButton);
  });

  container.appendChild(button);
  container.appendChild(menu);

  return container;
}
