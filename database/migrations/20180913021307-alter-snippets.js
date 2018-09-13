module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn('Snippets', 'uuid', DataTypes.UUID);
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Snippets', 'uuid');
  },
};
