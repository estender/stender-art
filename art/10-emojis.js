import { randomElement } from './helpers';

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

const rowHeight = 40;   // row height and emoji font size in pixels
const shiftSpeed = 0.2; // number of pixels to shift row horizontally when adding/removing
const fadeSpeed = 0.02; // amount of opacity (0.0 to 1.0) to change fade per frame

const drawDancingTree = function(p, tree) {
  let rowCount = tree.length;
  tree.map((row, i) => drawRow(p, row, i, rowCount));
};

const drawRow = function(p, row, rowPosition, rowCount) {
  let totalHeight = (rowCount * rowHeight);
  let scrollModifier = p.frameCount / 4;
  let y =
    rowHeight * 2 + totalHeight / 1.5 +
    ((rowPosition * rowHeight - scrollModifier) % totalHeight);

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

  let xCenter = p.width / 2;
  let sinXOffset =
    p.sin(rowPosition + (p.frameCount * 4) / p.width) * (p.width / 7);

  // draw rows
  let elementCount = row.elements.length;
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

const createInitialTree = function (rowCount) {
  let tree = [];
  for (let i = 0; i < rowCount; i++) {
    tree[i] = {
      elements: [],
      isAdding: false,
      isRemoving: false,
      shiftCounter: 0,
      fadeOpacity: 0,
    };
  }
  return tree;
};

export default {
  name: 'Feelings',
  iconColor: '#000',
  script: function (p) {
    let emojiTree;
    let growthThreshold; // period of frames between addition and removal phases
    let growthMultiplier = 0.9; // 1.0 mostly stable, more than 1 continual growth, less than one returns to empty

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
      p.textAlign(p.CENTER);
      p.textSize(rowHeight);

      growthThreshold = Math.min(800, 300 + p.width);

      let rowCount = (rowCount = Math.ceil(p.height / rowHeight) * 1.4);
      emojiTree = createInitialTree(rowCount);
    };

    p.draw = function () {
      p.background(255);

      // update tree every X frames
      if (p.frameCount % 2 === 0) {
        let randomRow = Math.floor(Math.random() * emojiTree.length);

        // queue addition or removal of emoji's
        // oscillate between adding and removing emoji's based on time and growth params
        if (
          p.frameCount % (2 * growthThreshold) <
          growthThreshold * growthMultiplier
        ) {
          addEmoji(emojiTree, randomRow);
        } else {
          removeEmoji(emojiTree, randomRow);
        }
      }

      // draw (modifies emojiTree)
      drawDancingTree(p, emojiTree);
    };
  },
};
