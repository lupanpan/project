const path = require('path')
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const User = require('../lib/mongo').User

const testName1 = 'testName1'
const testName2 = 'nswbmw'

describe('signup', function () {
  describe('POST /signup', function () {
    // persist cookie when redirect
    const agent = request.agent(app)
    beforeEach(function (done) {
      // 创建一个用户
      User.create({
        name: testName1,
        password: '123456',
        avatar: '',
        gender: 'x',
        bio: ''
      })
        .exec()
        .then(function () {
          done()
        })
        .catch(done)
    })

    afterEach(function (done) {
      // 删除测试用户
      User.deleteMany({ name: { $in: [testName1, testName2] } })
        .exec()
        .then(function () {
          done()
        })
        .catch(done)
    })
  })
})
