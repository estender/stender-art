// import sample from 'lodash/sample';

const pallate = [
  [231,213,185],
  [147,51,237],
  [41,131,212],
  [220,50,150],
  [0,0,0]
];

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
    let nodeSize = 20;
    let nodes = [];

    const random255 = function() {
      return Math.floor(20 + 80 * Math.floor(2 * Math.random()));
    }

    const randomPColor = function() {
      const color = pallate[Math.floor(Math.random() * pallate.length)];
      return p.color(...color);
    }

    const oneOrNegOne = function(){
      return Math.random() > 0.5 ? 1 : -1;
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(val, max));
    }

    const findValidNeighbors = function (i, j) {
      const neighbors = [];

      if (i - 1 > 0) {
        if (nodes[i][j] != nodes[i - 1][j]) {
          neighbors.push([i - 1, j]);
        }
      }

      if (i + 1 < rowCount) {
        if (nodes[i][j] != nodes[i + 1][j]) {
          neighbors.push([i + 1, j]);
        }
      }

      if (j - 1 > 0) {
        if (nodes[i][j] != nodes[i][j - 1]) {
          neighbors.push([i, j - 1]);
        }
      }

      if (j + 1 < colCount) {
        if (nodes[i][j] != nodes[i][j + 1]) {
          neighbors.push([i, j + 1]);
        }
      }

      return neighbors;
    }

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
      const neighbors = findValidNeighbors(chosenI, chosenJ);

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
          nodes[i][j] = randomPColor();
        }
      }
    };

    p.draw = function () {
      p.background(0);

      updateRandomNeighbor();

      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          p.fill(nodes[i][j]);
          p.rect(i * nodeSize, j * nodeSize, nodeSize, nodeSize);
        }
      }
    };
  },
};
