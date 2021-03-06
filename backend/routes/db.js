const router  = require('express').Router();
const passport = require('passport')
const Residence = require('../models/Residence')

const isAuth = (req,res,next) => {
  if(req.isAuthenticated()) return next()
  return res.status(403).json({message: 'User not logged in'})
}

router.post('/newReport/:id', (req,res,next) => {
  const { id } = req.params
  Residence.findByIdAndUpdate(id, {$push: {reports: req.body}}, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/delete-report/:id', (req,res,next) => {
  const { id } = req.params
  let string = String(req.body.id)
  Residence.findByIdAndUpdate(id, {$pull:{reports: { description: string } }}, {new: true})
  .then(response => res.status(201).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/delete-income-value/:id', (req,res,next) => {
  const { id } = req.params
  let string = String(req.body.id)
  Residence.findByIdAndUpdate(id, {$pull:{incomeDetail: { incomeConcept: string } }}, {new: true})
  .then(response => res.status(201).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/delete-outcome-value/:id', (req,res,next) => {
  const { id } = req.params
  let string = String(req.body.id)
  Residence.findByIdAndUpdate(id, {$pull:{outcomeDetail: { outcomeConcept: string } }}, {new: true})
  .then(response => res.status(201).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/new-residence', (req,res,next) => {
  Residence.create(req.body)
  .then(response => res.status(201).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/totalIncome/:id', (req,res,next) => {
  const { id } = req.params
  Residence.findByIdAndUpdate(id, {$set: {income:Object.keys(req.body)[0]}}, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/totalOutcome/:id', (req,res,next) => {
  const { id } = req.params
  console.log(req.body)
  Residence.findByIdAndUpdate(id, {$set: {outcome: Object.keys(req.body)[0]}}, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/newIncome/:id', (req,res,next) => {
  const { id } = req.params
  Residence.findByIdAndUpdate(id, {$push: {incomeDetail: req.body}}, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/newOutcome/:id', (req,res,next) => {
  const { id } = req.params
  Residence.findByIdAndUpdate(id, {$push: {outcomeDetail: req.body}}, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

router.get('/residences', (req,res,next) => {
  Residence.find()
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

router.get('/residence/:id', (req,res,next) => {
  const { id } = req.params
  Residence.findById(id)
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router