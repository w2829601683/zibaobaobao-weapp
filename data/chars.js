// data/chars.js
// 字宝宝数据库：50+ 常用汉字，按主题分类
// emoji 作为占位图，后续可替换为手绘卡通图

module.exports = {
  // ============== 分类元信息 ==============
  categories: [
    { id: 'animal',    name: '动物',     color: '#FFB98A', icon: '🐱', desc: '可爱的小动物' },
    { id: 'fruit',     name: '水果',     color: '#FF8FB3', icon: '🍎', desc: '甜甜的水果' },
    { id: 'food',      name: '食物',     color: '#FFD56B', icon: '🍚', desc: '好吃的东西' },
    { id: 'nature',    name: '自然',     color: '#74C0FC', icon: '☀️', desc: '太阳月亮和天气' },
    { id: 'number',    name: '数字',     color: '#B197FC', icon: '🔢', desc: '1 到 10' },
    { id: 'daily',     name: '用品',     color: '#6BCB77', icon: '👟', desc: '生活小帮手' },
    { id: 'body',      name: '身体',     color: '#FFC9C9', icon: '👁️', desc: '我的身体' }
  ],

  // ============== 汉字列表 ==============
  chars: [
    // 动物
    { char: '猫', pinyin: 'māo', emoji: '🐱', category: 'animal', hint: '喵喵叫的小动物' },
    { char: '狗', pinyin: 'gǒu', emoji: '🐶', category: 'animal', hint: '汪汪叫的小动物' },
    { char: '鱼', pinyin: 'yú',  emoji: '🐟', category: 'animal', hint: '水里游的小动物' },
    { char: '鸟', pinyin: 'niǎo',emoji: '🐦', category: 'animal', hint: '天上飞的小动物' },
    { char: '马', pinyin: 'mǎ',  emoji: '🐴', category: 'animal', hint: '会跑的小动物' },
    { char: '牛', pinyin: 'niú', emoji: '🐮', category: 'animal', hint: '会耕地的小动物' },
    { char: '羊', pinyin: 'yáng',emoji: '🐑', category: 'animal', hint: '有羊毛的小动物' },
    { char: '兔', pinyin: 'tù',  emoji: '🐰', category: 'animal', hint: '蹦蹦跳的小动物' },
    { char: '鸡', pinyin: 'jī',  emoji: '🐔', category: 'animal', hint: '会下蛋的小动物' },
    { char: '鸭', pinyin: 'yā',  emoji: '🦆', category: 'animal', hint: '会游泳的小动物' },

    // 水果
    { char: '苹果', pinyin: 'píng guǒ', emoji: '🍎', category: 'fruit', hint: '红红的脆脆的' },
    { char: '香蕉', pinyin: 'xiāng jiāo', emoji: '🍌', category: 'fruit', hint: '弯弯的黄色的' },
    { char: '西瓜', pinyin: 'xī guā', emoji: '🍉', category: 'fruit', hint: '夏天甜甜的' },
    { char: '葡萄', pinyin: 'pú táo', emoji: '🍇', category: 'fruit', hint: '一串一串紫紫的' },
    { char: '草莓', pinyin: 'cǎo méi', emoji: '🍓', category: 'fruit', hint: '红红的酸酸甜甜' },
    { char: '橙子', pinyin: 'chéng zi', emoji: '🍊', category: 'fruit', hint: '橙黄色的酸酸甜甜' },
    { char: '桃子', pinyin: 'táo zi', emoji: '🍑', category: 'fruit', hint: '粉粉的甜甜的' },
    { char: '菠萝', pinyin: 'bō luó', emoji: '🍍', category: 'fruit', hint: '酸酸的有刺的' },

    // 食物
    { char: '米饭', pinyin: 'mǐ fàn', emoji: '🍚', category: 'food', hint: '白白香香的' },
    { char: '面条', pinyin: 'miàn tiáo', emoji: '🍜', category: 'food', hint: '长长的软软的' },
    { char: '饺子', pinyin: 'jiǎo zi', emoji: '🥟', category: 'food', hint: '过年过节吃的' },
    { char: '鸡蛋', pinyin: 'jī dàn', emoji: '🥚', category: 'food', hint: '圆圆的营养好' },
    { char: '牛奶', pinyin: 'niú nǎi', emoji: '🥛', category: 'food', hint: '白白的香香的' },
    { char: '蛋糕', pinyin: 'dàn gāo', emoji: '🍰', category: 'food', hint: '生日吃的甜甜' },

    // 自然
    { char: '太阳', pinyin: 'tài yáng', emoji: '☀️', category: 'nature', hint: '天上一个红红的' },
    { char: '月亮', pinyin: 'yuè liang', emoji: '🌙', category: 'nature', hint: '晚上弯弯的' },
    { char: '星星', pinyin: 'xīng xing', emoji: '⭐', category: 'nature', hint: '一闪一闪亮晶晶' },
    { char: '云', pinyin: 'yún', emoji: '☁️', category: 'nature', hint: '天上白白的' },
    { char: '雨', pinyin: 'yǔ', emoji: '🌧️', category: 'nature', hint: '滴答滴答从天上掉下来' },
    { char: '雪', pinyin: 'xuě', emoji: '❄️', category: 'nature', hint: '冬天白白的凉凉的' },

    // 数字
    { char: '一', pinyin: 'yī', emoji: '1️⃣', category: 'number', hint: '一根手指' },
    { char: '二', pinyin: 'èr', emoji: '2️⃣', category: 'number', hint: '两根手指' },
    { char: '三', pinyin: 'sān', emoji: '3️⃣', category: 'number', hint: '三根手指' },
    { char: '四', pinyin: 'sì', emoji: '4️⃣', category: 'number', hint: '四根手指' },
    { char: '五', pinyin: 'wǔ', emoji: '5️⃣', category: 'number', hint: '五根手指' },
    { char: '六', pinyin: 'liù', emoji: '6️⃣', category: 'number', hint: '六根手指' },
    { char: '七', pinyin: 'qī', emoji: '7️⃣', category: 'number', hint: '七根手指' },
    { char: '八', pinyin: 'bā', emoji: '8️⃣', category: 'number', hint: '八根手指' },
    { char: '九', pinyin: 'jiǔ', emoji: '9️⃣', category: 'number', hint: '九根手指' },
    { char: '十', pinyin: 'shí', emoji: '🔟', category: 'number', hint: '十根手指' },

    // 日常用品
    { char: '鞋', pinyin: 'xié', emoji: '👟', category: 'daily', hint: '穿在脚上的' },
    { char: '帽', pinyin: 'mào', emoji: '🎩', category: 'daily', hint: '戴在头上的' },
    { char: '衣', pinyin: 'yī', emoji: '👕', category: 'daily', hint: '穿在身上的' },
    { char: '裤', pinyin: 'kù', emoji: '👖', category: 'daily', hint: '穿在腿上的' },
    { char: '书', pinyin: 'shū', emoji: '📚', category: 'daily', hint: '有很多知识' },
    { char: '笔', pinyin: 'bǐ', emoji: '✏️', category: 'daily', hint: '可以写字画画' },
    { char: '桌', pinyin: 'zhuō', emoji: '🪑', category: 'daily', hint: '吃饭写作业的' },
    { char: '床', pinyin: 'chuáng', emoji: '🛏️', category: 'daily', hint: '晚上睡觉的' },

    // 身体
    { char: '眼', pinyin: 'yǎn', emoji: '👁️', category: 'body', hint: '用来看东西的' },
    { char: '耳', pinyin: 'ěr', emoji: '👂', category: 'body', hint: '用来听声音的' },
    { char: '口', pinyin: 'kǒu', emoji: '👄', category: 'body', hint: '用来吃饭说话的' },
    { char: '手', pinyin: 'shǒu', emoji: '✋', category: 'body', hint: '用来拿东西的' },
    { char: '足', pinyin: 'zú', emoji: '🦶', category: 'body', hint: '用来走路的' },
    { char: '心', pinyin: 'xīn', emoji: '❤️', category: 'body', hint: '跳动的小宝贝' }
  ],

  // ============== 工具函数 ==============
  /** 根据分类 ID 取出对应汉字 */
  getByCategory(categoryId) {
    return this.chars.filter(c => c.category === categoryId);
  },

  /** 随机取一个字（用于小测验） */
  randomOne(exclude) {
    const pool = exclude
      ? this.chars.filter(c => !exclude.includes(c))
      : this.chars;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  /** 随机取 N 个字（用于小测验干扰项） */
  randomN(n, exclude = []) {
    const pool = this.chars.filter(c => !exclude.find(e => e.char === c.char));
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }
};