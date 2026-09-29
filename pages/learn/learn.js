// pages/learn/learn.js
// 学习页：浏览某分类下的所有汉字
// 新增：点字 / 点拼音 触发"拼音点读机"
const charsData = require('../../data/chars.js');
const { loadProgress, markLearned } = require('../../utils/storage.js');
const { speak, stop } = require('../../utils/speech.js');

Page({
  data: {
    categoryId: '',
    categoryName: '',
    chars: [],
    currentIndex: 0,
    currentChar: null,
    learnedSet: {},
    progressText: '',
    // 点读机状态
    charTapActive: false,
    pinyinTapActive: false,
    // 详情弹窗
    showDetail: false,
    detailData: {}
  },

  onLoad(options) {
    const categoryId = options.category || 'animal';
    const category = charsData.categories.find(c => c.id === categoryId);
    const chars = charsData.getByCategory(categoryId);

    wx.setNavigationBarTitle({ title: category ? category.name : '学习' });

    const focusChar = options.focus;
    let startIndex = 0;
    if (focusChar) {
      const i = chars.findIndex(c => c.char === focusChar);
      if (i >= 0) startIndex = i;
    }

    this.setData({
      categoryId,
      categoryName: category ? category.name : '',
      chars,
      currentIndex: startIndex
    }, () => {
      this.updateCurrent();
    });
  },

  onHide() {
    stop();
  },

  onUnload() {
    stop();
  },

  onShareAppMessage() {
    return {
      title: '字宝宝 - 趣味学汉字',
      path: '/pages/learn/learn?category=' + (this.data.categoryId || 'animal')
    };
  },

  onShareTimeline() {
    return {
      title: '字宝宝 - 趣味学汉字'
    };
  },

  onShow() {
    this.refreshLearned();
  },

  refreshLearned() {
    const progress = loadProgress();
    const learnedSet = {};
    Object.keys(progress.learned).forEach(c => { learnedSet[c] = true; });
    this.setData({ learnedSet }, () => this.updateCurrent());
  },

  updateCurrent() {
    const c = this.data.chars[this.data.currentIndex];
    if (!c) return;
    const learnedInfo = loadProgress().learned[c.char];
    const stars = learnedInfo ? learnedInfo.stars : 0;
    this.setData({
      currentChar: { ...c, stars, learned: !!stars },
      progressText: `${this.data.currentIndex + 1} / ${this.data.chars.length}`,
      // 切换字时重置点读状态
      charTapActive: false,
      pinyinTapActive: false
    });
  },

  /** 上一个 */
  onPrev() {
    if (this.data.currentIndex <= 0) {
      wx.showToast({ title: '已经是第一个啦', icon: 'none' });
      return;
    }
    this.setData({ currentIndex: this.data.currentIndex - 1 }, () => {
      this.updateCurrent();
    });
  },

  /** 下一个 */
  onNext() {
    if (this.data.currentIndex >= this.data.chars.length - 1) {
      wx.showToast({ title: '🎉 这个分类学完啦', icon: 'none' });
      return;
    }
    this.setData({ currentIndex: this.data.currentIndex + 1 }, () => {
      this.updateCurrent();
    });
  },

  /** 标记掌握 + 跳下一个 */
  onMaster() {
    const c = this.data.currentChar;
    if (!c) return;
    markLearned(c.char, this.data.categoryId);

    wx.showToast({
      title: '⭐ 学会啦！',
      icon: 'none',
      duration: 800
    });

    try { wx.vibrateShort({ type: 'light' }); } catch (e) {}

    setTimeout(() => {
      this.refreshLearned();
      if (this.data.currentIndex < this.data.chars.length - 1) {
        this.onNext();
      }
    }, 600);
  },

  /** 🔊 跟我读：等同于点字 → 弹详情卡 */
  onSpeak() {
    this.onTapChar();
  },

  /** 点字：触发朗读 + 弹详情卡 */
  onTapChar() {
    const c = this.data.currentChar;
    if (!c) return;

    // 视觉反馈：字变橙
    this.setData({ charTapActive: true });
    setTimeout(() => this.setData({ charTapActive: false }), 300);

    // 朗读字：播放随包发布的普通话录音
    speak(c.char);

    // 弹出详情卡
    this.setData({
      showDetail: true,
      detailData: c
    });
  },

  /** 点拼音：单独朗读拼音 + 视觉反馈 */
  onTapPinyin() {
    const c = this.data.currentChar;
    if (!c) return;

    // 视觉反馈：拼音变橙
    this.setData({ pinyinTapActive: true });
    setTimeout(() => this.setData({ pinyinTapActive: false }), 300);

    // 点击拼音仍播放对应汉字/词语的普通话录音，避免 TTS 把拼音当字母读。
    speak(c.char);
  },

  /** 关闭详情卡 */
  onCloseDetail() {
    this.setData({ showDetail: false });
    try { wx.vibrateShort({ type: 'light' }); } catch (e) {}
  },

  /** 切换到列表视图 */
  onShowList() {
    this.setData({ showList: !this.data.showList });
  },

  onListItemTap(e) {
    const idx = e.currentTarget.dataset.idx;
    this.setData({ currentIndex: idx, showList: false }, () => {
      this.updateCurrent();
    });
  }
});