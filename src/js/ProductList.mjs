// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";


export function productCardTemplate(product) {
    let discount = product.SuggestedRetailPrice - product.FinalPrice;
    let retail = product.SuggestedRetailPrice;
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
     <p class="retail"> Retail Price: $${retail}</p>
    <p class="product_discount"> Discount: $${discount.toFixed(2)}</p>
    <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    
  </li>`;
}             

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    // Initialize sort functions
    this.sortByName = this.sortByName.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list;
    this.renderList(this.products);
    document.querySelector(".title").innerHTML = this.category;

    // Add event listeners for sorting by name and price
    document.getElementById("sort-by-name").addEventListener("click", this.sortByName);
    document.getElementById("sort-by-price").addEventListener("click", this.sortByPrice);
  }

  sortByName() {
    this.products.sort((a, b) => a.Name.localeCompare(b.Name));
    this.renderList(this.products);
  }

  sortByPrice() {
    this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    this.renderList(this.products);
  }

  renderList(list) {
    // Remove existing list items from the DOM
    while (this.listElement.firstChild) {
      this.listElement.removeChild(this.listElement.firstChild);
    }
    // Render the sorted list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}


    
//     const sortSelect = document.createElement("select");
//     sortSelect.addEventListener("change", (e) => {
//       if (e.target.value === "name") {
//         productList.sortByName();
//         productList.renderList();
//       } else if (e.target.value === "price") {
//         productList.sortByPrice();
//         productList.renderList();
//       }
//     });

// const nameOption = document.createElement("option");
// nameOption.value = "name";
// nameOption.text = "Sort by Name";
// sortSelect.add(nameOption);

// const priceOption = document.createElement("option");
// priceOption.value = "price";
// priceOption.text = "Sort by Price";
// sortSelect.add(priceOption);

// const productList = new ProductList(
//   "tent",
//   new ExternalServices(),
//   document.querySelector(".product-list")
// );

// productList.init();
// document.querySelector(".products").prepend(sortSelect);
