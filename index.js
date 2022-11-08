import { menuArray } from "./data.js";

const menuOptionsContainer = document.getElementById("menu-options-container");
const orderContainer = document.getElementById("order-container");
const orderItemsContainer = document.getElementById("order-items-container");
const orderPrice = document.getElementById("order-price");
const paymentModal = document.getElementById("payment-modal");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveOrderItem(e.target.dataset.remove);
  } else if (e.target.id === "payment-modal-cancel-btn") {
    closePaymentModal();
  } else if (e.target.id === "complete-order-btn") {
    openPaymentModa();
  }
});

function handleAddClick(menuOptionId) {
  orderContainer.classList.remove("hidden");
  const targetMenuOption = menuArray.filter(function (menuOption) {
    return menuOption.id === menuOptionId;
  })[0];
  orderItemsContainer.innerHTML += `
    <div id="order-${targetMenuOption.id}" class="order-item-row">
      <div class="order-item">
        <h3 class="order-item-title">${targetMenuOption.name}</h3>
        <div class="order-item-remove-btn" data-remove="${targetMenuOption.id}">remove</div>
      </div>
      <p class="price">$${targetMenuOption.price}</p>
    </div>
  `;

  calculateTotalPrice(targetMenuOption.price);
}

function handleRemoveOrderItem(orderItemRowId) {
  const orderItemRow = document.getElementById(`order-${orderItemRowId}`);
  orderItemRow.remove();
  if (orderItemsContainer.children.length === 0) {
    orderContainer.classList.add("hidden");
  }
}

function calculateTotalPrice(newPrice) {
  let currentOrderPrice = orderPrice.textContent.match(/\d+/)[0];
  orderPrice.textContent = `$${parseInt(currentOrderPrice) + newPrice}`;
}

function closePaymentModal() {
  paymentModal.classList.add("hidden");
}

function openPaymentModa() {
  paymentModal.classList.remove("hidden");
}

function renderMenuOptions() {
  let menuOptionsHTML = "";
  menuArray.forEach(function (menuOption) {
    menuOptionsHTML += `
            <div class="menu-option">
                <div class="menu-option-emoji">${menuOption.emoji}</div>
                <div class="menu-option-details">
                    <h3 class="menu-option-title">${menuOption.name}</h3>
                    <p class="menu-option-ingredients">${menuOption.ingredients}</p>
                    <p class="price">$${menuOption.price}</p>
                </div>
                <button class="add-btn" data-add="${menuOption.id}">+</button>
            </div>
        `;
  });

  menuOptionsContainer.innerHTML = menuOptionsHTML;
}

renderMenuOptions();
