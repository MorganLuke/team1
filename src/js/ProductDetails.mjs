// import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import {ProductDetails, addProductToCart} from "./ProductDetails.mjs";
function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
}


addToCart() {
  let cart_list = [];
  
    if (localStorage.getItem("so-cart")) {
      cart_list = getLocalStorage("so-cart");
    }
    cart_list.push(this.product);
    setLocalStorage("so-cart", cart_list);

}
//  addProductToCart(product) {
//     let cart_list = [];
  
//     if (localStorage.getItem("so-cart")) {
//       cart_list = getLocalStorage("so-cart");
//     }
//     cart_list.push(product);
//     setLocalStorage("so-cart", cart_list);
//   }

// // add to cart button event handler
//  addToCartHandler(e) {
//     const product = await dataSource.findProductById(e.target.dataset.id);
//     addProductToCart(product);
//   }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
};

//   // add listener to Add to Cart button
  // document
  //   .getElementById("addToCart")
  //   .addEventListener("click", addToCartHandler);
  