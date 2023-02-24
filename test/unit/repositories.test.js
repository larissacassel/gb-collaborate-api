const assert = require('assert/strict')
const sandbox = require('sinon').createSandbox()

const { RepositoriesController } = require('../../src/controller')
const User = require('../../src/models/User')
const api = require('../../src/services/api')

describe('Unit tests for github repos controller', () => {
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
      sandbox.spy(api)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw ValidationError when req is undefined', async () => {
    req = undefined
    await assert.rejects(async () => {
      await RepositoriesController.get(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(404))
  })

  it('should throw ValidationError when req.params is undefined', async () => {
    req = { params: undefined }
    await assert.rejects(async () => {
      await RepositoriesController.get(req, res)
    })
    assert(res.status.called)
    assert(res.status.calledWith(404))
  })

  it('should throw ValidationError when github repos is invalid', async () => {
    req = { params: { language: 'foo-bar' } }
    sandbox.stub(api, 'get').rejects(true)

    await assert.rejects(async () => {
      await RepositoriesController.get(req, res)
    })
  })

  it('should get gihub repositories of a language', async () => {
    req = { params: { language: 'javascript' } }
    const response = { data: { repositories: {} } }
    sandbox.stub(api, 'get').resolves(response)

    await assert.rejects(async () => {
      await RepositoriesController.get(req, res)
    })

    assert(res.status.called)
    assert(res.status.calledWith(200))
  })
})
