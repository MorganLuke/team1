

export default class Alert {
    constructor() {
        this.path = `../json/alerts.json`;
    }

    convertToJson(res) {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Bad Response");
        }
      }
      
    // read contents of Alerts.json
    async getData() {
        const res = await fetch(this.path);
        const data = await this.convertToJson(res);
        console.log(data);
        return data;
    }
    // if anything then loop through results and build a <p> for each alert

    async processAlert() {
        const alertData = await this.getData();
        console.log(alertData);
        let alertSection = document.createElement("section");
        alertSection.innerHTML = `<section class=alerts></section>`;
        alertData.map((item) => {   
            let para = document.createElement("p");
            para.innerHTMl = `Alert: ${item.message}`;
            // const newItem = `<p> Alert: ${item.message}</p>`;
            para.style.backgroundColor = `${item.background}`;
            para.style.color = `${item.color}`;
            alertSection.appendChild(para);
    })
        // alertSection.innerHTML(`${htmlItems}`);
        document.querySelector("main").prepend(`${alertSection}`);
    }

    // alertTemplate(item) {
    //     // HTML template for a single alert on product page
    //     console.log(item);
    //     const newItem = `<p> Alert: ${item.message}</p>`;
    //     newItem.style.backgroundColor = `${item.background}`;
    //     newItem.style.color = `${item.color}`;
    //     return newItem;
    // }

    
    // then apply background and forground colors to it base on alert specs

    // once built the <section> should be prepended to the main element on the product index page
}


/* <section class="alert-list"> */