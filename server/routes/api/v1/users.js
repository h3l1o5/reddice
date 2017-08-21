import express from 'express'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

const router = express.Router()

const validateInput = (data) => {
  let errors = {}

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required'
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid'
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required'
  } else {
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match'
    }
  }

  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

router.post('/signup', (req, res) => {
  const { errors, isValid } = validateInput(req.body)

  if (!isValid) {
    res.json(errors)
  }
})

export default router