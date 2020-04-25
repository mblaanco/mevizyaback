import Sequelize, { Model } from 'sequelize';

class Uxcounter extends Model {
  static init(sequelize) {
    super.init(
      {
        function_name: Sequelize.STRING,
        count: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Uxcounter;
