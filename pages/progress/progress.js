// pages/progress/progress.js
// 进度页：展示已学字、星星、统计
const charsData = require('../../data/chars.js');
const { loadProgress, resetProgress } = require('../../utils/storage.js');

Page({
  data: {
    totalChars: 0,
    learnedCount: 0,
    learnedPercent: 0,
    totalStars: 0,
    quizTotal: 0,
    quizCorrect: 0,
    accuracy: 0,
    categories: [],
    learnedChars: []
  },

  onShow() {
    this.refresh();
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

  refresh() {
    const progress = loadProgress();
    const learned = progress.learned || {};
    const learnedKeys = Object.keys(learned);

    // 计算测验统计
    const qs = progress.quizStats || { totalAnswered: 0, correct: 0, totalStars: 0 };
    const accuracy = qs.totalAnswered > 0
      ? Math.round((qs.correct / qs.totalAnswered) * 100)
      : 0;

    // 计算总星星：每个字 1-3 颗 + 测验星星
    const learnStars = learnedKeys.reduce((sum, k) => sum + (learned[k].stars || 0), 0);
    const totalStars = learnStars + (qs.totalStars || 0);

    // 按分类聚合
    const categories = charsData.categories.map(cat => {
      const allInCat = charsData.getByCategory(cat.id);
      const learnedInCat = allInCat
        .filter(c => learned[c.char])
        .map(c => ({ ...c, stars: learned[c.char].stars }));
      return {
        ...cat,
        total: allInCat.length,
        learned: learnedInCat.length,
        percent: allInCat.length > 0
          ? Math.round((learnedInCat.length / allInCat.length) * 100)
          : 0,
        learnedChars: learnedInCat
      };
    });

    // 已学字按时间倒序
    const learnedChars = learnedKeys
      .map(k => ({
        char: k,
        ...learned[k],
        meta: charsData.chars.find(c => c.char === k) || {}
      }))
      .sort((a, b) => (b.lastReviewAt || 0) - (a.lastReviewAt || 0));

    this.setData({
      totalChars: charsData.chars.length,
      learnedCount: learnedKeys.length,
      learnedPercent: Math.round((learnedKeys.length / charsData.chars.length) * 100),
      totalStars,
      quizTotal: qs.totalAnswered || 0,
      quizCorrect: qs.correct || 0,
      accuracy,
      categories,
      learnedChars
    });
  },

  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/learn/learn?category=${id}` });
  },

  onCharTap(e) {
    const cat = e.currentTarget.dataset.cat;
    wx.navigateTo({ url: `/pages/learn/learn?category=${cat}` });
  },

  onReset() {
    wx.showModal({
      title: '确定要清空进度吗？',
      content: '所有星星和已学记录都会被清除，无法恢复哦。',
      confirmText: '清空',
      confirmColor: '#FF8A8A',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          resetProgress();
          // 重新初始化
          wx.setStorageSync('progress', {
            learned: {},
            quizStats: { totalAnswered: 0, correct: 0, wrong: 0, totalStars: 0 },
            lastOpenAt: Date.now()
          });
          wx.showToast({ title: '进度已清空', icon: 'success' });
          this.refresh();
        }
      }
    });
  }
});