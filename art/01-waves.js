const COLS = 100;
const ROWS = 10;
const CURVE_HEIGHT = 128;
const CIRCLE_SIZE = 8;

export default {
  name: 'Mountains & Waves',
  script: function(p) {
    let counter = 0;

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(100, 20, 20);
      p.noStroke();
    };

    p.draw = function () {
      let midX = p.windowWidth / 2;
      let midY = p.windowHeight / 2;

      let rowColors = [
        [111, 111, 222],
        [178, 73, 152],
        [143, 73, 92],
        [111, 66, 78],
        [143, 73, 121],
        [143, 73, 152],
        [63, 73, 122],
        [93, 53, 152],
        [143, 73, 112],
        [111, 111, 222],
      ];

      p.clear();
      p.background(100, 20, 20);
      p.fill(100, 24, 20);
      const sunSize = p.windowWidth * 0.8;
      p.ellipse(
        midX,
        ((counter * 0.5) % (4 * p.windowHeight)) - 1.5 * p.windowHeight,
        sunSize,
        sunSize
      );

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let x = (j / COLS) * p.windowWidth;
          let y = midY + (CURVE_HEIGHT / ROWS) * (ROWS / 2 - i);
          let sinX = p.sin(x / 30 - counter / 200) * 20;
          let rowAlpha = p.abs(p.tan(y + counter * 0.01) * 128);
          let firstBump = 0;
          let bumpWidth = 20;
          let bumpMid = COLS / 2;
          if (true) {
            // }  (Math.floor((j + counter) / 5) % 2 == 0)) {
            firstBump =
              (bumpWidth / 2 - p.abs(j - bumpMid)) *
              2 *
              p.tan((counter * 0.005) % 360);
          } else {
            firstBump =
              (bumpWidth / 2 - abs(j - bumpMid)) *
              -2 *
              sin((counter * 0.0001) % 360);
          }
          p.fill(rowColors[i][0], rowColors[i][1], rowColors[i][2], rowAlpha);
          p.noStroke();
          p.ellipse(x, y + sinX + firstBump, CIRCLE_SIZE, CIRCLE_SIZE);
        }
      }

      counter++;
    };
  },
};
