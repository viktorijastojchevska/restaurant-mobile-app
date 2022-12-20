import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu-el");
const cartEl = document.getElementById("cart-el");
const formModal = document.getElementById("form-modal");
const purchaseForm = document.getElementById("purchase-form");
const statusEl = document.getElementById("status-el");
const userName = document.getElementById("user-name");
const cartArray = [];

document.addEventListener("click", function (e) {
  const menuItemId = parseInt(e.target.dataset.add);
  if (menuItemId >= 0 && menuItemId < menuArray.length) {
    const selectedItem = menuArray.filter(function (m) {
      return m.id === menuItemId;
    })[0];

    cartArray.push(selectedItem);
    renderCart(cartArray);
    statusEl.style.display = "none";
    cartEl.style.display = "block";
  }

  const cartItemId = parseInt(e.target.dataset.remove);
  if (cartItemId >= 0) {
    const removedItem = cartArray.filter(function (i) {
      return i.id === cartItemId;
    })[0];

    let index = cartArray.indexOf(removedItem);
    cartArray.splice(index, 1);
    renderCart(cartArray);
  }

  if (e.target.id === "purchase-btn") {
    formModal.style.display = "block";
    purchaseForm.reset();
  }
});

purchaseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formModal.style.display = "none";
  statusEl.innerHTML = `<p id = "message">Thanks ${userName.value}! Your order is on its way!</p>`;
  statusEl.style.display = "block";
  statusEl.classList.add("status-el-block");
  cartEl.style.display = "none";
  cartArray.length = 0;
});

function getMenuHtml(menus) {
  let menuItems = "";

  for (let item of menus) {
    menuItems += `
        <div class="menu-item">
            <div class="emojis">
                <p class="meal-emoji">${item.emoji}</p>
            </div>
            <div class="meal-detail">
                <h3>${item.name}</h3>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$ ${item.price}</p>
            </div>
                <ion-icon name="add-outline" class="add-btn" data-add ="${item.id}"></ion-icon>
          </div>
          `;
  }
  menuEl.innerHTML = menuItems;
}
getMenuHtml(menuArray);

function renderCartItems(cartItems) {
  let cartItem = "";
  let cartTotal = 0;

  cartItems.forEach(function (item) {
    cartItem += `
        <div class="item-box">
            <h3 id="cart-item">${item.name}</h3>
            <button class="remove-btn" data-remove ="${item.id}">remove</button>
            <div id="item-price">$${item.price}</div>
        </div>
        `;
    cartTotal += item.price;
  });
  document.getElementById("cart-items").innerHTML = cartItem;
  document.getElementById("total-sum").innerText = `$${cartTotal}`;
}

function renderCart(cartItems) {
  cartEl.innerHTML = `
        <h3 id="cart-title">Your order</h3>
        <div id="cart-items"></div>
        <div class="cart-total">
            <h3>Total price:</h3>
            <p id = "total-sum"></p>
        </div>
    <button class="btn" id = "purchase-btn">Complete order</button>
    `;
  renderCartItems(cartItems);
}
