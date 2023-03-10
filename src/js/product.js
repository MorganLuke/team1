import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.mjs";

loadHeaderFooter();

// const category = getParam("category");
// const dataSource = new ProductData("tents");
// const category = getParam("category");
const dataSource = new ExternalServices("tents");

const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
const alert = new Alert();
alert.processAlert();

// console.log(dataSource.findProductById(productId));
