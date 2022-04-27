import axios from 'axios';
import Noty from 'noty';

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemCounter = document.querySelector(".cartItemCount");
const updateCart = (item) => {
  axios.post("/cart/update", item).then(d => {
    cartItemCounter.textContent = d.data.totalQty;
    new Noty({
      type: "success",
      timeout: 2000,
      text: "Item added to cart."
    }).show();
  }).catch(err => {
    new Noty({
      type: "error",
      timeout: 2000,
      text: "Something went wrong."
    }).show();
  })
}

addToCartButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const item = JSON.parse(btn.dataset.item);
    updateCart(item);
  })
})
