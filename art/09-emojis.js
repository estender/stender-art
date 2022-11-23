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
const shiftSpeed = 0.2;

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
    rowHeight + totalHeight / 1.5 +
    ((rowPosition * rowHeight - scrollModifier) % totalHeight);
  let xCenter = p.width / 2;

  let shiftOffset = 0;
  if (row.isAdding) {
    if (row.shiftCounter < rowHeight / -2) {
      row.elements.push(randomEmoji());
      row.isAdding = false;
      row.shiftCounter = 0;
    } else {
      row.shiftCounter -= shiftSpeed;
      shiftOffset = row.shiftCounter;
    }
  }

  if (row.isRemoving) {
    if (row.shiftCounter < rowHeight / -2) {
      const [first, ...remaining] = row.elements;
      row.elements = remaining;
      row.isRemoving = false;
      row.shiftCounter = 0;
    } else {
      row.shiftCounter -= shiftSpeed;
      shiftOffset = row.shiftCounter;
    }
  }

  let elementCount = row.elements.length;
  let sinXOffset =
    p.sin(rowPosition + (p.frameCount * 4) / p.width) * ((p.width / 2) - 100);

  row.elements.map((element, elementPosition) => {
    let x =
      xCenter +
      sinXOffset +
      shiftOffset +
      rowHeight * (1 + elementPosition - elementCount / 2);
    p.text(element, x, y);
  });
};

const addEmoji = function(tree, rowNumber, element) {
  const { isAdding, isRemoving } = tree[rowNumber];
  if (!isAdding && !isRemoving) {
    tree[rowNumber].isAdding = true;
    tree[rowNumber].shiftCounter = 0;
  }
};

const removeEmoji = function(tree, rowNumber, element) {
  const { elements, isAdding, isRemoving } = tree[rowNumber];
  if (!isAdding && !isRemoving) {
    const [first, ...remaining] = elements;
    tree[rowNumber] = {
      elements: elements,
      isAdding: false,
      isRemoving: true,
      shiftCounter: 0,
    };
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

      rowCount = Math.ceil(p.height / rowHeight) * 1.4;
      // initialize tree
      emojiTree = [];
      for (let i = 0; i < rowCount; i++) {
        emojiTree[i] = {
          elements: [],
          isAdding: false,
          isRemoving: false,
          shiftCounter: 0
        };
      }
    };


    p.draw = function () {
      p.background(255);

      let randomRow = Math.floor(Math.random() * rowCount);

      if (p.frameCount % 800 < 400) {
        addEmoji(emojiTree, randomRow, randomEmoji());
      } else {
        removeEmoji(emojiTree, randomRow, randomEmoji());
      }

      drawDancingTree(p, emojiTree);
    };
  },
};
