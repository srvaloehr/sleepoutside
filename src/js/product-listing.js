import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const search = getParam("search");
const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const titleElement = document.querySelector(".product-list-title");

if (search) {
  titleElement.textContent = `Search Results: ${search}`;
  dataSource.getAllProducts().then((products) => {
    const filtered = products.filter((p) =>
      p.Name.toLowerCase().includes(search.toLowerCase()),
    );
    listElement.innerHTML = filtered
      .map(
        (p) => `<li class="product-card">
      <a href="/product_pages/?product=${p.Id}">
        <img src="${p.Images.PrimaryMedium}" alt="${p.Name}" />
        <h3 class="card__brand">${p.Brand.Name}</h3>
        <h2 class="card__name">${p.NameWithoutBrand}</h2>
        <p class="product-card__price">$${p.FinalPrice}</p>
      </a>
    </li>`,
      )
      .join("");
  });
} else {
  titleElement.textContent = `Top Products: ${categoryNames[category]}`;
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();
}
