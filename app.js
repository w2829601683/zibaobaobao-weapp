// app.js
// 小程序全局入口：负责初始化本地存储、加载数据
const { loadProgress } = require('./utils/storage.js');

App({
  // 分享给微信好友（转发按钮）
  onShareAppMessage() {
    return {
      title: '字宝宝 - 趣味学汉字',
      path: '/pages/index/index'
    };
  },

  // 分享到朋友圈（朋友圈按钮）：小程序原生能力，实现它之后右上角「朋友圈」就不置灰了
  onShareTimeline() {
    return {
      title: '字宝宝 - 趣味学汉字'
    };
  },

  onLaunch() {
    // 首次启动：检查并初始化进度记录
    const progress = wx.getStorageSync('progress');
    if (!progress) {
      wx.setStorageSync('progress', {
        learned: {},          // { '猫': { category, learnedAt, stars } }
        quizStats: {
          totalAnswered: 0,
          correct: 0,
          wrong: 0,
          totalStars: 0
        },
        lastOpenAt: Date.now()
      });
    } else {
      progress.lastOpenAt = Date.now();
      wx.setStorageSync('progress', progress);
    }

    // 系统信息（用于 rpx 计算、状态栏适配）
    try {
      const sys = wx.getSystemInfoSync();
      this.globalData = {
        statusBarHeight: sys.statusBarHeight,
        windowWidth: sys.windowWidth,
        windowHeight: sys.windowHeight,
        pixelRatio: sys.pixelRatio
      };
    } catch (e) {
      this.globalData = {};
    }

    console.log('字宝宝启动完成');
  },

  onShow() {
    // 从后台切回时的钩子
  },

  onHide() {
    // 切到后台时的钩子
  },

  globalData: {}
});