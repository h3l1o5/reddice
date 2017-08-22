import express from 'express'

import validateInput from '../../../shared/validations/signup'

const router = express.Router()

router.post('/signup', (req, res) => {
  const { errors, isValid } = validateInput(req.body)

  if (!isValid) {
    res.json(errors)
  }
})

export default router