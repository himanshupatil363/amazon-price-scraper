const axios = require("axios");
const cheerio = require("cheerio");
const JsonToCsv = require("json2csv").parse;
const FileSystem = require("fs");
var prompt = require("prompt-sync")();
const products = [];
const output = [];
const n = prompt("Enter the number of products you want to search ");
console.log("Enter product names seperated by line");
//Takes line seperated input of product names from user
for (let i = 0; i < n; i++) {
  products.push(prompt());
}
//Loops through each item and generates csv of final output
(async () => {
  for await (product of products) {
    const average = await getAverage(product);
    output.push({
      product,
      average
    });
  }
  const csv = JsonToCsv(output, {
    fields: ["product", "average"]
  });
  try {
    FileSystem.writeFileSync("./result.csv", csv);
    console.log("result.csv file created successfully");
  } catch (error) {
    if (error.errno === -4082) {
      console.log("close the result.csv file if open");
    } else {
      console.log(error);
    }
  }
})();
//Takes product as an arguement and returns average 20 search results
const getAverage = async (product) => {
  try {
    //Connects with the website
    const webUrl = `https://www.amazon.in/s?k=${product}`;
    const {
      data
    } = await axios({
      method: "GET",
      url: webUrl,
      headers: {
        authority: "www.amazon.com",
        pragma: "no-cache",
        "cache-control": "no-cache",
        dnt: "1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-fetch-site": "none",
        "sec-fetch-mode": "navigate",
        "sec-fetch-dest": "document",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      },
    });
    //Loads website data
    const $ = cheerio.load(data);
    //Drills down to all search results 
    const results = $(
      "div.s-main-slot.s-result-list.s-search-results.sg-row"
    ).children();
    //Gives an array of prices
    raw = results.find("span.a-offscreen").text().split("₹");
    cleaned = [];
    //Removes empty strings, commas and returns array of prices in integer form
    raw = raw.filter((j) => j);
    for (let i = 0; i < 20; i++) {
      cleaned.push(parseInt(raw[i].replace(/,/g, "")));
    }
    //returns average
    return cleaned.reduce((a, b) => a + b) / cleaned.length;
  } catch (error) {
    console.log(error);
  }
};