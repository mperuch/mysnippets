module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Sessions', {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primariKey: true,
      },
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
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
    queryInterface.dropTable('Sessions');
  },
};
