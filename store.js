const removeBtn = document.querySelectorAll('.btn-danger');
removeBtn.forEach(btn => {
  btn.addEventListener('click', removeCartItem)
})

const quantityInputs = document.querySelectorAll('.cart-quantity-input');
quantityInputs.forEach(input => {
  input.addEventListener('change', quantityChanged);
})

const addToCartButtons = document.querySelectorAll('.shop-item-button');
addToCartButtons.forEach(btn => {
  btn.addEventListener('click', addToCart);
})

function quantityChanged(e) {
  const input = e.target;
    if(isNaN(input.value) || input.value <= 0) {
       input.value = 1;
    }
    updateCartTotal();
}

function addToCart(e) {
  const btn = e.target;
  const shopItem = btn.parentElement.parentElement;
  const title = shopItem.querySelector('.shop-item-title').innerText;
  const price = shopItem.querySelector('.shop-item-price').innerText;
  const imgSrc = shopItem.querySelector('.shop-item-image').src;
  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelector('.cart-items');
  const cartItemNames = cartItems.querySelectorAll('.cart-item-title');
  for(let i = 0; i < cartItemNames.length; i++) {
    if(cartItemNames[i].innerText === title ) {
      alert('Item is already added');
      return;
    }
  }
  const cartRowContents = `
    <div class="cart-item cart-column">
      <img
        class="cart-item-image"
        src=${imgSrc}
        width="100"
        height="100"
      />
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" />
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);
  cartRow.querySelectorAll('.btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function removeCartItem(e) {
  const buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal(){
  const cartItemContainer = document.querySelectorAll('.cart-items')[0];
  const cartRows = cartItemContainer.querySelectorAll('.cart-row');
  let total = 0;
  cartRows.forEach(row => {
    const priceElement = row.querySelector('.cart-price');
    const quantityElement = row.querySelector('.cart-quantity-input');
    const price = parseFloat(priceElement.innerText.replace('$', ''))
    const quantity = quantityElement.value;
    total = total + (price * quantity);
  })
  document.querySelector('.cart-total-price').innerText = '$' + total.toFixed(2);
}