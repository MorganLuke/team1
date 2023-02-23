import { cartTotals } from "./cartTotals";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
export function renderWithTemplate(
  template,
  parentElement,
  data,
  position = "afterbegin",
  callback
) {
  // if clear is true we need to clear out the contents of the parent.

    parentElement.insertAdjacentHTML(position, template);
    if (callback) {
      callback(data);
  }
}
export async function loadTemplate(path) {
  let response = await fetch(path);
  response = await response.text();
  return response;
}
export async function loadHeaderFooter() {
  let header = "../partials/header.html";
  let footer = "../partials/footer.html";
  let hTemplate = await loadTemplate(header);
  let fTemplate = await loadTemplate(footer);
  let headerEl = document.querySelector("#main-header");
  let footerEl = document.querySelector("#main-footer");
  renderWithTemplate(hTemplate, headerEl);
  renderWithTemplate(fTemplate, footerEl);
  cartTotals();
}

export async function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
