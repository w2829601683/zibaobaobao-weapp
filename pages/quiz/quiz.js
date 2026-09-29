// pages/quiz/quiz.js
// 小测验：看图选字
const charsData = require('../../data/chars.js');
const { addQuizStars, markWrong, loadProgress } = require('../../utils/storage.js');

const QUESTION_COUNT = 10;
const OPTIONS_COUNT = 4;

Page({
  data: {
    // 当前状态：playing | finished
    status: 'playing',
    // 当前题目
    question: null,
    // 选项
    options: [],
    // 进度
    current: 1,
    total: QUESTION_COUNT,
    // 计分
    correctCount: 0,
    starsEarned: 0,
    // 反馈动画
    feedback: '',
    selectedIdx: -1,
    showResult: false,
    // 结算
    summary: null
  },

  onLoad() {
    this.startQuiz();
  },

  onUnload() {
    // 中途离开，不结算
  },

  onShareAppMessage() {
    return {
      title: '字宝宝小测验 - 一起来挑战吧',
      path: '/pages/quiz/quiz'
    };
  },

  onShareTimeline() {
    return {
      title: '字宝宝小测验 - 一起来挑战吧'
    };
  },

  startQuiz() {
    // 随机抽 QUESTION_COUNT 道题，每道题从对应字 + 3 个干扰字中选
    const allChars = charsData.chars.slice();
    const shuffled = allChars.sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, QUESTION_COUNT).map(target => {
      const distractors = charsData.randomN(OPTIONS_COUNT - 1, [target]);
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);
      return { target, options };
    });

    this._questions = questions;
    this.setData({
      status: 'playing',
      current: 1,
      correctCount: 0,
      starsEarned: 0,
      summary: null
    }, () => {
      this.loadQuestion(0);
    });
  },

  loadQuestion(index) {
    const q = this._questions[index];
    if (!q) return;
    this.setData({
      question: q.target,
      options: q.options,
      current: index + 1,
      feedback: '',
      selectedIdx: -1,
      showResult: false
    });
  },

  onOptionTap(e) {
    if (this.data.showResult) return; // 已经选过这一题了
    const idx = e.currentTarget.dataset.idx;
    const selected = this.data.options[idx];
    const target = this.data.question;
    const isCorrect = selected.char === target.char;

    this.setData({
      selectedIdx: idx,
      showResult: true,
      feedback: isCorrect ? 'correct' : 'wrong'
    });

    try { wx.vibrateShort({ type: isCorrect ? 'light' : 'heavy' }); } catch (e) {}

    if (isCorrect) {
      // 得分
      const stats = addQuizStars(1);
      this.setData({
        correctCount: this.data.correctCount + 1,
        starsEarned: this.data.starsEarned + 1
      });
      wx.showToast({ title: '🎉 真棒！', icon: 'none', duration: 600 });
    } else {
      markWrong();
      wx.showToast({ title: `正确是「${target.char}」`, icon: 'none', duration: 1000 });
    }

    // 1.2 秒后下一题 / 结算
    setTimeout(() => {
      if (this.data.current >= this.data.total) {
        this.finish();
      } else {
        this.loadQuestion(this.data.current);
      }
    }, 1200);
  },

  finish() {
    const correct = this.data.correctCount;
    const total = this.data.total;
    let title, emoji, message;
    if (correct === total) {
      title = '满分！太厉害了！';
      emoji = '🏆';
      message = '小朋友，你是最棒的！';
    } else if (correct >= total * 0.7) {
      title = '真不错！';
      emoji = '🌟';
      message = '继续加油，下次会更好！';
    } else if (correct >= total * 0.4) {
      title = '不错哦';
      emoji = '💪';
      message = '多学几次就记住啦！';
    } else {
      title = '加油加油！';
      emoji = '🌱';
      message = '每个字宝宝都值得被认识～';
    }

    this.setData({
      status: 'finished',
      summary: {
        title,
        emoji,
        message,
        correct,
        total,
        starsEarned: this.data.starsEarned,
        accuracy: Math.round((correct / total) * 100)
      }
    });
  },

  onRestart() {
    this.startQuiz();
  },

  onBack() {
    wx.navigateBack({ delta: 1, fail: () => {
      wx.switchTab({ url: '/pages/index/index' });
    }});
  }
});