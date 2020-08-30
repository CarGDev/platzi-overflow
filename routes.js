'use strict'
const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')


module.exports  = [
  {
    method: 'GET',
    path: '/',
    handler: site.home
  },

  {
  method: 'GET',
  path: '/register',
  handler: site.register
  },
  {
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password: Joi.string().required().min(6)
        })
      }
    },
    path: '/create-user',
    handler: user.createUser
  },

  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  }
]
