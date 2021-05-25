const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const TarefasController = require('./controllers/TarefasController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/users', UsersController.pesquisar);
routes.post('/users', UsersController.inserir);

routes.get('/tarefas', TarefasController.pesquisar);
routes.get('/tarefas', TarefasController.pesquisarUnico);
routes.post('/tarefas', TarefasController.inserir);
routes.delete('/tarefas/:id', TarefasController.delete);

module.exports = routes;