const uuidv4 = require('uuid/v4');
const { Category, Snippet } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryUuid } = req.params;

      const category = await Category.findOne({ where: { uuid: categoryUuid } });

      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: category.id,
        uuid: uuidv4(),
      });

      // req.flash('success', 'Snippet criado com sucesso.');

      return res.redirect(`/app/categories/${categoryUuid}/snippets/${snippet.uuid}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { categoryUuid, uuid } = req.params;

      const categories = await Category.findAll({
        where: { UserId: req.session.user.id },
        order: [['title']],
        include: [Snippet],
      });

      const category = await Category.findOne({ where: { uuid: categoryUuid } });

      const snippets = await Snippet.findAll({
        where: { CategoryId: category.id },
      });

      const snippet = await Snippet.findOne({ where: { uuid } });

      return res.render('snippets/show', {
        activeCategory: category,
        categories,
        snippets,
        currentSnippet: snippet,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const snippet = await Snippet.findOne({ where: { uuid: req.params.uuid } });

      await snippet.update(req.body);

      // req.flash('success', 'Snippet atualizado com sucesso.');
      return res.redirect(`/app/categories/${req.params.categoryUuid}/snippets/${snippet.uuid}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Snippet.destroy({ where: { uuid: req.params.uuid } });

      // req.flash('success', 'Snippet excluído com sucesso.');
      return res.redirect(`/app/categories/${req.params.categoryUuid}`);
    } catch (err) {
      return next(err);
    }
  },
};
