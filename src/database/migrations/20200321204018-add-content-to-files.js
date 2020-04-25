module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'content', {
      type: Sequelize.TEXT,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'content');
  },
};
