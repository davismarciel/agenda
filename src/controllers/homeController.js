const Contato = require('../models/ContatoModel')

exports.index = async(req, res) => {
  const contatos = await Contato.findContacts()
  res.render('index', { contatos })
  return
}


// Login routes



/*

Controllers controlam o Model e o View da página da aplicação

1 -> Exportei uma função que cria para a página inicial 
um render da página INDEX.EJS, com uma variável local
2 -> Exportei uma função que trata o POST do form

*/

