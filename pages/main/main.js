var app = getApp()

var threshold   = 100; // 卡片归位的阀值，如若卡片拖拽距离小于该值，则放开后卡片归位，否则触发喜欢/不喜欢动作
var maxRotation = 15; // 拖拽卡片时最大的旋转角度
var maxOpacity   = 1; // 卡片最大透明度

Page({
  data:{
    currentName: '', // 当前卡片的用户姓名
    currentPhoto: '', // 当前卡片的用户头像

    direction: '', // 卡片的拖拽方向
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    animationData:{} // 卡片的动画数据
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  getCardPhoto:function(){
      // 获取卡片用户头像
  },

  getCardName:function(){
      // 获取卡片用户姓名
  },


  like:function(){
      // 喜欢该用户
      console.log('like!');
  },
  dislike:function(){
      // 不喜欢该用户
      console.log('dislike!');
  },

  didMatch:function(){
      //匹配成功
  },

  tapStart: function(event){

      // 卡片的初始位置
      this.setData({
          startX: event.touches[0].pageX,
          startY: event.touches[0].pageY
      });
  },

  tapMove: function(event){
      this.setData({
          endX: event.touches[0].pageX,
          endY: event.touches[0].pageY
      });

      var animation = wx.createAnimation({
          duration: 50,
          timingFunction: "linear",
          transformOrigin: "50% 100% 0"
      });
      this.animation = animation;

      var distanceX = (this.data.endX) ? (this.data.endX - this.data.startX) : 0;
      var distanceY = (this.data.endY) ? (this.data.endY - this.data.startY) : 0;
      var rotation  = distanceX * maxRotation / threshold;
      var opacity   = maxOpacity;

      animation.translateX(distanceX).rotate(0).opacity(1).step(); // 移动卡片
      this.setData({
          animationData:animation.export()
      });
  },

  tapEnd:function(event){
      var distanceX = (this.data.endX) ? (this.data.endX - this.data.startX) : 0;

      // 如果卡片的移动距离小于阀值距离，则回到原位
      if (Math.abs(distanceX) < threshold) {
          var animation = wx.createAnimation({
                duration: 200,
                timingFunction: "ease-out"
          });
          this.animation = animation;
          animation.translateX(0).rotate(0).opacity(1).step(); // 返回原位

          this.setData({
              animationData: animation.export()
          });

      } else if (distanceX < -threshold) {
          this.like(); // 喜欢
      } else if (distanceX > threshold) {
          this.dislike(); // 不喜欢
      }
  }
})