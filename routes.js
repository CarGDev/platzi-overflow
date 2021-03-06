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
    path: '/create-user',
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
    handler: user.createUser
  },
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  {
    path: '/validate-user',
    method: 'GET',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password: Joi.string().required().min(6)
        })
      }
    },
    handler: user.validateUser
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
