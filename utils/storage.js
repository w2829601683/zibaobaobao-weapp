// utils/storage.js
// 本地存储工具：负责已学字、星星、统计的读写

const STORAGE_KEY = 'progress';

function loadProgress() {
  const data = wx.getStorageSync(STORAGE_KEY);
  return data || defaultProgress();
}

function defaultProgress() {
  return {
    learned: {},          // { '猫': { category, learnedAt, stars: 1 } }
    quizStats: {
      totalAnswered: 0,
      correct: 0,
      wrong: 0,
      totalStars: 0
    },
    lastOpenAt: Date.now()
  };
}

function saveProgress(progress) {
  wx.setStorageSync(STORAGE_KEY, progress);
}

/** 标记一个字已学 */
function markLearned(char, category) {
  const progress = loadProgress();
  const existing = progress.learned[char];
  progress.learned[char] = {
    category,
    learnedAt: existing ? existing.learnedAt : Date.now(),
    lastReviewAt: Date.now(),
    stars: existing ? Math.min(existing.stars + 1, 3) : 1
  };
  saveProgress(progress);
  return progress.learned[char];
}

/** 增加测验星星 */
function addQuizStars(count) {
  const progress = loadProgress();
  progress.quizStats.totalAnswered += count;
  progress.quizStats.correct += count;
  progress.quizStats.totalStars += count;
  saveProgress(progress);
  return progress.quizStats;
}

/** 记录答错 */
function markWrong() {
  const progress = loadProgress();
  progress.quizStats.totalAnswered += 1;
  progress.quizStats.wrong += 1;
  saveProgress(progress);
}

/** 重置进度（带二次确认） */
function resetProgress() {
  wx.removeStorageSync(STORAGE_KEY);
}

/** 获取已学字的数量 */
function getLearnedCount() {
  const progress = loadProgress();
  return Object.keys(progress.learned).length;
}

/** 判断某字是否已学 */
function isLearned(char) {
  const progress = loadProgress();
  return !!progress.learned[char];
}

module.exports = {
  loadProgress,
  saveProgress,
  markLearned,
  addQuizStars,
  markWrong,
  resetProgress,
  getLearnedCount,
  isLearned
};