const Schema = require('mongoose').Schema
const plm = require('passport-local-mongoose')

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  }, 
  role: {
    type: String,
    enum: ['Administrador', 'Tesorero', 'Seguridad', 'Residente', 'Vigilante'],
    default: "Residente"
  },
  home: String,
  job: {
    type: String,
    enum: ['plomero', 'jardinero', 'mecánico', 'electricista', 'abogado', 'médico', 'dentista', 'contador', 'none'],
    default: 'none'
  },
  photoURL: {
    type: String,
    default: "/profile.png"
  }
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

userSchema.plugin(plm,{usernameField: 'email'})
module.exports = require('mongoose').model('User', userSchema)