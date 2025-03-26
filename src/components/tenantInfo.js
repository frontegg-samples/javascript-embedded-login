import { getInitials } from "../utils/getInitials";
import { copyToClipboardButton } from "./copyToClipboardButton";
import { createTenantsDropdown } from "./tenantsDropdown";

let currentLoadingTenantId = null;

function loadMembersCount(fronteggInstance, tenantId, forceLoad = false) {
  if (!forceLoad && currentLoadingTenantId === tenantId) {
    return;
  }

  currentLoadingTenantId = tenantId;
  const baseUrl = fronteggInstance.store.getState().root.context.baseUrl;
  const url = `${baseUrl}/frontegg/identity/resources/users/v2?_offset=0&_limit=100&_includeSubTenants=false`;

  updateMembersCount("loading...");

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        fronteggInstance.store.getState().auth.user.accessToken
      }`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const count =
        data && data._metadata ? data._metadata.totalItems.toString() : "-";
      updateMembersCount(count);
    })
    .catch(() => {
      updateMembersCount("-");
    })
    .finally(() => {
      if (currentLoadingTenantId === tenantId) {
        currentLoadingTenantId = null;
      }
    });
}

function updateMembersCount(count) {
  const membersCount = document.getElementById("members-count");
  if (membersCount) {
    membersCount.textContent = count;
  }
}

export function createTenantInfo(
  tenants,
  activeTenant,
  onSwitchTenant,
  fronteggInstance
) {
  const container = document.createElement("div");
  container.className = "tenant-card";

  if (!tenants || !activeTenant) {
    return container;
  }

  // Create tenant title wrapper
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "tenant-title-wrapper";
  
  // Create tenant title
  const titleDiv = document.createElement("div");
  titleDiv.className = "tenant-title";
  
  // Create tenant logo
  const logoDiv = document.createElement("div");
  logoDiv.className = "tenant-logo";
  
  const initialsDiv = document.createElement("div");
  initialsDiv.className = "initials";
  initialsDiv.textContent = getInitials(activeTenant.name);
  logoDiv.appendChild(initialsDiv);
  
  // Create tenant name
  const nameP = document.createElement("p");
  nameP.className = "tenant-name";
  nameP.textContent = activeTenant.name;
  
  // Assemble title
  titleDiv.appendChild(logoDiv);
  titleDiv.appendChild(nameP);
  titleWrapper.appendChild(titleDiv);
  
  // Add dropdown if there are multiple tenants
  if (tenants && tenants.length > 0) {
    const dropdown = createTenantsDropdown(tenants, activeTenant, (tenant) => {
      onSwitchTenant(tenant);
      // Force load for the new tenant
      loadMembersCount(fronteggInstance, tenant.tenantId, true);
    });
    titleWrapper.appendChild(dropdown);
  }
  
  // Create tenant info section
  const infoDiv = document.createElement("div");
  infoDiv.className = "tenant-info";
  
  // Add tenant ID item
  const idItem = document.createElement("div");
  idItem.className = "tenant-info-item";
  
  const idTitle = document.createElement("p");
  idTitle.className = "tenant-info-item-title";
  idTitle.textContent = "ID";
  
  const idValue = document.createElement("p");
  idValue.className = "tenant-info-item-value ellipsis";
  idValue.textContent = activeTenant.tenantId;
  
  const idValueWrapper = document.createElement("div");
  idValueWrapper.className = "tenant-info-copy-wrapper";
  idValueWrapper.appendChild(idValue);
  idValueWrapper.appendChild(copyToClipboardButton(activeTenant.tenantId));

  idItem.appendChild(idTitle);
  idItem.appendChild(idValueWrapper);
  
  // Add members count item
  const membersItem = document.createElement("div");
  membersItem.className = "tenant-info-item";
  
  const membersTitle = document.createElement("p");
  membersTitle.className = "tenant-info-item-title";
  membersTitle.textContent = "Members";
  
  const membersValue = document.createElement("p");
  membersValue.className = "tenant-info-item-value";
  membersValue.id = "members-count";
  membersValue.textContent = "loading...";
  
  membersItem.appendChild(membersTitle);
  membersItem.appendChild(membersValue);
  
  // Add creator item
  const creatorItem = document.createElement("div");
  creatorItem.className = "tenant-info-item";
  
  const creatorTitle = document.createElement("p");
  creatorTitle.className = "tenant-info-item-title";
  creatorTitle.textContent = "Creator";
  
  const creatorValue = document.createElement("p");
  creatorValue.className = "tenant-info-item-value";
  creatorValue.textContent = activeTenant.creatorEmail || "system";
  
  creatorItem.appendChild(creatorTitle);
  creatorItem.appendChild(creatorValue);
  
  // Add items to info section
  infoDiv.appendChild(idItem);
  infoDiv.appendChild(membersItem);
  infoDiv.appendChild(creatorItem);
  
  // Create edit button
  const editButton = document.createElement("button");
  editButton.className = "secondary-button edit-button";
  editButton.textContent = "Edit account";
  editButton.addEventListener("click", () => {
    window.location.href = "#/admin-box/account";
    fronteggInstance.showAdminPortal();
  });

  // Assemble container
  container.appendChild(titleWrapper);
  container.appendChild(infoDiv);
  container.appendChild(editButton);

  // Set up subscription to tenant changes
  let lastTenantId = activeTenant.tenantId;
  fronteggInstance.store.subscribe(() => {
    const state = fronteggInstance.store.getState();
    const currentTenant = state.auth.tenantsState?.activeTenant;
    if (state.auth.isAuthenticated && state.auth.user && currentTenant) {
      if (lastTenantId !== currentTenant.tenantId) {
        lastTenantId = currentTenant.tenantId;
        loadMembersCount(fronteggInstance, currentTenant.tenantId, true);
      }
    }
  });

  // Initial load of members count
  loadMembersCount(fronteggInstance, activeTenant.tenantId);
  return container;
}
