const app = getApp()
const request = require('../../utils/request.js')
//cjs 语法
// const index = require('../../service/index.js')

//ES6 语法
import {index} from '../../service/index'

Page({
  data: {

  },

  onLoad() {
    //CJS 语法
   // index.index().then(res => {
   //      console.log(res)
   // })

    //ES6 语法
    index().then(res => {
        console.log(res)
    })
}
})
