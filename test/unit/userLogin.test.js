const assert = require('assert/strict')
const sandbox = require('sinon').createSandbox()
const bcrypt = require('bcryptjs')
const jwt = require('../jwt-repack')

const { UserLoginController } = require('../../src/controller')
const User = require('../../src/models/User')

describe('Unit tests for Login controller', () => {
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
      sandbox.spy(User)
      sandbox.spy(res)
      sandbox.spy(jwt)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw ValidationError when req is undefined', async () => {
    req = { body: undefined }
    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(404))
  })

  it('should throw ValidationError when userName is undefined', async () => {
    req = { body: { userName: undefined } }
    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(422))
  })

  it('should throw ValidationError when password is undefined', async () => {
    req = { body: { userName: 'fooBar', password: undefined } }
    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(422))
  })

  it('should find user in database', async () => {
    req = { body: { userName: 'foo', password: 'bar' } }
    const { userName } = req.body
    sandbox.stub(User, 'findOne').resolves({ userName })
    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })
  })

  it('should throw ValidationError when user not exists', async () => {
    sandbox.stub(User, 'findOne').returns(undefined)
    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(401))
  })

  it('should throw ValidationError when passwords is differents', async () => {
    const userName = 'foo'
    bcrypt.compare.restore()
    sandbox.stub(User, 'findOne').resolves({ userName })
    sandbox.stub(bcrypt, 'compare').returns(undefined)

    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })

    assert(res.status.called)
    assert(res.status.calledWith(401))
  })

  it('should sign token', async () => {
    const userName = 'foo'
    const user = { _id: 1 }

    bcrypt.compare.restore()
    jwt.sign.restore()

    sandbox.stub(User, 'findOne').resolves({ userName })
    sandbox.stub(bcrypt, 'compare').returns(true)
    sandbox.stub(jwt, 'sign').resolves({ id: user._id })

    await assert.rejects(async () => {
      await UserLoginController.post(req, res)
    })
  })
})
