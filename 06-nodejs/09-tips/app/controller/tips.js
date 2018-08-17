import {tips} from '../modal/tips'
import {resdata, errData} from '../../utils/serve'

// 查询数据
exports.getTipsList = async () => {
    try {
        // 调用modal的tips中的find方法，查询所有小窍门数据
        let list = await tips.find()
        // 返回包装成功后的数据
        return resdata(list)
    }
    catch (err) {
        throw new Error(err);
    }
}

// 创建
exports.create = async (reqBody) => {
    try {
        // 获取ctx.request.body中的表单数据
        let dataArr = reqBody.fields;
        // 插入到数据库中
        let newData = await tips.create(dataArr)
        // 返回包装成功后的数据
        return resdata(newData)
    }
    catch (err) {
        throw new Error(err);
    }
}