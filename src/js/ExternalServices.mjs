const baseURL = "https://wdd330-backend.onrender.com/"
// const checkoutURL = "http://server-nodejs.cit.byui.edu:3000/checkout"

async function convertToJson(res) {
  let jsonResponse = await  res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}
  
export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }
  // getData() {
  //   return fetch(this.path)
  //     .then(convertToJson)
  //     .then((data) => data);
  // }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
  }
  // This is an async method called "searchAllCategories" that accepts a string parameter "searchString"
  // async searchAllCategories(searchString) {
  //   let categories = ["tents", "backpacks", "hammocks", "sleeping-bags"]; // list of all categories or Defines an array of category names
  //   let searchResults = []; // Define an empty array to store the searchResult

  // // Iterate through each category in the "categories" array using a "for...of" loop
  // for (let category of categories) {
  //   const data = await this.getData(category); // Call the "getData" method of the "this" object and pass the current category as an argument to get data for that category
    
  //   // Use the "filter" method to filter the data by checking if the "Name" property of each item contains the search string (case-insensitive)
  //   // Then use the "spread" operator to append the filtered data to the "searchResults" array
  //   // searchResults.push(...data.filter(item => item.Name.toLowerCase().includes(searchString.toLowerCase()))); 
  //   let matchedProduct = data.filter(element => 
  //     element.Name.toLowerCase().includes(`${searchString}`));
  //     for (const item of matchedProduct) {
  //       searchResults.push(item)
  //     }
  //     // console.log(matchedProduct)
  // }

  // return searchResults; // Return the array of filtered results

  // }

  async searchCategory(category, searchString) {
    const data = await this.getData(category);
    const searchResults = data.filter(item => item.Name.toLowerCase().includes(searchString.toLowerCase()));
    return searchResults;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  async loginRequest(user){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(baseURL + "login", options).then(
      convertToJson
    );
    return response.accessToken;
  }

  // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
  async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }
}
