const assert = require('assert/strict')
const sandbox = require('sinon').createSandbox()

const { UserController } = require('../../src/controller')
const User = require('../../src/models/User')

describe('Unit tests for user data controller', () => {
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

      sandbox.spy(User)
      sandbox.spy(res)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw ValidationError when req is undefined', async () => {
    req = undefined
    await assert.rejects(async () => {
      await UserController.get(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(404))
  })

  it('should find user in database', async () => {
    req = { userId: 'foo' }
    const { userId } = req
    sandbox.stub(User, 'findOne').resolves({ userId })
    await assert.rejects(async () => {
      await UserController.get(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(200))
  })

  it('should ValidationError when user does not exist', async () => {
    sandbox.stub(User, 'findOne').resolves(undefined)
    await assert.rejects(async () => {
      await UserController.get(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(401))
  })
})
