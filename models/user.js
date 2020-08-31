'use strict'

const bcrypt = require('bcrypt')
const { users } = require('.')

class Users {
  constructor (db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('users')
  }

  async create (data) {
    console.log(data)
    const user = {
      ...data
    }
    user.password = await this.constructor.encrypt(data.password)
    const newUser = this.collection.push(user)
    // newUser.set(data)

    return newUser.key
  }

  async validateUser (data) {
    console.log(data)
    const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value')
    const userFound = userQuery.val()
    if (userFound) {
      const userID = Object.keys(userFound)[0]
      const passwordRigth = await bcrypt.compare(data.password, userFound[userID.password])
      const result = (passwordRigth) ? userFound[userID] : false
      return result
    }

    return false
  }

  static async encrypt (passwd) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(passwd, saltRounds)
    return hashedPassword
  }
}


module.exports = Users
