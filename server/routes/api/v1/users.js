import express from 'express'
import isEmpty from 'lodash/isEmpty'

import User from '../../../models/User'

const router = express.Router()

router.post('/signup', (req, res, next) => {
  const errors = {}
  const { username, password, email, timezone } = req.body

  User.findOne({ username: username }, (err, user) => {
    if (err) { return next(err) }
    
    if (user) {
      errors.username = 'This username is already existed'
    } else {
      const newUser = new User({
        username: username,
        password: password,
        email: email,
        timezone: timezone
      })

      newUser.save(next)
    }

    res.json({ errors, isValid: isEmpty(errors) })
  })
})

export default router