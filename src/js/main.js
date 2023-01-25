import ProductData from "./ProductDetails.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("Tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);

listing.init();
// console.log(list);