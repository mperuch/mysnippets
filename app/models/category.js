module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    uuid: DataTypes.UUID,
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User);
    Category.hasMany(models.Snippet);
  };

  return Category;
};
