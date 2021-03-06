module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Snippets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
      },
      CategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(256),
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
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
    queryInterface.dropTable('Snippets');
  },
};
