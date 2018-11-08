require("console-stamp")(console, {
  colors: {
    stamp: "yellow",
    label: "cyan",
    label: true,
    metadata: "green"
  }
});

const request = require("request-promise");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Starting scraper written by Eric ;)");

let mobile_stock = "https://www.supremenewyork.com/mobile_stock.json";
let desktop_stock = "https://www.supremenewyork.com/shop.json";

init();

const categories = {
  Bags: {},
  Jackets: {},
  "Tops/Sweaters": {},
  Sweatshirts: {},
  Pants: {},
  "T-Shirts": {},
  Accessories: {},
  Hats: {},
  Shoes: {},
  Skate: {}
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function init() {
  rl.question(
    "What API you want to scrape from? (mobile) or (desktop): ",
    answer => {
      if (answer == "mobile") {
        console.log("Selecting mobile scraper...");
        startMobileScraper();
      } else if (answer == "desktop") {
        console.log("Selecting desktop scraper...");
        startDesktopScraper();
      } else {
        console.log("Selecting default...");
      }
    }
  );
}

function startMobileScraper() {
  rl.question("Which category you want to scrape: ", answer => {
    for (const key of Object.keys(categories)) {
      if (answer.toLowerCase() == key.toLowerCase()) {
        console.log("[CATEGORY]: " + key + " selected...");
        const updated = answer.capitalize();
        setTimeout(() => {
          let opts = {
            uri: mobile_stock,
            resolveWithFullResponse: true
          };

          request(opts)
            .then(res => {
              let parsed = JSON.parse(res.body);
              let category = parsed["products_and_categories"][updated];

              fs.writeFile("product.json", JSON.stringify(category), err => {
                if (err) throw err;

                console.log("Saved product information!");
                process.exit(1);
              });
            })
            .catch(err => {
              if (err) throw err;
            });
        }, 1000);
      }
    }
  });
}

function startDesktopScraper() {
  rl.question("Which category you want to scrape: ", answer => {
    for (const key of Object.keys(categories)) {
      if (answer.toLowerCase() == key.toLowerCase()) {
        console.log("[CATEGORY]: " + key + " selected...");
        const updated = answer.capitalize();
        setTimeout(() => {
          let opts = {
            uri: mobile_stock,
            resolveWithFullResponse: true
          };

          request(opts)
            .then(res => {
              let parsed = JSON.parse(res.body);
              let category = parsed["products_and_categories"][updated];

              fs.writeFile("product.json", JSON.stringify(category), err => {
                if (err) throw err;

                console.log("Saved product information!");
                process.exit(1);
              });
            })
            .catch(err => {
              if (err) throw err;
            });
        }, 1000);
      }
    }
  });
}
