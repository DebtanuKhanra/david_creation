const { prisma } = require("../../../models/db");
const moment = require("moment");

const orderController = () => {
  return {
    async getOrder(req, res) {
      const orders = await prisma.order.findMany({
        where: {
          status: {
            not: "completed"
          }
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: true
        }
      });
      res.render("admin/orders", { orders, moment })
    },

    async updateStatus(req, res) {
      const {orderId: id, status} = req.body;

      const order = await prisma.order.update({
        where: {
          id
        },
        data: {
          status
        }
      });
      return res.redirect("/admin/orders");
    }
  }
}

module.exports = orderController;
