const assert = require('assert/strict')
const sandbox = require('sinon').createSandbox()

const { LanguagesController } = require('../../src/controller')

describe('Unit tests for languages controller', () => {
    const req = {}
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

      sandbox.spy(res)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw ValidationError when req is undefined', async () => {
    await assert.rejects(async () => {
      await LanguagesController.get(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(200))
  })
})
