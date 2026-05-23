import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  //remove listen
  document.querySelectorAll('.cart-card__remove') .forEach((btn) =>{ 
    btn.addEventListener('click', removeFromCart); 
  });

  if (cartItems.length > 0) {
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    const cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');
    cartFooter.querySelector('.cart-total').innerHTML = `Total: $${total.toFixed(2)}`;
  
  }
}

function removeFromCart(e) {
  const id = e.target.dataset.id; 
  const cartItems = getLocalStorage('so-cart') || [];
  const updatedCart = cartItems.filter((item) => item.Id !== id);
  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X<span>
</li>`;

  return newItem;
}

renderCartContents();
