import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../../../models/User'
import config from '../../../config'

const router = express.Router()

router.post('/', (req, res, next) => {
  const { identifier, password } = req.body

  User.findOne({$or: [{username: identifier}, {email: identifier}]}, (err, user) => {
    if (err) { return next(err) }
    if (!user) {
      res.status(401).json({ errors: { form: 'Invalid Credentials' }})      
    } else {
      user.checkPassword(password, (err, isMatch) => {
        if (err) { next(err) }
        if (isMatch) {
          const token = jwt.sign({
            id: user._id,
            username: user.username
          }, config.jwtSecret)
          res.json({ token })
        } else {
          res.status(401).json({ errors: { form: 'Invalid Credentials' }})        
        }
      })
    }
  })
  
})

export default router