const router = require('koa-router')()
import {getTipsList, getTipsById, create, updateById, deleteById} from '../app/controller/tipsController'

// 小窍门列表页
router.get('/', async (ctx, next) => {
    // 查询数据
    let tipsList = await getTipsList()

    // 渲染列表页
    await ctx.render('tips/listTips', {
        tipsLists: tipsList.data
    })
})

// 小窍门创建页
router.get('/create', async (ctx, next) => {
    // 渲染创建页
    await ctx.render('tips/createTips')
})

// 创建小窍门数据
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

// 小窍门编辑页
router.get('/edit/:tipsId', async (ctx, next) => {
    // 获取tipid
    let tipid = ctx.params.tipsId
    // 根据_id获取一条数据
    let optData = await getTipsById(tipid)
    // 渲染创建页
    await ctx.render('tips/editTips', {
        tipsList: optData.data[0]
    })
})

// 编辑保存小窍门数据
router.post('/edit', async (ctx, next) => {

    let optData = await updateById(ctx.request.body)
    console.log("optData: ", optData)

    // 判断是否成功
    if (optData.flag) {
        // 跳转到小窍门列表页
        ctx.response.redirect('/tips/')
    }
    else {
        // 输出错误信息 怎么输出。。。
    }

})

// 删除一条小窍门数据
router.post('/del/:tipsId', async (ctx, next) => {
    // 获取tipid
    console.log(ctx.params.tipsId)
    let optData = await deleteById(ctx.params.tipsId)
    ctx.body = optData
})

module.exports = router