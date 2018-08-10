const router = require('koa-router')()

router.get('/', async function (ctx, next) {
    await ctx.render('tips/addTips', {

    })
})

module.exports = router