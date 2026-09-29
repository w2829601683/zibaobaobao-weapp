// tests/speech.test.js
// 语音播放回归测试：验证点击一个字会进入真实音频播放路径
const assert = require('assert');

let played = 0;
let playedSrc = '';
let toastCount = 0;

global.wx = {
  createInnerAudioContext() {
    return {
      set src(value) { playedSrc = value; },
      onPlay() {},
      onEnded() {},
      onError() {},
      play() { played += 1; },
      stop() {},
      destroy() {}
    };
  },
  vibrateShort() {},
  showToast() { toastCount += 1; }
};

const speech = require('../utils/speech.js');

speech.speak('猫');

assert.strictEqual(played, 1, '点击“跟我读”应该调用音频 play()');
assert.ok(playedSrc.endsWith('/assets/audio/char-001.mp3'), `应播放猫的本地音频，实际路径：${playedSrc}`);
assert.strictEqual(toastCount, 0, '音频可播放时不应降级为 Toast');

console.log('speech playback test passed');