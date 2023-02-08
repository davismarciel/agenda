const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
})

const homeModel = mongoose.model('Home', HomeSchema)

class Home {
  constructor()

}

module.exports = Home

