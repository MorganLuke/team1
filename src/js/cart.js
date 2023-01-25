import { getLocalStorage } from "./utils.mjs";

let cTotal = 0;

function renderCartContents() {
  if (localStorage.getItem("so-cart")) {
    const cartItems = getLocalStorage("so-cart");
    let total = 0;
    // let total = int;
    // possibly use cartItems array to find duplicate products to add up quantity to put in to html.
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.getElementById("cart-footer").classList.remove("hide");
    cartItems.forEach((item) => (total = cartTotal(item)));
    // const finalTotal = total.reduce();
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
  }
  // else cart empty message
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
function cartTotal(item) {
  cTotal += item.FinalPrice;
  return cTotal;
}

renderCartContents();
