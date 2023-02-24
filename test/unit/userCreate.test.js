const assert = require('assert/strict')
const sandbox = require('sinon').createSandbox()
const bcrypt = require('bcryptjs')
const api = require('../../src/services/api')

const { UserCreateController } = require('../../src/controller')
const User = require('../../src/models/User')

describe('Unit tests for UserCreate controller', () => {
    let req = {}
    let res = {}

  beforeEach(() => {
    res = {
        json() {
          return true
        },
        send: () => true,
        status() {
         return true
        },
      }

      sandbox.spy(bcrypt)
      sandbox.spy(api)
      sandbox.spy(User)
      sandbox.spy(res)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw ValidationError when req is undefined', async () => {
    req = { body: undefined }
    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(404))
  })

  it('should throw ValidationError when userName is undefined', async () => {
    req = { body: { userName: undefined } }
    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(422))
  })

  it('should throw ValidationError when password is undefined', async () => {
    req = { body: { userName: 'fooBar', password: undefined } }
    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(422))
  })

  it('should throw ValidationError when confirmPassword is undefined', async () => {
    req = { body: { userName: 'foo', password: 'bar', confirmPassword: undefined } }
    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(422))
  })

  it('should throw ValidationError when password and confirmPassword', async () => {
    req = { body: { userName: 'foo', password: 'bar', confirmPassword: 'fooBar' } }
    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(422))
  })

  it('should throw ValidationError when github user is invalid', async () => {
    req = { body: { userName: 'foo', password: 'bar', confirmPassword: 'bar' } }
    sandbox.stub(api, 'get').rejects(true)

    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
  })

  it('should return github avatar user', async () => {
    req = { body: { userName: 'foo', password: 'bar', confirmPassword: 'bar' } }
    const { userName } = req.body
    sandbox.stub(api, 'get').resolves(userName)

    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
  })

  it('should throw ValidationError when user already exists', async () => {
    req = { body: { userName: 'foo', password: 'foo-bar', confirmPassword: 'foo-bar' } }
    const { userName } = req.body
    sandbox.stub(User, 'findOne').resolves({ userName })

    await assert.rejects(async () => {
      await UserCreateController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(400))
  })
})
