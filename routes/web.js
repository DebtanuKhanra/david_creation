const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");

// middlewares
// stop logged in users from accessing login, register routes
const guest = require("../app/http/middlewares/guest");
// stop users from making orders if not logged in
const auth = require("../app/http/middlewares/auth");
// only let admins access admin routes
const admin = require("../app/http/middlewares/admin");

const initRoutes = (app) => {

  // auth
  app.get("/", homeController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  // cart
  app.get("/cart", cartController().index);
  app.post("/cart/update", cartController().update);

  // orders
  app.get("/orders", auth, orderController().getOrder)
  app.get("/orders/:id", auth, orderController().show)
  app.post("/orders", auth, orderController().storeOrder)

  // admin routes
  app.get("/admin/orders", admin, AdminOrderController().getOrder)
  app.post("/admin/order/status", admin, AdminOrderController().updateStatus)

}

module.exports = {
  initRoutes
}
