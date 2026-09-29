// tests/audio-assets.test.js
// 字库与本地音频资源完整性测试
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const charsData = require('../data/chars.js');

let audioPlayCount = 0;
global.wx = {
  createInnerAudioContext() {
    return {
      set src(_) {},
      onPlay() {},
      onEnded() {},
      onError() {},
      stop() {},
      play() { audioPlayCount += 1; }
    };
  },
  vibrateShort() {},
  showToast() {}
};

const { speak, audioPaths } = require('../utils/speech.js');
const projectDir = path.join(__dirname, '..');

assert.strictEqual(charsData.chars.length, 54, '字库应包含 54 个字词');
assert.strictEqual(Object.keys(audioPaths).length, 54, '音频映射应覆盖 54 个字词');

for (const item of charsData.chars) {
  const audioPath = audioPaths[item.char];
  assert.ok(audioPath, `缺少「${item.char}」的音频映射`);

  const file = path.join(projectDir, audioPath.replace(/^\//, ''));
  assert.ok(fs.existsSync(file), `缺少「${item.char}」的音频文件`);
  assert.ok(fs.statSync(file).size > 1000, `「${item.char}」的音频文件过小或为空`);

  speak(item.char);
}

assert.strictEqual(audioPlayCount, 54, '每个字词都应进入真实音频播放路径');
console.log('audio asset coverage test passed: 54/54');