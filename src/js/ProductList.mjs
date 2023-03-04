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
    <!-- Trigger/Open The Modal -->
      <button id="myBtn">Quick Lookup</button>

    <!-- The Modal -->
      <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
        <section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"
        />
        <p class="retail"> Retail Price: $${retail}</p>
        <p class="product_discount"> Discount: -$${discount.toFixed(2)}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <!-- <button id="addToCart" data-id="${product.Id}">Add to Cart</button> -->
        </div></section>
        </div>
        <div class="modal-footer">
        </div>
      </div>
      </div>
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
    
    const breadcrumbElement = document.querySelector(".breadcrumb");
    breadcrumbElement.innerHTML = "";
    if (this.category) {
      const homeElement = document.createElement("span")
      homeElement.innerHTML = `<a href="/">Home</a> > `
      breadcrumbElement.appendChild(homeElement)
    }
    if (this.category) {
      const categoryElement = document.createElement("span");
      categoryElement.innerHTML = `${this.category.charAt(0).toUpperCase() + this.category.slice(1)} > `;
      breadcrumbElement.appendChild(categoryElement);
    }
    const productCategoryElement = document.createElement("span");
    productCategoryElement.innerHTML = `(${list.length} items)`;
    breadcrumbElement.appendChild(productCategoryElement);

    // Add event listeners for sorting by name and price
    document.getElementById("sort-by-name").addEventListener("click", this.sortByName);
    document.getElementById("sort-by-price").addEventListener("click", this.sortByPrice);

    // modal quick lookup
    this.modal()
  }

  modal(){
    // Get the button that opens the modal
    let btn = document.querySelectorAll("#myBtn");

    // All page modals
    let modals = document.querySelectorAll('#myModal');

    // Get the <span> element that closes the modal
    let spans = document.getElementsByClassName("close");

    // When the user clicks the button, open the modal
    for (let i = 0; i < btn.length; i++) {
     btn[i].onclick = function(e) {
        e.preventDefault();
        // modal = document.querySelector(e.target.getAttribute("href"));
        modals[i].style.display = "block";
     }
    }

    // When the user clicks on <span> (x), close the modal
    for (let i = 0; i < spans.length; i++) {
     spans[i].onclick = function() {
        for (let index in modals) {
          if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
        }
     }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
         for (let index in modals) {
          if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
         }
        }
    }
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
