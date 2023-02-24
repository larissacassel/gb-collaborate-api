const request = require('supertest')

const assert = require('assert')

const { app } = require('../../src/server')

describe('Integration tests for language controller', () => {
  describe('Test for GET language route', () => {
    it('should return status code 200 and list of programming languages', async () => {
         let response = {}
        await assert.doesNotReject(async () => {
          response = await request(app).get('/languages')
        })

        assert.equal(response.status, 200)
      })
  })
})
