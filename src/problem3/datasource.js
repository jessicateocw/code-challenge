import fetch from "node-fetch";

class Datasource {
  // getPrices() - returns an array of prices in Promise
  async getPrices() {
    try {
      const response = await fetch("https://interview.switcheo.com/test.json");
      const { data } = await response.json();
      if (data && data.prices) {
        return data.prices.map((price) => {
          return {
            pair: price.pair,
            mid: () => (price.buy + price.sell) / 2,
            quote: () => price.pair.substr(3),
          };
        });
      }
    } catch (error) {
      console.log(`Error message: ${error}`);
    }
  }
}

const ds = new Datasource();

//Testing
ds.getPrices()
  .then((prices) => {
    if (prices) {
      prices.forEach((price) => {
        console.log(
          `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
        );
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
