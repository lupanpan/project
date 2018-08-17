const router = require('koa-router')()
import {getTipsList, create} from '../app/controller/tips'

router.get('/', async (ctx, next) => {
    // 查询数据
    let tipsList = await getTipsList()
    // 渲染列表页
    await ctx.render('tips/listTips', {
        tipsList: tipsList
    })
})

router.get('/create', async (ctx, next) => {
    // 渲染创建页
    await ctx.render('tips/createTips', {

    })
})

router.post('/create', async (ctx, next) => {
    // 获取表单数据，插入到数据库
    let optData = await create(ctx.request.body)
    // 判断是否成功
    if (optData.flag) {
        // 跳转到小窍门列表页
        ctx.response.redirect('/tips/')
    }
    else {
        // 输出错误信息 怎么输出。。。
    }
})

module.exports = router