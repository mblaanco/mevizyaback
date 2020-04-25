module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('files', 'dt_ini', {
        type: Sequelize.DATE,
        allowNull: true,
      })
      .then(function() {
        queryInterface.addColumn('files', 'dt_fim', {
          type: Sequelize.DATE,
          allowNull: true,
        });
      });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'dt_ini').then(function() {
      queryInterface.removeColumn('files', 'dt_fim');
    });
  },
};
