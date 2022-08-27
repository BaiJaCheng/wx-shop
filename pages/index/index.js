const app = getApp()
//ES6 语法
import {index} from '../../service/index'

Page({
  data: {
    slides:[],
    goods:[],
    current_page:1,
    showLoading:false,
    noData:false,
  },

  onLoad() {
    //ES6 语法
  this.getData()
  },

  onReachBottom(){
    //发送请求
      this.setData({
        current_page:++this.data.current_page
      })
    this.getData()
  },

  getData(){
    //加载显示
    this.setData({
      showLoading:true
    })

    index({page: this.data.current_page }).then(res => {
     this.setData({
          showLoading:false
     })
      if (this.data.current_page === 1){
        this.setData({
            slides:res.slides,
        })
      }

      if (res.goods.data.length === 0){
          this.setData({
                noData:true
          })
      }else{
        this.setData({
          goods: [...this.data.goods,...res.goods.data],
        })
      }
    })
  }
})
