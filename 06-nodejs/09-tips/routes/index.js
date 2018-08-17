const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.state = {
        title: 'koa2 title 123'
    }

    await ctx.render('index', {

    })
})

module.exports = router