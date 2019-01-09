const Schema = require('mongoose').Schema

const residenceSchema = new Schema({
  residenceName: String,
  street: String,
  number: Number,
  remainAddress: String,
  income: {
    type: Number,
    default: 0
  },
  outcome: {
    type: Number,
    default: 0
  },
  incomeDetail: Array,
  outcomeDetail: Array,
  reports: Array
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Residence', residenceSchema)