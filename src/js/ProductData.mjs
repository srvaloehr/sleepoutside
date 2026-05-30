const baseURL = 'https://wdd330-backend.onrender.com/';
console.log('baseURL:', baseURL);
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {

  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

async getAllProducts() {
  const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
  const results = await Promise.all(categories.map(c => this.getData(c)));
  return results.flat();
}
}