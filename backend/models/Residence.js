const Schema = require('mongoose').Schema

const residenceSchema = new Schema({
  name: String,
  street: String,
  number: Number,
  remainAddress: String
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Residence', residenceSchema)