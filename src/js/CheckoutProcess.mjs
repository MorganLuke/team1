import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  console.log(convertedJSON);
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}
export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
    // calculateItemSummary() {
    //   // calculate and display the total amount of the items in the cart, and 
    // //   the number of items.
    // const numItems = document.querySelector(this.outputSelector + "#numItems")
    // numItems.innerHTML = this.list.length;

    // const subTotal = document.querySelector(this.outputSelector + "subtotal")
    // const amount = this.list.map((item) => item.FinalPrice);
    // this.itemTotal = amount.reduce((sum, item) => sum + item);
    // subTotal.innerText = "$" + this.itemTotal;

    // }
    calculateItemSummary() {
      const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal"
      );
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items"
      );
      itemNumElement.innerText = this.list.length;
      // calculate the total of all the items in the cart
      const amounts = this.list.map((item) => item.FinalPrice);
      this.itemTotal = amounts.reduce((sum, item) => sum + item);
      summaryElement.innerText = "$" + this.itemTotal;
    }
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
      // display the totals.
    }
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector(this.outputSelector + " #shipping");
      const tax = document.querySelector(this.outputSelector + " #tax");
      const orderTotal = document.querySelector(
        this.outputSelector + " #orderTotal"
      );
      shipping.innerText = "$" + this.shipping;
      tax.innerText = "$" + this.tax;
      orderTotal.innerText = "$" + this.orderTotal;
    }
    async checkout() {
        const formElement = document.forms["checkout"];


        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        // json.fname = document.querySelector(this.outputSelector + " #fname");
        // json.lname = this.lname;
        // json.street = this.street;
        // json.city = this.city;
        // json.state = this.state;
        // json.zip = this.zip;
        // json.cardNumber = this.cardNumber;
        // json.experation = this.experation;
        // json.code = this.code;
        
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }

    