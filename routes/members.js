const express = require('express')
const router = express.Router()
const Member = require('../model/membersModel')

// Getting all
router.get('/', async (req, res) => {
  try {
    const members = await Member.find()

    res.json(members)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Getting one, getMember is the middleware that contains some functionality
router.get('/:id', getMember, (req, res) => {
  res.send(res.member)
})

// Creating one 
router.post('/', async (req, res) => {
  const member = new Member({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })

  try {    
    const newMember = await member.save()
    res.status(201).json(newMember)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// Updating one
router.patch('/:id', getMember, async (req, res) => {
  // updateSelector('name', req, res)

  // updateSelector('username', req, res)

  // updateSelector('password', req, res)

  // updateSelector('email', req, res)

  if (req.body.name != null) {
    res.member.name = req.body.name
  }

  if (req.body.username != null) {
    res.member.username= req.body.username
  }

  if (req.body.password != null) {
    res.member.password = req.body.password
  }

  if (req.body.email != null) {
    res.member.email = req.body.email
  }

  try {
    const updatedMember = await res.member.save()
    res.json(updatedMember)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// Deleting one
router.delete('/:id', getMember, async (req, res) => {
  try {
    await res.member.remove()

    res.json({message: `Successfully deleted member ${res.member}`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Deleting all
router.delete('/', async (req, res) => {
  try {
    await Member.find().deleteMany()

    res.json("Removed All members")
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Middleware to not do DRY 
async function getMember(req, res, next) {
  try {
    member = await Member.findById(req.params.id)

    if (member == null) {
      return res.status(404).json({message: '404 cannot find the member'})
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

  res.member = member
  next()
}

module.exports = router