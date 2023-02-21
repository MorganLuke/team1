import { getLocalStorage} from "./utils.mjs";

if (localStorage.getItem("so-cart")) {
    // Get the cart items from local storage using the key
    const cartItems = getLocalStorage(so-cart);
    // Check if the cart items array is empty
    if (cartItems.length === 0) {
        console.log(cartItems);
      // If the cart items array is empty, add the "hide" class to the cart footer
      document.getElementById("itemsCart").classList.add("hide");
      // Return from the function
    }
    document.getElementById("itemsCart").classList.remove("hide");
    document.getElementById("itemsCart") = cartItems.length;

}
