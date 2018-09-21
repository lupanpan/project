const router = require('koa-router')()
const multerUpload = require('../utils/upload')
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
    await ctx.render('tips/tipsForm', {
        type: "add",
        tipsList: []
    })
})

// 创建小窍门数据
router.post('/create', async (ctx, next) => {
    // 获取表单数据，插入到数据库
    let optData = await create(ctx.request.body)
    // 判断是否成功
    if (optData.flag) {
        // 跳转到小窍门列表页
        // ctx.response.redirect('/tips/')
        ctx.body = optData
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
    await ctx.render('tips/tipsForm', {
        type: "edit",
        tipsList: optData.data[0]
    })
})

// 编辑保存小窍门数据
router.post('/edit', async (ctx, next) => {
    let optData = await updateById(ctx.request.body)

    /* 如下这句话没有用了，因为ajaxForm阻止了默认提交的刷新或跳转，具体没有弄明白，有点乱，
    弄明白了下边的问题，但是还是没明白ajaxForm与ajaxSubmit的阻止跳转与不跳转，跟这里有什么关系。
    
    弄明白了，这里之前是重定向到了新页面，返回的数据为新页面的html数据，
    而调用该接口的ajax设置的datatype为json，解析不了html中的回车换行符，
    因为有回车换行符不是严格的json格式，所以这里是成功返回了数据，
    但是调用接口的ajax因为解析不了这个json格式，所以走了error回调函数 */
    
    // 判断是否成功
    if (optData.flag) {
        // 跳转到小窍门列表页
        // ctx.response.redirect('/tips/')
        ctx.body = optData
    }
    else {
        // 输出错误信息 怎么输出。。。
    }
})

// 上传照片接口
router.post('/upload', multerUpload.single('file'), async (ctx, next) => {
    console.log("ctx.req.body: ", ctx.req.body)
    console.log("ctx.request.body: ", ctx.request.body)
    console.log("ctx.req.file.filename: ", ctx.req.file.filename)
    ctx.body = ctx.req.file.filename
})

// 删除一条小窍门数据
router.post('/del/:tipsId', async (ctx, next) => {
    // 获取tipid
    console.log(ctx.params.tipsId)
    let optData = await deleteById(ctx.params.tipsId)
    ctx.body = optData
})

module.exports = router