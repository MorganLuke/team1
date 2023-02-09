import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData("tents");

const productId = getParam("product");

const product = new ProductDetails(category, productId, dataSource);
product.init();

// console.log(dataSource.findProductById(productId));
