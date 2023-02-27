const request = require('supertest')

const assert = require('assert')

const { app } = require('../../src/server')

describe('Integration tests for repos controller', () => {
  describe('Test for GET language route', () => {
    it('should return status code 200 and list of programming languages', async () => {
         let response = {}
         const language = 'javascript'
        await assert.doesNotReject(async () => {
          response = await request(app).get(`/repos/${language}`)
        })
        assert.equal(response.status, 200)
      })

     it('should return status code 422 when programming language is invalid', async () => {
        let response = {}
        const language = 'jsdjadkajskfjalk'
       await assert.doesNotReject(async () => {
         response = await request(app).get(`/repos/${language}`)
       })
       assert.equal(response.status, 422)
     })
  })
})
