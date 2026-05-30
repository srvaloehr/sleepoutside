import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const titleElement = document.querySelector(".product-list-title");
titleElement.textContent = `Top Products: ${categoryNames[category]}`;
const myList = new ProductList(category, dataSource, listElement);
myList.init();
