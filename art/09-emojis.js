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
const fadeSpeed = 0.02;

const drawDancingTree = function(p, tree) {
  let rowCount = tree.length;
  tree.map((row, i) => drawRow(p, row, i, rowCount));
};

const drawRow = function(p, row, rowPosition, rowCount) {
  let scrollModifier = p.frameCount / 4;
  let totalHeight = (rowCount * rowHeight);
  let y =
    rowHeight * 2 + totalHeight / 1.5 +
    ((rowPosition * rowHeight - scrollModifier) % totalHeight);
  let xCenter = p.width / 2;

  let shiftOffset = 0;
  if (row.isAdding) {
    if (row.shiftCounter < rowHeight / -2) {
      row.elements.push(randomEmoji());
      row.shiftCounter = 1;
      row.fadeOpacity = 0;
    } else if (row.shiftCounter == 1) {
      if (row.fadeOpacity > 1) {
        row.isAdding = false;
        row.fadeOpacity = 0;
        row.shiftCounter = 0;
      } else {
        row.fadeOpacity += fadeSpeed;
      }
    } else {
      row.shiftCounter -= shiftSpeed;
      shiftOffset = row.shiftCounter;
    }
  }

  if (row.isRemoving) {
    if (row.shiftCounter > rowHeight / -2) {
      row.shiftCounter -= shiftSpeed;
    } else if (row.fadeOpacity > 0) {
      row.fadeOpacity -= fadeSpeed;
    } else {
      const [first, ...remaining] = row.elements;
      row.elements = remaining;
      row.isRemoving = false;
      row.shiftCounter = 0;
      row.fadeOpacity = 0;
    }

    shiftOffset = row.shiftCounter;
  }

  let elementCount = row.elements.length;
  let sinXOffset =
    p.sin(rowPosition + (p.frameCount * 4) / p.width) * (p.width / 7);

  row.elements.map((element, elementPosition) => {
    let x =
      xCenter +
      sinXOffset +
      shiftOffset +
      rowHeight * (1 + elementPosition - elementCount / 2);
    let color = p.color(0, 0, 0);
    if (
      (row.isRemoving && elementPosition === 0) ||
      (row.isAdding && elementPosition === elementCount - 1 && row.fadeOpacity >= 0)
    ) {
      color.setAlpha(row.fadeOpacity * 256);
    }
    p.fill(color);
    p.text(element, x, y);
  });
};

const addEmoji = function(tree, rowNumber) {
  const { isAdding, isRemoving } = tree[rowNumber];
  if (!isAdding && !isRemoving) {
    tree[rowNumber].isAdding = true;
    tree[rowNumber].shiftCounter = 0;
    tree[rowNumber].fadeOpacity = -1;
  }
};

const removeEmoji = function(tree, rowNumber) {
  const { elements, isAdding, isRemoving } = tree[rowNumber];
  if (!isAdding && !isRemoving && elements.length > 0) {
    tree[rowNumber].isRemoving = true;
    tree[rowNumber].shiftCounter = 0;
    tree[rowNumber].fadeOpacity = 1;
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
          shiftCounter: 0,
          fadeOpacity: 0,
        };
      }
    };


    p.draw = function () {
      p.background(255);

      let randomRow = Math.floor(Math.random() * rowCount);

      if (p.frameCount % 2 === 0) {
        if (p.frameCount % (200 + p.width * 3) < (100 + p.width * 1.5)) {
          addEmoji(emojiTree, randomRow);
        } else {
          removeEmoji(emojiTree, randomRow);
        }
      }

      drawDancingTree(p, emojiTree);
    };
  },
};
