// pages/index/index.js
// 首页：分类选择 + 顶部欢迎区 + 学习入口 + 随机一个今日字
const charsData = require('../../data/chars.js');
const { loadProgress, getLearnedCount } = require('../../utils/storage.js');

Page({
  data: {
    categories: [],
    learnedCount: 0,
    totalCount: 0,
    dailyChar: null,
    greeting: ''
  },

  onLoad() {
    this.refresh();
    this.pickDailyChar();
  },

  onShareAppMessage() {
    return {
      title: '字宝宝 - 趣味学汉字',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: '字宝宝 - 趣味学汉字'
    };
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const progress = loadProgress();
    const learnedCount = Object.keys(progress.learned).length;
    const totalCount = charsData.chars.length;

    // 给每个分类统计已学数量
    const categories = charsData.categories.map(cat => {
      const all = charsData.getByCategory(cat.id);
      const learnedInCat = all.filter(c => progress.learned[c.char]).length;
      return {
        ...cat,
        total: all.length,
        learned: learnedInCat
      };
    });

    this.setData({ categories, learnedCount, totalCount });
  },

  pickDailyChar() {
    const idx = Math.floor(Math.random() * charsData.chars.length);
    const c = charsData.chars[idx];
    this.setData({ dailyChar: c });

    // 根据时段显示问候语
    const h = new Date().getHours();
    let greeting = '小宝贝，我们一起学字吧！';
    if (h < 11) greeting = '早上好呀，小宝贝！';
    else if (h < 14) greeting = '中午好，吃完饭来学字啦～';
    else if (h < 18) greeting = '下午好，来玩一会儿吧！';
    else greeting = '晚上好，今天学了好多字呢！';
    this.setData({ greeting });
  },

  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    const cat = this.data.categories.find(c => c.id === id);
    if (!cat) return;
    if (cat.total === 0) {
      wx.showToast({ title: '这个分类还没有字哦', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: `/pages/learn/learn?category=${id}`
    });
  },

  onQuizTap() {
    wx.navigateTo({ url: '/pages/quiz/quiz' });
  },

  onDailyCharTap() {
    if (!this.data.dailyChar) return;
    wx.navigateTo({
      url: `/pages/learn/learn?category=${this.data.dailyChar.category}&focus=${this.data.dailyChar.char}`
    });
  }
});