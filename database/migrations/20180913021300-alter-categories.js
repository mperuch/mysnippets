module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn('Categories', 'uuid', DataTypes.UUID);
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Categories', 'uuid');
  },
};
