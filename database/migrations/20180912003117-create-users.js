module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(128),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(128),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(128),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    queryInterface.dropTable('Users');
  },
};
