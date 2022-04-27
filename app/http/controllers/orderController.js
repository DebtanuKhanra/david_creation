const { prisma } = require("../../models/db");
const moment = require("moment");

const statusPrecedence = {
  "order_placed": 0,
  "confirmed": 1,
  "prepared": 2,
  "delivered": 3,
  "completed": 4
}

const orderController = () => {
  return {
    async getOrder(req, res) {
      res.header('Cache-Control', 'no-store');
      const orders = await prisma.order.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
      res.render("customers/orders", { orders, moment })
    },
    async storeOrder(req, res) {
      const { address } = req.body;
      // insufficient data
      if (!address) {
        req.flash("error", "Address is required");
        return res.redirect("/cart");
      }

      const order = await prisma.order.create({
        data: {
          userId: req.user.id,
          items: req.session.cart.items,
          address
        }
      })
      req.session.cart = {
        items: {},
        totalQty: 0,
        totalPrice: 0,
      };
      req.flash("success", "Order placed successfully");
      res.redirect("/orders")
    },
    async show(req, res) {
      const order = await prisma.order.findFirst({
        where: {
          id: req.params.id,
          userId: req.user.id,
        }
      });

      if (order) {
        res.render("customers/singleOrder", {order, statusPrecedence});
      } else {
        return res.redirect("/");
      }
    }
  }
}

module.exports = orderController;
