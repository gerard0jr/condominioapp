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
    enum: ['administrador', 'tesorero', 'seguridad', 'condomino', 'vigilante'],
    default: "condomino"
  },
  home: String,
  job: {
    type: String,
    enum: ['plomero', 'jardinero', 'mecánico', 'electricista', 'abogado', 'médico', 'dentista', 'contador', 'none'],
    default: 'none'
  },
  photo: String
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

userSchema.plugin(plm,{usernameField: 'email'})
module.exports = require('mongoose').model('User', userSchema)