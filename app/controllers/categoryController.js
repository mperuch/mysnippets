const uuidv4 = require('uuid/v4');
const { Category, Snippet } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const categories = await Category.findAll({
        where: { UserId: req.session.user.id },
        order: [['title']],
        include: [Snippet],
      });

      const category = await Category.findOne({ where: { uuid: req.params.uuid } });

      const snippets = await Snippet.findAll({
        where: { CategoryId: category.id },
      });

      return res.render('categories/show', { categories, snippets, activeCategory: category.uuid });
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const category = await Category.create({
        ...req.body,
        UserId: req.session.user.id,
        uuid: uuidv4(),
      });

      // req.flash('success', 'Categoria criada com sucesso.');

      return res.redirect(`/app/categories/${category.uuid}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Category.destroy({ where: { uuid: req.params.uuid } });

      // req.flash('success', 'Categoria excluída com sucesso.');
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
