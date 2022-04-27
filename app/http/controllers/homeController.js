const { prisma } = require("../../models/db");

const homeController = () => {
  return {
    // render home page
    async index(req, res) {
      const menuItems = await prisma.menuItem.findMany();
      res.render("home", { menuItems });
    }
  }
}

module.exports = homeController;
