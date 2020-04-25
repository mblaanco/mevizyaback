import * as Yup from 'yup';
import fs from 'fs';
import { resolve } from 'path';

import File from '../models/File';
import Uxcounter from '../models/Uxcounter';

class FileController {
  async index(req, res) {
    await Uxcounter.findOrCreate({
      where: { function_name: 'file_list' },
    });
    Uxcounter.findOne({
      where: { function_name: 'file_list' },
    }).then(count => {
      return count.increment('count');
    });

    if (req.body.file_id !== undefined && req.body.file_id !== null) {
      const lista = await File.findByPk(req.body.file_id);
      if (lista !== null) {
        return res.json(lista);
      }
      return res.status(401).json({ error: 'Lista não encontrada.' });
    }
    const listas = await File.findAll({
      where: {
        user_id: req.userId,
      },
    });
    return res.json(listas);
  }

  async store(req, res) {
    await Uxcounter.findOrCreate({
      where: { function_name: 'file_store' },
    });
    await Uxcounter.findOne({
      where: { function_name: 'file_store' },
    }).then(count => {
      return count.increment('count');
    });

    const user_id = req.userId;

    const { originalname: name, filename: path } = req.file;

    if (req.file.mimetype.includes('image')) {
      console.log('imagem');
      const file = await File.create({
        name,
        path,
        user_id,
      });

      return res.json(file);
    }
    if (req.file) {
      console.log('outro mimetype');
      const content = fs.readFileSync(
        resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', req.file.path),
        'utf-8'
      );
      const file = await File.create({
        name,
        path,
        user_id,
        content,
      });

      return res.json(file);
    }
    return res
      .status(400)
      .json({ error: 'O arquivo não foi recebido pelo servidor.' });
  }

  async update(req, res) {
    await Uxcounter.findOrCreate({
      where: { function_name: 'file_update' },
    });
    await Uxcounter.findOne({
      where: { function_name: 'file_update' },
    }).then(count => {
      return count.increment('count');
    });

    const schema = Yup.object().shape({
      list_id: Yup.number().required(),
      dt_ini: Yup.date().required(),
      dt_fim: Yup.date().required(),
    });
    const { midia } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    /**
     * Check if list_id is a valid
     */
    const lista = await File.findByPk(req.body.list_id);
    if (!lista) {
      return res.status(401).json({ error: 'Lista não encontrada.' });
    }
    const { id, dt_ini, dt_fim } = await lista.update(req.body);

    return res.json({
      id,
      dt_ini,
      dt_fim,
      midia,
    });
  }
}

export default new FileController();
