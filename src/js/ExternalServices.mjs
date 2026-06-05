const baseURL = 'https://wdd330-backend.onrender.com/';
console.log('baseURL:', baseURL);

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}


export default class ExternalServices {

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

async checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch('https://wdd330-backend.onrender.com/checkout', options).then(convertToJson);
}
}