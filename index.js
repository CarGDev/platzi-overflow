'use strict'

const Hapi = require('hapi')

const server = Hapi.Server({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

async function init () {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Connected'
    }
  })
  try {
    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Launch server in ${server.info.uri}`)
}

init()
