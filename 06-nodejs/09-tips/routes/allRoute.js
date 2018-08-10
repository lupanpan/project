const router = require('koa-router')()
const index = require('./index')
const tips = require('./tips')

router.use('/', index.routes(), index.allowedMethods())
router.use('/tips', tips.routes(), tips.allowedMethods())

module.exports = router