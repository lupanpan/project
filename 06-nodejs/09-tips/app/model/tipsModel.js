let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TipsSchema = new Schema({
    tipid: String, // 小窍门id
    tipcon: String, // 内容
    tippic: String, // 图片
    classone: Object, // 一级分类（）
    classtwo: Object, // 二级分类（）
    rate: String, // 实用度
    keyword: String, // 关键字
    author: Object, // 创建人昵称
    isuse: Boolean, // 是否启用
    release: Boolean, // 是否发布
    createTime: { // 创建时间
        type: Date,
        default: Date.now()
    },
    updateTime: { // 修改时间
        type: Date,
        default: Date.now()
    }
})

TipsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createTime = this.updateTime = Date.now()
    }
    else {
        this.updateTime = Date.now()
    }
    next()
})

class Tips {
    constructor() {
        this.tips = mongoose.model('tips', TipsSchema)
    }
    // 查询
    find(dataArr = {}, sort = {}) {
        const self = this
        return new Promise(function (resolve, reject) {
            self.tips.find(dataArr).sort(sort).exec(function (err, docs) {
                if (err) {
                    console.log('err: ', err)
                    reject(err)
                }
                else {
                    resolve(docs)
                }
            })
        })
    }
    // 创建
    create(dataArr) {
        const self = this
        return new Promise(function (resolve, reject) {
            let tips = new self.tips({
                tipid: dataArr.tipid, // 小窍门id
                tipcon: dataArr.tipcon, // 内容
                tippic: dataArr.tippic, // 图片
                classone: dataArr.classone, // 一级分类（）
                classtwo: dataArr.classtwo, // 二级分类（）
                rate: dataArr.rate, // 实用度
                keyword: dataArr.keyword, // 关键字
                author: dataArr.author, // 创建人
                isuse: dataArr.isuse, // 是否启用
                release: dataArr.release // 是否发布
            })

            tips.save(function (err, data) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        })
    }

    // 根据_id更新一条数据
    update(dataArr) {
        const self = this
        return new Promise(function (resolve, reject) {
            let updateData = {
                tipcon: dataArr.tipcon, // 内容
                tippic: dataArr.tippic, // 图片
                classone: dataArr.classone, // 一级分类（）
                classtwo: dataArr.classtwo, // 二级分类（）
                rate: dataArr.rate, // 实用度
                keyword: dataArr.keyword, // 关键字
                author: dataArr.author, // 创建人
                isuse: dataArr.isuse, // 是否启用
                release: dataArr.release // 是否发布
            }

            self.tips.update({ _id: dataArr.id }, updateData, function (err, data) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        })
    }

    // 删除(通用)
    delete(dataArr) {
        const self = this
        return new Promise(function (resolve, reject) {
            self.tips.remove(dataArr, function (err, data) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        })
    }

    // 根据_id删除一条数据
    deleteById(_id) {
        const self = this
        return new Promise((resolve, reject) => {
            self.tips.findByIdAndRemove(_id, (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        })
    }
}

let tipsModel = new Tips()

export {tipsModel}