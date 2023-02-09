// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";



function productCardTemplate(product) {
    let discount = product.SuggestedRetailPrice - product.FinalPrice
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product_discount"> Discount: $${discount.toFixed(2)}</p>
    </a>
    
  </li>`;
}             


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        // const list = await this.dataSource.getData();
        const list = await this.dataSource.getData(this.category);
        // render the list 
        this.renderList(list);
        document.querySelector(".title").innerHTML = this.category;
      }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
      }
}
