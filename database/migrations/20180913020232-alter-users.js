module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.addColumn('Users', 'uuid', DataTypes.UUID);
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Users', 'uuid');
  },
};
