const request = require('../utils/request')
/**
 * 获取首页数据
 * @returns {Promise<unknown>}
 */
export const index = (params) => {
    return  request.get('/api/index',params)
}

//CJS 语法
// module.exports = {
//     index
// }
