import { isOdd, oneOrNegOne } from './helpers';

export default {
  name: 'Fade to Mud',
  iconColor: '#000',
  script: function (p) {
    let rowCount, colCount;
    let nodeSize;
    let nodes = [];

    const maxRowsOrCols = 36;
    const creepDistance = 20; // distance in tiles when determining same color neighbor
    const colorCount = 48;
    const lineColor = p.color(80, 80, 80);

    const randomColor = function() {
      return Math.floor(180 * Math.random());
    }

    const pallate = [];
    for (let i = 0; i < colorCount; i++) {
      pallate.push(p.color(60 + randomColor(), 30 + randomColor(), randomColor()));
    }

    const randomPallateColor = function() {
      return pallate[Math.floor(Math.random() * pallate.length)];
    }

    const findValidNeighbors = function (visited, i, j, depth = 0) {
      let neighbors = [];
      visited[i][j] = true;

      if (i - 1 >= 0) {
        if (nodes[i][j] !== nodes[i - 1][j]) {
          neighbors.push([i - 1, j]);
        } else if (depth > 0 && !visited[i - 1][j]) {
          neighbors = neighbors.concat(
            findValidNeighbors(visited, i - 1, j, depth - 1)
          );
        }
      }

      if (i + 1 < rowCount) {
        if (nodes[i][j] !== nodes[i + 1][j]) {
          neighbors.push([i + 1, j]);
        } else if (depth > 0 && !visited[i + 1][j]) {
          neighbors = neighbors.concat(
            findValidNeighbors(visited, i + 1, j, depth - 1)
          );
        }
      }

      if (j - 1 >= 0) {
        if (nodes[i][j] !== nodes[i][j - 1]) {
          neighbors.push([i, j - 1]);
        } else if (depth > 0 && !visited[i][j - 1]) {
          neighbors = neighbors.concat(
            findValidNeighbors(visited, i, j - 1, depth - 1)
          );
        }
      }

      if (j + 1 < colCount) {
        if (nodes[i][j] !== nodes[i][j + 1]) {
          neighbors.push([i, j + 1]);
        } else if (depth > 0 && !visited[i][j + 1]) {
          neighbors = neighbors.concat(
            findValidNeighbors(visited, i, j + 1, depth - 1)
          );
        }
      }

      return neighbors;
    };

    const isSameColor = function(c1, c2) {
      // console.log(
      //   'isSameColor',
      //   c1.toString() === c2.toString(),
      //   c1.toString(), c2.toString()
      // );
      return c1.toString() === c2.toString();
    }

    const findSameColorNeighbors = function (visited, i, j, depth = 0) {
      let neighbors = [];
      visited[i][j] = true;

      if (i - 1 >= 0) {
        if (isSameColor(nodes[i][j], nodes[i - 1][j])) {
          neighbors.push([i - 1, j]);
          if (depth > 0 && !visited[i - 1][j]) {
            neighbors = neighbors.concat(
              findSameColorNeighbors(visited, i - 1, j, depth - 1)
            );
          }
        }

        if (j - 1 >= 0) {
          if (isSameColor(nodes[i][j], nodes[i - 1][j - 1])) {
            neighbors.push([i - 1, j - 1]);
            if (depth > 0 && !visited[i - 1][j - 1]) {
              neighbors = neighbors.concat(
                findSameColorNeighbors(visited, i - 1, j - 1, depth - 1)
              );
            }
          }
        }

        if (j + 1 < colCount) {
          if (isSameColor(nodes[i][j], nodes[i - 1][j + 1])) {
            neighbors.push([i - 1, j + 1]);
            if (depth > 0 && !visited[i - 1][j + 1]) {
              neighbors = neighbors.concat(
                findSameColorNeighbors(visited, i - 1, j + 1, depth - 1)
              );
            }
          }
        }
      }

      if (i + 1 < rowCount) {
        if (isSameColor(nodes[i][j], nodes[i + 1][j])) {
          neighbors.push([i + 1, j]);
          if (depth > 0 && !visited[i + 1][j]) {
            neighbors = neighbors.concat(
              findSameColorNeighbors(visited, i + 1, j, depth - 1)
            );
          }
        }

        if (j - 1 >= 0) {
          if (isSameColor(nodes[i][j], nodes[i + 1][j - 1])) {
            neighbors.push([i + 1, j - 1]);
            if (depth > 0 && !visited[i + 1][j - 1]) {
              neighbors = neighbors.concat(
                findSameColorNeighbors(visited, i + 1, j - 1, depth - 1)
              );
            }
          }
        }

        if (j + 1 < colCount) {
          if (isSameColor(nodes[i][j], nodes[i + 1][j + 1])) {
            neighbors.push([i + 1, j + 1]);
            if (depth > 0 && !visited[i + 1][j + 1]) {
              neighbors = neighbors.concat(
                findSameColorNeighbors(visited, i + 1, j + 1, depth - 1)
              );
            }
          }
        }
      }

      if (j - 1 >= 0) {
        if (isSameColor(nodes[i][j], nodes[i][j - 1])) {
          neighbors.push([i, j - 1]);
          if (depth > 0 && !visited[i][j - 1]) {
            neighbors = neighbors.concat(
              findSameColorNeighbors(visited, i, j - 1, depth - 1)
            );
          }
        }
      }

      if (j + 1 < colCount) {
        if (isSameColor(nodes[i][j], nodes[i][j + 1])) {
          neighbors.push([i, j + 1]);
          if (depth > 0 && !visited[i][j + 1]) {
            neighbors = neighbors.concat(
              findSameColorNeighbors(visited, i, j + 1, depth - 1)
            );
          }
        }
      }

      return neighbors;
    };

    const lerpNeighborColor = function (chosenI, chosenJ) {
      let dx, dy;

      if (Math.random() > 0.5) {
        if (chosenI <= 0) {
          dx = 1;
        } else if (chosenI >= rowCount - 1) {
          dx = -1;
        } else {
          dx = oneOrNegOne();
        }

        dy = 0;
      } else {
        dx = 0;
        if (chosenJ <= 0) {
          dy = 1;
        } else if (chosenJ >= colCount - 1) {
          dy = -1;
        } else {
          dy = oneOrNegOne();
        }
      }

      const visited1 = nodes.map((row) => row.map(() => false));
      const neighbors1 = findSameColorNeighbors(
        visited1,
        chosenI,
        chosenJ,
        creepDistance
      );
      const visited2 = nodes.map((row) => row.map(() => false));
      const neighbors2 = findSameColorNeighbors(
        visited2,
        chosenI + dx,
        chosenJ + dy,
        creepDistance
      );
      const midColor = p.lerpColor(
        nodes[chosenI][chosenJ],
        nodes[chosenI + dx][chosenJ + dy],
        (neighbors2.length + 1) / (neighbors1.length + neighbors2.length + 2)
      );

      nodes[chosenI][chosenJ] = midColor;
      nodes[chosenI + dx][chosenJ + dy] = midColor;
      for (let [i, j] of neighbors1) {
        nodes[i][j] = midColor;
      }
      for (let [i, j] of neighbors2) {
        nodes[i][j] = midColor;
      }
    };

    let flipQueue = []; // list of nodes
    let flipQueueCounter = 0;
    let isMelting = false; // true when tiles are lerping to brown, false when rebuilding random tiles

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();

      nodeSize = Math.floor(Math.max(p.width, p.height) / maxRowsOrCols);
      rowCount = Math.ceil(p.width / nodeSize);
      colCount = Math.ceil(p.height / nodeSize);

      for (let i = 0; i < rowCount; i++) {
        if (!nodes[i]) {
          nodes[i] = [];
        }
        for (let j = 0; j < colCount; j++) {
          nodes[i][j] = randomPallateColor();
          flipQueue.push([i, j]);
        }
      }
    };


    p.draw = function () {
      p.background(0);

      if (flipQueueCounter <= 0) {
        flipQueueCounter = flipQueue.length;
        isMelting = !isMelting;
      }

      // forceCheckboardModifier adds +/- 1 to 2nd tile flipped
      // to random color, to force a different row to be
      // flipped than the tile on the left
      let forceCheckboardModifier =
        isOdd(nodes[0].lengh) || flipQueueCounter <= 1 ? 0 : -1;
      let [chosenI1, chosenJ1] = flipQueue[flipQueueCounter - 1];
      let [chosenI2, chosenJ2] =
        flipQueue[
          flipQueue.length - flipQueueCounter - forceCheckboardModifier
        ];
      if (isMelting) {
        // lerp colors to browns
        lerpNeighborColor(chosenI1, chosenJ1);
        lerpNeighborColor(chosenI2, chosenJ2);
      } else {
        // rebuild checker grid of random colors
        if (isOdd(flipQueueCounter)) {
          nodes[chosenI2][chosenJ2] = randomPallateColor();
        } else {
          nodes[chosenI1][chosenJ1] = randomPallateColor();
        }
      }
      flipQueueCounter--;

      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          // top-left corner coords
          let x = i * nodeSize;
          let y = j * nodeSize;
          let half = nodeSize / 2;
          let thisColor = nodes[i][j];

          // draw main square
          p.noStroke();
          p.strokeWeight(1);
          p.fill(nodes[i][j]);
          p.rect(x, y, nodeSize, nodeSize);

          // draw corners
          let leftColor = i > 0 && nodes[i - 1][j];
          let rightColor = i < rowCount - 1 && nodes[i + 1][j];
          let topColor = j > 0 && nodes[i][j - 1];
          let bottomColor = j < colCount - 1 && nodes[i][j + 1];

          let topLeftColor = i > 0 && j > 0 && nodes[i - 1][j - 1];
          let topRightColor = i < rowCount - 1 && j > 0 && nodes[i + 1][j - 1];
          let bottomLeftColor =
            i > 0 && j < colCount - 1 && nodes[i - 1][j + 1];
          let bottomRightColor =
            i < rowCount - 1 && j < colCount - 1 && nodes[i + 1][j + 1];

          if (
            leftColor &&
            isSameColor(leftColor, bottomColor) &&
            isSameColor(leftColor, bottomLeftColor)
          ) {
            p.fill(leftColor);
            p.triangle(x, y + half, x, y + nodeSize, x + half, y + nodeSize);
          }

          if (
            leftColor &&
            isSameColor(leftColor, topColor) &&
            isSameColor(leftColor, topLeftColor)
          ) {
            p.fill(leftColor);
            p.triangle(x, y, x, y + half, x + half, y);
          }

          if (
            rightColor &&
            isSameColor(rightColor, bottomColor) &&
            isSameColor(rightColor, bottomRightColor)
          ) {
            p.fill(rightColor);
            p.triangle(
              x + half,
              y + nodeSize,
              x + nodeSize,
              y + nodeSize,
              x + nodeSize,
              y + half
            );
          }

          if (
            rightColor &&
            isSameColor(rightColor, topColor) &&
            isSameColor(rightColor, topRightColor)
          ) {
            p.fill(rightColor);
            p.triangle(x + half, y, x + nodeSize, y, x + nodeSize, y + half);
          }
        }
      }
    };
  },
};
