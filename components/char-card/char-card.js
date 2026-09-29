// components/char-card/char-card.js
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: false
  },

  properties: {
    char: {
      type: String,
      required: true
    },
    pinyin: {
      type: String,
      value: ''
    },
    emoji: {
      type: String,
      value: ''
    },
    hint: {
      type: String,
      value: ''
    },
    /** 是否已学习（点亮星星） */
    learned: {
      type: Boolean,
      value: false
    },
    stars: {
      type: Number,
      value: 0
    },
    /** 卡片大小：large | medium | small */
    size: {
      type: String,
      value: 'large'
    }
  },

  data: {},

  methods: {
    onTap() {
      this.triggerEvent('tap', {
        char: this.data.char,
        pinyin: this.data.pinyin,
        emoji: this.data.emoji
      });
    }
  }
});