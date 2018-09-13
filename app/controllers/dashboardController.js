const { Category, Snippet } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const categories = await Category.findAll({
        where: { UserId: req.session.user.id },
        order: [['title']],
        include: [Snippet],
      });

      return res.render('dashboard/index', { categories, userName: req.session.user.name });
    } catch (err) {
      return next(err);
    }
  },
};
