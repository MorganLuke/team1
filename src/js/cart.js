import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

    // Remove item event handler 
   document.querySelectorAll(`[data-id]`).forEach((item) => { 
   item.addEventListener(`click`, removeClickedHandler); 
  });
  }
  // else cart empty message
}

// function removeFromCart(parent) {
//   // get current cart content
//   const cartItems = getLocalStorage("so-cart");

//   // find cart item to remove
//   const cartItem = cartItems.find(
//     // ChildNode 11 is the span element in the template literal
//     (item) => item.Id === parent.childNodes[11].dataset.id
//   );
//   // indexOf returns the first found element's index and splice removes it
//   cartItems.splice(cartItems.indexOf(cartItem), 1);

//   // set latest update of cart to localStorage
//   setLocalStorage("so-cart", cartItems);

//   // render the new cart
//   renderCartContents();
// }

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}" data-funtion="remove" title="Remove from cart">❌</span>
</li>`;
  console.log(newItem)
  return newItem;
}

function cartTotal(item) {
  cTotal += item.FinalPrice;
  return cTotal;
}
// Event Handler for clicking remove from cart 
const removeClickedHandler = (event) => { 
   const selectId = event.target; 
   var cartItems = getLocalStorage(`so-cart`).filter( 
   (item) => item.Id !== selectId.dataset.id 
   ); 
   setLocalStorage(`so-cart`, cartItems); 
  renderCartContents()
  };
// function manageCart(e) {
//   // find the parent element for the clicked element
//   const parent = e.target.closest("li");
  
//   // only call remove from cart if the clicked element has a data-function of remove
//   if (e.target.dataset.function === "remove") {
//     removeFromCart(parent)
//   }
// }

renderCartContents();
// document.querySelector(".product-list").addEventListener("click", manageCart);
