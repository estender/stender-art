import runes from 'runes';
import { oneOrNegOne, randomElement, isOdd } from './helpers';

const allEmojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '😏',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁',
  '😣',
  '😖',
  '😫',
  '😩',
  '😢',
  '😭',
  '😮',
  '😤',
  '😠',
  '😡',
  '🤬',
  '🤯',
  '😳',
  '😱',
  '😨',
  '😰',
  '😥',
  '😓',
  '🤗',
  '🤔',
  '🤭',
  '🤫',
  '🤥',
  '😶',
  '😶',
  '😐',
  '😑',
  '😬',
  '🙄',
  '😯',
  '😦',
  '😧',
  '😮',
  '😲',
  '😴',
  '🤤',
  '😪',
  '😵',
  '😵',
  '🤐',
  '🤢',
  '🤮',
  '🤧',
  '😷',
  '🤒',
  '🤕',
  '🤑'
];

const randomEmoji = function() {
  return randomElement(allEmojis);
}

const textSize = 30;

export default {
  name: 'Feelings',
  iconColor: '#000',
  script: function (p) {
    let rowCount;
    const maxCols = 20;

    let emojiTree;

    const maxRowsOrCols = 36;
    const creepDistance = 20; // distance in tiles when determining same color neighbor
    const colorCount = 48;
    const lineColor = p.color(80, 80, 80);

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
      p.textAlign(p.CENTER)
      p.textSize(textSize);

      rowCount = Math.ceil(p.height / textSize);
      emojiTree = new Array(rowCount);
    };


    p.draw = function () {
      p.background(255);

      let randomRow = Math.floor(Math.random() * rowCount);

      if (p.frameCount % 3 === 0) {
        if (p.frameCount < 200 || p.frameCount % 400 > 240) {
          // add an emoji
          let line = emojiTree[randomRow] || '';
          let randomChar = Math.floor(Math.random() * line.length);
          // emojiTree[randomRow] =
          //   line.length > 0
          //     ? runes.substr(line, 0, randomChar) +
          //       randomEmoji() +
          //       runes.substr(line, randomChar)
          //     : randomEmoji();

          emojiTree[randomRow] = isOdd(p.frameCount)
            ? line + randomEmoji()
            : randomEmoji() + line;
        } else {
          // remove an emoji
          let line = emojiTree[randomRow] || '';
          let randomChar = Math.floor(Math.random() * line.length);
          if (randomChar === 0) {
            randomChar = 1;
          }
          // if (line.length > 2 && randomChar > 0) {
          //   emojiTree[randomRow] =
          //     runes.substr(line, 0, randomChar - 1) +
          //     runes.substr(line, randomChar);
          // }

          if (line.length > 2) {
            emojiTree[randomRow] = isOdd(p.frameCount)
              ? runes.substr(line, 0, line.length - 1)
              : runes.substr(line, 1, line.length);
          }
        }
      }


      // display emojis
      for (let i = 0; i < rowCount; i++) {
        p.text(emojiTree[i], p.width / 2, textSize * i);
      }
    };
  },
};
