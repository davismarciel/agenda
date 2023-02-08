const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/middleware')

// Home route
route.get('/', homeController.index)

// Login routes
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Contact routes (LOGIN REQUIRED)
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/index/:id', loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequired, contatoController.edit)
route.get('/contato/delete/:id', loginRequired, contatoController.delete)

module.exports = route

/*

Rotas decidem qual controller irá comandar as configs das nossas páginas
São como mini aplicações dentro da nossa aplicação principal

1 -> Eu necessito de importar o express
2 -> Eu trago o a função Router com uma variável
2 -> Eu importo as rotas usando a variável
3 -> Depois decido qual controller ela vai usar
4 -> Middlewares vão no meio dos controllers e das rotas
5 -> Depois exportamos a variável route usando Module.exports

*/
