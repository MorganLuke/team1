import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { cartTotals } from "./cartTotals.js";
// let cTotal = 0;

// Declare class ShoppingCart
export default class ShoppingCart {
  // Constructor to initialize the ShoppingCart class
  constructor(key, parentSelector) {
    // Store the key for local storage
    this.key = key;
    // Store the parent selector for rendering the cart contents
    this.parentSelector = parentSelector;
    // Get the cart items from local storage using the key
    this.cartItems = getLocalStorage(this.key)
  }

  // Initialize the Shopping Cart by calling renderCartContents method
  init() {
    this.renderCartContents();
  }

  // Method to render the contents of the cart on the page
  renderCartContents() {
    // Clear the contents of the parent selector
    document.querySelector(this.parentSelector).innerHTML = "";
    // Check if there's an item in the local storage with the key "so-cart"
    if (localStorage.getItem("so-cart")) {
      // Get the cart items from local storage using the key
      const cartItems = getLocalStorage(this.key);
      // Check if the cart items array is empty
      if (cartItems.length === 0) {
        // If the cart items array is empty, add the "hide" class to the cart footer
        document.getElementById("cart-footer").classList.add("hide");
        // Render the message "Your cart is empty" on the page
        document.querySelector(".product-list").innerHTML = `<p id="empty-cart-message">Your cart is empty!</p>`;
        // Return from the function
        return;
      }
      // Initialize the total to 0
      let total = 0;
      // Get the HTML template for each cart item
      const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
      // Remove the "hide" class from the cart footer
      document.getElementById("cart-footer").classList.remove("hide");
      // Iterate through the cart items and add their final prices to the total
      cartItems.forEach((item) => (total += ((item.FinalPrice) * (item.quantity))));
      // Render the HTML templates for the cart items on the page
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      // Render the total on the page
      document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;

      // Add an event listener for the "click" event to all the elements with a "data-id" attribute
      document.querySelectorAll(`[data-id]`).forEach((item) => { 
        item.addEventListener(`click`, (event) => { 
          // Call the removeItem method when an element with a "data-id" attribute is clicked
          this.removeItem(event); 
        });
      });

      // Add an event listener for the "click" event to all the elements with a "data-id-add" attribute
      document.querySelectorAll(`[data-id-add]`).forEach((item) => { 
        item.addEventListener(`click`, (event) => { 
          // Call the increase-quantity method when an element with a "data-id" attribute is clicked
          this.increase(event); 
        });
      });
      // Add an event listener for the "click" event to all the elements with a "data-id-min" attribute
      document.querySelectorAll(`[data-id-min]`).forEach((item) => { 
        item.addEventListener(`click`, (event) => { 
          // Call the decrease quantity method when an element with a "data-id-min" attribute is clicked
          this.decrease(event); 
        });
      });
    }
  }

  // Method to get the HTML template for a cart item

  cartItemTemplate(item) {
     // HTML template for a single cart item
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
  
    <p class="cart-card__quantity">    <span class="quantityBtn quantityMin" data-id-Min="${item.Id}")>-</span> <span class="cart-card__quantity"> qty: ${item.quantity} </span><span class="quantityBtn quantityAdd" data-id-add="${item.Id}">+</span></p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
    <span class="cart-card__remove" data-id="${item.Id}" title="Remove from cart">❌</span>
  </li>`;
  // Return the generated HTML
    return newItem;
  }
  // removeClickedHandler(event) { 
  //   const selectId = event.target; 
  //   let cartItems = getLocalStorage(`so-cart`).filter( 
  //     (item) => item.Id !== selectId.dataset.id 
  //   ); 
  //   setLocalStorage(`so-cart`, cartItems); 
  //   this.renderCartContents();
  // }

  // Remove an item from the cart
  // Remove an item from the cart
  removeItem(event) {
    // Get the id of the item to be removed from the data-id attribute of the target
    const selectedId = event.target.dataset.id;
    let cartItems = getLocalStorage("so-cart");
    let index = cartItems.findIndex(item => item.Id === selectedId);

    // Check if the item was found in the cart
    if (index >= 0) {
      // Remove the item from the cart
      cartItems.splice(index, 1);
      // Update the local storage with the new cart items
      setLocalStorage("so-cart", cartItems);
      // Re-render the cart contents
      this.renderCartContents();
      // updates cart totals for superscipt on backpack icon
      cartTotals();
      // Show the success message
      const successMessage = document.createElement("div");
      successMessage.innerHTML = "Item successfully removed from the cart!";
      successMessage.style.backgroundColor = "green";
      successMessage.style.color = "white";
      successMessage.style.padding = "20px";
      successMessage.style.position = "fixed";
      successMessage.style.borderRadius = "5px"
      // successMessage.style.transform = "translate(-50%, -50%)";
      successMessage.style.top = "0";
      successMessage.style.right = "0";
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
  }

}
  increase(event) {
      // Get the id of the item to be increased from the data-id-add attribute of the target
      const selectedId = event.target.dataset.idAdd;
      let cartItems = getLocalStorage("so-cart");
      let index = cartItems.findIndex(item => item.Id === selectedId);
      let quantity = cartItems[index].quantity;
        // quantity += 1;
        // increase quantity of item
        cartItems[index].quantity += 1;

        // Update the local storage with the new cart items
        setLocalStorage("so-cart", cartItems);
        // Re-render the cart contents
        this.renderCartContents();
        // updates cart totals for superscipt on backpack icon
        cartTotals();
        }

  decrease(event) {
      // Get the id of the item to be decreased from the data-id-min attribute of the target
      const selectedId = event.target.dataset.idMin;
      let cartItems = getLocalStorage("so-cart");
      let index = cartItems.findIndex(item => item.Id === selectedId);
      
      let quantity = cartItems[index].quantity;
      if (quantity > 1) {
        cartItems[index].quantity -= 1;

      
        // Update the local storage with the new cart items
        setLocalStorage("so-cart", cartItems);
            // Re-render the cart contents
            this.renderCartContents();
            // updates cart totals for superscipt on backpack icon
            cartTotals();
      }

      else {
        this.removeItem(event);
      }

    }


}






