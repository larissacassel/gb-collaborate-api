const request = require('supertest')

const assert = require('assert')

const { app } = require('../../src/server')

describe('Integration tests for userCreate controller', () => {
  describe('Test for POST user route', () => {
    it('should return status code 404 when github user is invalid', async () => {
         let response = {}
        await assert.doesNotReject(async () => {
          response = await request(app).post('/user/create').send({
            userName: 'sfiajiodjfoaidjfioa',
            password: '123456',
            confirmPassword: '123456',
          })
        })

        assert.equal(response.status, 404)
      })

      it('should return status code 422 when github user not submitted', async () => {
        let response = {}
       await assert.doesNotReject(async () => {
         response = await request(app).post('/user/create').send({
           password: '123',
           confirmPassword: '123',
         })
       })

       assert.equal(response.status, 422)
     })
  })
})
