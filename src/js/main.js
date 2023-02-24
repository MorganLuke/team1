import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { productCardTemplate } from "./ProductList.mjs";

loadHeaderFooter().then(() => {
  document.forms[0].addEventListener("submit", () => {
    let searchString = document.querySelector("#search-input").value;
    setLocalStorage("search-string", searchString.trim());
    renderSearchResult(searchString.trim().toLowerCase()); // call renderSearchResult function after form submission
  });
  //   const searchString = getLocalStorage("search-string").toLowerCase();
  //   const dataSource = new ExternalServices();
  //   const listUl = document.querySelector(".product-list"); // Enclose the selector in quotes
  //   const titleHtml = document.querySelector(".title");

  //   async function renderSearchResult(searchString) {
  //     // console.log(searchString)
  //     const searchResults = await dataSource.searchAllCategories(searchString);
  //     const searchResultsHtml = renderListWithTemplate(productCardTemplate, listUl, searchResults);
  //     listUl.innerHTML = searchResultsHtml;
  //     // titleHtml.innerHTML = `Search Results for "${searchString}"`;
  //     titleHtml.innerHTML = `Showing ${searchResults.length} results for "${searchString}"`
  //   }
  async function renderSearchResult(searchString) {
    const dataSource = new ExternalServices();
    const listUl = document.querySelector(".product-list");
    const titleHtml = document.querySelector(".title");
    let searchResults = [];

    // Search "tents" category separately
    searchResults = searchResults.concat(
      await dataSource.searchCategory("tents", searchString)
    );

    // Search other categories
    const categories = ["backpacks", "hammocks", "sleeping-bags"];
    for (let category of categories) {
      searchResults = searchResults.concat(
        await dataSource.searchCategory(category, searchString)
      );
    }

    if (searchResults.length === 0) {
      listUl.innerHTML = "No results found.";
    } else {
      renderListWithTemplate(productCardTemplate, listUl, searchResults);
      // listUl.innerHTML = searchResultsHtml;
      titleHtml.innerHTML = `Showing ${searchResults.length} results for "${searchString}"`;
    }
  }

  if (window.location.href.includes("/product-listing/product-search.html")) {
    console.log("Page redirected correctly");
    const searchString = getLocalStorage("search-string").toLowerCase(); // set searchString variable
    renderSearchResult(searchString);
  } else {
    console.log("Page redirect failed");
  }
});

// Get the modal element
var modal = document.getElementById("modal");

// Get the button that opens the modal
var registerBtn = document.getElementById("registerBtn");

// Get the close button element
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
registerBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
