const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if(req.session.user) return res.render('logged')
  res.render('login')
  return
}

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.register() 
  
    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(function() {
        return res.redirect('/login/index') 
      })
      return
    }
    req.flash('success', 'Seu usúario foi criado com sucesso!')
    req.session.save(function() {
      return res.redirect('/login/index') 
    })
  } catch(err) {
    console.log(err)
    return res.render('error')
  }
}

exports.login = async function(req, res) {
  try {
    const login = new Login(req.body)
    await login.login() 
  
    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(function() {
        return res.redirect('/login/index') 
      })
      return
    }
    req.flash('success', 'Você entrou no sistema!')
    req.session.user = login.user
    req.session.save(function() {
      return res.redirect('/login/index') 
    })
  } catch(err) {
    console.log(err)
    return res.render('error')
  }
}

exports.logout = function(req, res) {
  req.session.destroy()
  res.redirect('/')
}