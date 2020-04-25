import File from '../models/File';
import User from '../models/User';
import Uxcounter from '../models/Uxcounter';

class TableController {
  async index(req, res) {
    await Uxcounter.findOrCreate({
      where: { function_name: 'ux_counter' },
    });
    Uxcounter.findOne({
      where: { function_name: 'ux_counter' },
    }).then(count => {
      return count.increment('count');
    });
    const uxcounter = await Uxcounter.findAll();
    return res.json(uxcounter);
  }

  async delete(req, res) {
    await Uxcounter.findOrCreate({
      where: { function_name: 'table_delete' },
    });
    Uxcounter.findOne({
      where: { function_name: 'table_delete' },
    }).then(count => {
      return count.increment('count');
    });

    File.destroy({
      where: {},
    });

    User.destroy({
      where: {},
    });

    return res.json({ success: 'All data are destroyed.' });
  }
}

export default new TableController();
