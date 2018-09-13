const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },

  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado!');
        return res.redirect('back');
      }

      req.checkBody('name', 'Nome é obrigatório').notEmpty();
      req.checkBody('email', 'E-mail é obrigatório').notEmpty();
      req.checkBody('email', 'Formato de e-mail inválido').isEmail();
      req.checkBody('password', 'Senha é obrigatória').notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        return res.redirect('back');
      }

      const password = await bcrypt.hash(req.body.password, 5);

      await User.create({ ...req.body, password, uuid: uuidv4() });

      req.flash('success', 'Conta criada com sucesso!');
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },

  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;

      req.checkBody('email', 'E-mail é obrigatório').notEmpty();
      req.checkBody('email', 'Formato de e-mail inválido').isEmail();
      req.checkBody('password', 'Senha é obrigatória').notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        return res.redirect('back');
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error', 'Usuário não encontrado.');
        return res.redirect('back');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        req.flash('error', 'Senha incorreta.');
        return res.redirect('back');
      }

      req.session.user = user;
      return req.session.save(() => res.redirect('app/dashboard'));
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
