import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TableController from './app/controllers/TableController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.get('/list', UserController.index);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
/** Rotas que exigem estar logado */
routes.put('/users', UserController.update);

routes.get('/uxcounter', TableController.index);
routes.delete('/deletall', TableController.delete);

routes.get('/files', FileController.index);
routes.post('/files', upload.single('file'), FileController.store);
routes.put('/updatelist', FileController.update);

// routes.get('/addlist', TableController.store);

export default routes;
