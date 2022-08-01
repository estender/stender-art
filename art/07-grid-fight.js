// const pallate = [
//   [244,51,51],
//   [255,152,184],
//   [255,182,240],
//   [255,124,192],
//   [255,135,137]
// ];

// const pallate = [
//   [207,226,243],
//   [244,204,204],
//   [255,242,204],
//   [217,234,211],
//   [252,229,205]
// ];

export default {
  name: 'Grid Fight',
  iconColor: '#000',
  script: function (p) {
    let rowCount, colCount;
    let nodes = [];

    const creepDistance = 20;
    const nodeSize = 24;
    const colorCount = 30;
    const lineColor = p.color(80, 80, 80);

// const pallate = [
//   [207, 226, 243],
//   [244, 204, 204],
//   [255, 242, 204],
//   [217, 234, 211],
//   [252, 229, 205],
// ].map(([r, g, b]) => p.color(r, g, b));

//     const pallate = [
//       [231, 213, 185],
//       [147, 51, 237],
//       [41, 131, 212],
//       [220, 50, 150],
// //      [0, 0, 0],
//     ].map(([r, g, b]) => p.color(r, g, b));

    const randomColor = function() {
      return Math.floor(30 + 200 * Math.random());
    }

    const pallate = [];
    for (let i = 0; i < colorCount; i++) {
      pallate.push(p.color(randomColor(), randomColor(), randomColor()));
    }

    const randomPallateColor = function() {
      return pallate[Math.floor(Math.random() * pallate.length)];
    }

    const oneOrNegOne = function(){
      return Math.random() > 0.5 ? 1 : -1;
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(val, max));
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

    // const updateRandomNeighborSimple = function () {
    //   let dx, dy;
    //   let chosenI = Math.floor(Math.random() * rowCount);
    //   let chosenJ = Math.floor(Math.random() * colCount);

    //   if (Math.random() > 0.5) {
    //     if (chosenI <= 0) {
    //       dx = 1;
    //     } else if (chosenI >= rowCount - 1) {
    //       dx = -1;
    //     } else {
    //       dx = oneOrNegOne();
    //     }

    //     dy = 0;
    //   } else {
    //     dx = 0;
    //     if (chosenJ <= 0) {
    //       dy = 1;
    //     } else if (chosenJ >= colCount - 1) {
    //       dy = -1;
    //     } else {
    //       dy = oneOrNegOne();
    //     }
    //   }

    //   if (Math.random() > 0.5) {
    //     nodes[chosenI + dx][chosenJ + dy] = nodes[chosenI][chosenJ];
    //   } else {
    //     nodes[chosenI][chosenJ] = nodes[chosenI + dx][chosenJ + dy];
    //   }
    // };

    const updateRandomNeighbor = function () {
      let chosenI = Math.floor(Math.random() * rowCount);
      let chosenJ = Math.floor(Math.random() * colCount);
      const visited = nodes.map(row => row.map(() => false));
      const neighbors = findValidNeighbors(
        visited,
        chosenI,
        chosenJ,
        creepDistance
      );

      for (let n of neighbors) {
        nodes[n[0]][n[1]] = nodes[chosenI][chosenJ];
      };
    };

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();

      rowCount = Math.ceil(p.width / nodeSize);
      colCount = Math.ceil(p.height / nodeSize);

      for (let i = 0; i < rowCount; i++) {
        if (!nodes[i]) {
          nodes[i] = [];
        }
        for (let j = 0; j < colCount; j++) {
          nodes[i][j] = randomPallateColor();
        }
      }
    };

    p.draw = function () {
      p.background(0);

      updateRandomNeighbor();

      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          // top-left corner coords
          let x = i * nodeSize;
          let y = j * nodeSize;
          let half = nodeSize / 2;
          let thisColor = nodes[i][j];

          // main square
          p.noStroke();
          p.strokeWeight(1);
          p.fill(nodes[i][j]);
          p.rect(x, y, nodeSize, nodeSize);

          // corners
          let leftColor = i > 0 && nodes[i-1][j];
          let rightColor = i < rowCount - 1 && nodes[i+1][j];
          let topColor = j > 0 && nodes[i][j-1];
          let bottomColor = j < colCount - 1 && nodes[i][j+1];

          let topLeftColor = i > 0 && j > 0 && nodes[i-1][j-1];
          let topRightColor =
            i < rowCount - 1 && j > 0 && nodes[i+1][j-1];
          let bottomLeftColor = i > 0 && j < colCount - 1 && nodes[i-1][j+1];
          let bottomRightColor = i < rowCount - 1 && j < colCount - 1 && nodes[i+1][j+1];

          // if (leftColor && leftColor === bottomColor && leftColor === bottomLeftColor) {
          //   p.fill(leftColor);
          //   p.triangle(x, y + half, x, y + nodeSize, x + half, y + nodeSize);

          //   if (thisColor !== leftColor) {
          //     p.stroke(lineColor);
          //     p.line(x, y + half, x + half, y + nodeSize);
          //     p.noStroke();
          //   }
          // }

          // if (
          //   leftColor &&
          //   leftColor === topColor &&
          //   leftColor === topLeftColor
          // ) {
          //   p.fill(leftColor);
          //   p.triangle(x, y, x, y + half, x + half, y);

          //   if (thisColor !== leftColor) {
          //     p.stroke(lineColor);
          //     p.line(x + half, y, x, y + half);
          //     p.noStroke();
          //   }
          // }

          // if (
          //   rightColor &&
          //   rightColor === bottomColor &&
          //   rightColor === bottomRightColor
          // ) {
          //   p.fill(rightColor);
          //   p.triangle(
          //     x + half,
          //     y + nodeSize,
          //     x + nodeSize,
          //     y + nodeSize,
          //     x + nodeSize,
          //     y + half
          //   );

          //   if (thisColor !== rightColor) {
          //     p.stroke(lineColor);
          //     p.line(x + half, y + nodeSize, x + nodeSize, y + half);
          //     // p.line(x + nodeSize, y + half, x + nodeSize, y + nodeSize);
          //     if (thisColor !== leftColor && thisColor !== bottomColor) {
          //       p.line(x + nodeSize, y, x + nodeSize, y + half);
          //     }
          //     p.noStroke();
          //   }
          // }

          // if (
          //   rightColor &&
          //   rightColor === topColor &&
          //   rightColor === topRightColor
          // ) {
          //   p.fill(rightColor);
          //   p.triangle(x + half, y, x + nodeSize, y, x + nodeSize, y + half);

          //   if (thisColor !== rightColor) {
          //     p.stroke(lineColor);
          //     p.line(x + half, y, x + nodeSize, y + half);
          //     if (thisColor !== leftColor && thisColor !== topColor) {
          //       p.line(x, y, x + half, y);
          //     }
          //     p.noStroke();
          //   }
          // }

          if (thisColor !== topColor) {
            p.stroke(lineColor);
            p.line(x, y, x + nodeSize, y);
            p.noStroke();
          }

          if (thisColor !== bottomColor) {
            p.stroke(lineColor);
            p.line(x, y + nodeSize, x + nodeSize, y + nodeSize);
            p.noStroke();
          }

          if (thisColor !== leftColor) {
            p.stroke(lineColor);
            p.line(x, y, x, y + nodeSize);
            p.noStroke();
          }

          if (thisColor !== rightColor) {
            p.stroke(lineColor);
            p.line(x + nodeSize, y, x + nodeSize, y + nodeSize);
            p.noStroke();
          }
        }
      }
    };
  },
};
