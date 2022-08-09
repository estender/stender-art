export default {
  name: 'Turf War',
  iconColor: '#000',
  script: function (p) {
    let rowCount, colCount;
    let nodeSize;
    let nodes = [];

    const creepDistance = 20; // distance in tiles to search when flipping colors
    const colorCount = 24;
    const lineColor = p.color(80, 80, 80);

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

      nodeSize = Math.floor(Math.min(p.width, p.height) / 32);
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

          // borders
          let leftColor = i > 0 && nodes[i-1][j];
          let rightColor = i < rowCount - 1 && nodes[i+1][j];
          let topColor = j > 0 && nodes[i][j-1];
          let bottomColor = j < colCount - 1 && nodes[i][j+1];

          let topLeftColor = i > 0 && j > 0 && nodes[i-1][j-1];
          let topRightColor =
            i < rowCount - 1 && j > 0 && nodes[i+1][j-1];
          let bottomLeftColor = i > 0 && j < colCount - 1 && nodes[i-1][j+1];
          let bottomRightColor = i < rowCount - 1 && j < colCount - 1 && nodes[i+1][j+1];

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
