import ProductData from "./ProductDetails.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductList("tents", dataSource, element);

list.init();
// console.log(list);