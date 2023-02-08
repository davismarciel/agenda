require('dotenv').config()

const express = require('express')
const app = express()


/* 

Mongoose retorna uma promise, então, utitilizando Then
Peço para ele emitir um sinal de "Pronto" quando o código 
passar executando normalmente

*/
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('Pronto')
  })
  .catch(e => console.log(`Erro: ${e}`))

// Importação das rotas
const routes = require('./routes')

const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')

// Importação dos middlewares
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')

app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

// Configs da session
const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
  })
  
app.use(sessionOptions);
app.use(flash());

// Setando o caminho de onde deve vir as Views da aplicação
app.set('views', path.resolve(__dirname, 'src', 'views'))
// E também o tipo de engine que está sendos
app.set('view engine', 'ejs')

app.use(csrf())

// Nossos middlewares
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)

app.use(routes)

// Quando o "emit", mandar o "Pronto" 
// O server será iniciado com sucesso
app.on('Pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
    console.log('Servidor executando na porta 3000')
  })
})

