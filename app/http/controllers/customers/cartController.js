const cartController = () => {
  return {
    // render cart page
    index(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      // if cart is not preset
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0
        }
      }
      let cart = req.session.cart;

      // check if item already present in cart
      if (!cart.items[req.body.id]) {
        cart.items[req.body.id] = {
          item: req.body,
          qty: 1
        };
        cart.totalQty += 1;
        cart.totalPrice += Number(req.body.price)
      } else {
        cart.items[req.body.id].qty += 1;
        cart.totalQty += 1;
        cart.totalPrice += Number(req.body.price)
      }
      console.log(cart)

      req.session.cart = cart;

      res.json({ totalQty: req.session.cart.totalQty })
    }
  }
}

module.exports = cartController;
