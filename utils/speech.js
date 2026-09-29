// utils/speech.js
// 本地语音播放：音频随小程序代码包发布，不依赖云开发或网络。
// 音频文件命名：assets/audio/char-001.mp3、char-002.mp3……

// 当前正在播放的播放器。复用同一个实例，避免连续点击造成声音重叠。
let audioContext = null;

// 显式列出完整路径：开发者工具开启“忽略未使用文件”时也不会漏传音频。
const audioPaths = {
  '猫': '/assets/audio/char-001.mp3', '狗': '/assets/audio/char-002.mp3',
  '鱼': '/assets/audio/char-003.mp3', '鸟': '/assets/audio/char-004.mp3',
  '马': '/assets/audio/char-005.mp3', '牛': '/assets/audio/char-006.mp3',
  '羊': '/assets/audio/char-007.mp3', '兔': '/assets/audio/char-008.mp3',
  '鸡': '/assets/audio/char-009.mp3', '鸭': '/assets/audio/char-010.mp3',
  '苹果': '/assets/audio/char-011.mp3', '香蕉': '/assets/audio/char-012.mp3',
  '西瓜': '/assets/audio/char-013.mp3', '葡萄': '/assets/audio/char-014.mp3',
  '草莓': '/assets/audio/char-015.mp3', '橙子': '/assets/audio/char-016.mp3',
  '桃子': '/assets/audio/char-017.mp3', '菠萝': '/assets/audio/char-018.mp3',
  '米饭': '/assets/audio/char-019.mp3', '面条': '/assets/audio/char-020.mp3',
  '饺子': '/assets/audio/char-021.mp3', '鸡蛋': '/assets/audio/char-022.mp3',
  '牛奶': '/assets/audio/char-023.mp3', '蛋糕': '/assets/audio/char-024.mp3',
  '太阳': '/assets/audio/char-025.mp3', '月亮': '/assets/audio/char-026.mp3',
  '星星': '/assets/audio/char-027.mp3', '云': '/assets/audio/char-028.mp3',
  '雨': '/assets/audio/char-029.mp3', '雪': '/assets/audio/char-030.mp3',
  '一': '/assets/audio/char-031.mp3', '二': '/assets/audio/char-032.mp3',
  '三': '/assets/audio/char-033.mp3', '四': '/assets/audio/char-034.mp3',
  '五': '/assets/audio/char-035.mp3', '六': '/assets/audio/char-036.mp3',
  '七': '/assets/audio/char-037.mp3', '八': '/assets/audio/char-038.mp3',
  '九': '/assets/audio/char-039.mp3', '十': '/assets/audio/char-040.mp3',
  '鞋': '/assets/audio/char-041.mp3', '帽': '/assets/audio/char-042.mp3',
  '衣': '/assets/audio/char-043.mp3', '裤': '/assets/audio/char-044.mp3',
  '书': '/assets/audio/char-045.mp3', '笔': '/assets/audio/char-046.mp3',
  '桌': '/assets/audio/char-047.mp3', '床': '/assets/audio/char-048.mp3',
  '眼': '/assets/audio/char-049.mp3', '耳': '/assets/audio/char-050.mp3',
  '口': '/assets/audio/char-051.mp3', '手': '/assets/audio/char-052.mp3',
  '足': '/assets/audio/char-053.mp3', '心': '/assets/audio/char-054.mp3'
};

/**
 * 朗读一个字或词。音频不可用时明确提示，不假装已经播放。
 * @param {string} text - 字库中的汉字或词
 * @param {object} options - 可选：{ onStart, onEnd, onError }
 * @returns {Promise<boolean>} 是否已开始播放
 */
function speak(text, options = {}) {
  const url = audioPaths[text];
  if (!url) {
    fallback(text, options);
    return Promise.resolve(false);
  }

  return playAudio(url, options);
}

/** 播放一个随包发布的 mp3 */
function playAudio(url, { onStart, onEnd, onError } = {}) {
  return new Promise((resolve) => {
    try {
      if (!audioContext) {
        audioContext = wx.createInnerAudioContext();
        audioContext.onPlay(() => onStart && onStart());
        audioContext.onEnded(() => onEnd && onEnd());
        audioContext.onError((err) => {
          onError && onError(err);
          wx.showToast({ title: '语音暂时无法播放', icon: 'none' });
          resolve(false);
        });
      }

      audioContext.stop();
      audioContext.src = url;
      audioContext.play();
      resolve(true);
    } catch (e) {
      onError && onError(e);
      wx.showToast({ title: '语音暂时无法播放', icon: 'none' });
      resolve(false);
    }
  });
}

/** 停止当前播放（页面隐藏或销毁时调用） */
function stop() {
  if (!audioContext) return;
  try { audioContext.stop(); } catch (e) {}
}

/** 无对应音频时的明确降级提示 */
function fallback(text) {
  try { wx.vibrateShort({ type: 'medium' }); } catch (e) {}
  wx.showToast({
    title: `暂无「${text}」语音`,
    icon: 'none',
    duration: 1500
  });
}

module.exports = { speak, playAudio, stop, fallback, audioPaths };