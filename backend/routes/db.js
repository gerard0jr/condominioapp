const router  = require('express').Router();
const passport = require('passport')
const Residence = require('../models/Residence')

const isAuth = (req,res,next) => {
  if(req.isAuthenticated()) return next()
  return res.status(403).json({message: 'User not logged in'})
}

router.post('/new-residence', (req,res,next) => {
  Residence.create(req.body)
  .then(response => res.status(201).json(response))
  .catch(err => res.status(500).json(err))
})

router.post('/newData/:id', (req,res,next) => {
  const { id } = req.params
  Residence.findByIdAndUpdate(id, {$set: req.body}, {new: true})
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