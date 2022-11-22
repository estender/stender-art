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

const rowHeight = 40;

const drawDancingTree = function(p, tree) {
  let rowCount = tree.length;
  tree.map((row, i) => drawRow(p, row, i, rowCount));
};

const drawRow = function(p, row, rowPosition, rowCount) {
  // let isBigText = isOdd(rowPosition);
  // // if (p.frameCount % 200 > 100) {
  // //   isBigText = !isBigText;
  // // }
  // let textSizeModifier = isBigText ? 2 : -2;
  // let textSize = rowHeight; // + (textSizeModifier * (p.cos(rowPosition + p.frameCount / 400) * 2));
  // p.textSize(textSize);
  let scrollModifier = p.frameCount / 4;
  let totalHeight = (rowCount * rowHeight);
  let y =
    totalHeight / 2 +
    ((rowPosition * rowHeight - scrollModifier) % totalHeight);
  let xCenter = p.width / 2;
  let elementCount = row.length;
  let sinXOffset = p.sin(rowPosition + (p.frameCount * 4 / p.width)) * (p.width / 8);
  row.map((element, elementPosition) => {
    let x =
        xCenter + sinXOffset + rowHeight * (elementPosition - elementCount / 2);
    p.text(element, x, y);
  });
};

const addEmoji = function(tree, rowNumber, element) {
  tree[rowNumber].push(element);
};

const removeEmoji = function(tree, rowNumber, element) {
  if (tree[rowNumber].length > 1) {
    const [first, ...remaining] = tree[rowNumber];
    tree[rowNumber] = remaining;
  }
};

export default {
  name: 'Feelings',
  iconColor: '#000',
  script: function (p) {
    let rowCount;
    let emojiTree;

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
      p.textAlign(p.CENTER)
      p.textSize(rowHeight);

      rowCount = Math.ceil(p.height / rowHeight) * 2;
      // initialize tree
      emojiTree = [];
      for (let i = 0; i < rowCount; i++) {
        emojiTree[i] = [];
      }
    };


    p.draw = function () {
      p.background(255);

      let randomRow = Math.floor(Math.random() * rowCount);

      if (p.frameCount % 4 === 0) {
        if (p.frameCount < 600 || p.frameCount % 500 > 300) {
          addEmoji(emojiTree, randomRow, randomEmoji());
        } else {
          removeEmoji(emojiTree, randomRow, randomEmoji());
        }
      }

      drawDancingTree(p, emojiTree);
    };
  },
};
