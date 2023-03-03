import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class Admin {
    constructor(outputSelector) {
        this.targetElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    }

async login(creds, next) {
    // I built the login method with a callback: next. 
    // This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
    try {
      this.token = await this.services.loginRequest(creds);
      next()
    } 
    catch(err) {
      // remember this from before?
      alertMessage(err.message.message);
    }
}

showLogin() {

    this.targetElement.innerHTML = loginTemplate();

    document.querySelector("#login").addEventListener("click", (e) => {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        this.login({ email, password }, this.showOrders.bind(this));
      });
}

async showOrders() {
    try {
      const orders = await this.services.getOrders(this.token);
      this.targetElement.innerHTML = orderTemplate();
      const parent = document.querySelector("#orders tbody");
      // why not a template like we have done before?  The markup here was simple enough that I didn't think it worth the overhead...but a template would certainly work!
      parent.innerHTML = orders
        .map(
          (order) =>
            `<tr><td>${order.id}</td><td>${new Date(
              order.orderDate
            ).toLocaleDateString("en-US")}</td><td>${
              order.items.length
            }</td><td>${order.orderTotal}</td></tr>`
        )
        .join("");
    } catch (err) {
      console.log(err);
    }
  }

}

function loginTemplate(){
    return `
    
        <fieldset>
            <legend>Login</legend>
            
            <label for="email">Email: </label>
            <input type="email" id="email" name="email" value="user1@email.com" required>
            
            <label for="password">Password: </label>
            <input type="password" id="password" name="password" required>
            
            <button type="submit" id="login" ">Login</button>
        </fieldset>`;
}


// test
function orderTemplate() {
    return `<h2>Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `;
}