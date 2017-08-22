import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  timezone: { type: String, required: true },
  createdAt: { type: Date, defualt: Date.now }
})

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch)
  })
}

const noop = () => {}
userSchema.pre("save", function(done) {
  const user = this
  if (!user.isModified("password")) {
    return done()
  }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return done(err)
    }
    bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
      if (err) {
        return done(err)
      }
      user.password = hashedPassword
      done()
    })
  })
})

export default mongoose.model('User', userSchema)