import {tipsModel} from '../model/tipsModel'
import {resData, errData} from '../../utils/serve'

// 查询所有数据
exports.getTipsList = async () => {
    try {
        // 查询所有小窍门数据，并且按修改时间倒叙
        let list = await tipsModel.find({}, {"updateTime": -1})
        // 返回包装成功后的数据
        return resData(list)
    }
    catch (err) {
        // 返回包装失败后的数据
        return errData(err)
    }
}

// 创建一条小窍门数据
exports.create = async (reqBody) => {
    try {
        // 获取ctx.request.body中的表单数据
        let dataArr = reqBody.fields;
        // 插入到数据库中
        let newData = await tipsModel.create(dataArr)
        // 返回包装成功后的数据
        return resData(newData)
    }
    catch (err) {
        // 返回包装失败后的数据
        return errData(err)
    }
}

// 根据_id删除一条数据
exports.deleteById = async (_id) => {
    try {
        // 根据_id 删除数据
        let delData = await tipsModel.deleteById(_id)
        console.log("delData: ", delData)
        return resData(delData)
    }
    catch (err) {
        // 返回包装失败后的数据
        return errData(err)
    }
}