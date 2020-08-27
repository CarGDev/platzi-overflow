'use strict'

const Hapi = require('hapi')
const inert = require('inert')
const path = require('path')
const handlebars = require('handlebars')
const vision = require('vision')
const server = Hapi.Server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {

  try {
    await server.register(inert)
    await server.register(vision)

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'view'
    })
    server.route({
      method: 'GET',
      path: '/home',
      handler: (req, h) => {
        return h.file('index.html')
      }
    })

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          index: ['index.html']
        }
      }
    })
    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Launch server in ${server.info.uri}`)
}

init()
