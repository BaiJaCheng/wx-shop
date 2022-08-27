const request = require('../utils/request')
/**
 * 获取首页数据
 * @returns {Promise<unknown>}
 */
export const index = (data) => {
    const options = { data }
    return  request.get('/api/index',options)
}

//CJS 语法
// module.exports = {
//     index
// }
