import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export function cartTotals() {
  let cart_list = [];
  if (localStorage.getItem("so-cart")) {
    cart_list = getLocalStorage("so-cart");
    document.getElementById("itemsCart").classList.remove("hide");
    document.getElementById("itemsCart").innerHTML = cart_list.length;
    if (cart_list.length == 0)
      document.getElementById("itemsCart").classList.add("hide");
  }
}
