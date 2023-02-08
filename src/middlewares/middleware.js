exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('error')
  }
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}


exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login para cadastrar contatos')
    req.session.save(() => res.redirect('/'))
      return
    }
    next()
}
/*

Middleware são funções executadas no meio das Rotas

1 -> Exportei uma função que armazena uma variável local
2 -> Exportei uma função que trata os erros do CSRF do form
3 -> Eles serão usados depois de eu tratar as minhas rotas, para assim definir
se o formulário foi enviado ou não com erro!


*/


