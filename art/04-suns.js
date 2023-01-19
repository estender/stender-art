const CIRCLE_SIZE = 20;

export default {
  name: 'Too Much Sun',
  iconColor: '#ddd',
  script: function (p) {
    let rows, cols, circleDiameter;
    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(160, 110, 20);
      p.noStroke();
      cols = Math.floor(p.windowWidth / (CIRCLE_SIZE + 2));
      rows = Math.floor(p.windowHeight / (CIRCLE_SIZE - 10));
      circleDiameter = CIRCLE_SIZE;
    };

    p.draw = function () {
      p.background(100, 20, 80);

      for (let i = -5; i <= rows + 5; i++) {
        for (let j = -5; j <= cols + 5; j++) {
          let x = (j / cols) * p.windowWidth;
          let y = (i / rows) * p.windowHeight;
          let wiggle = p.cos(p.millis() * 0.001) * 4;
          // let rowAlpha = p.abs(p.sin(i + p.millis() * 0.001) * 128);
          let alternator = i % 2 === 0 ? 1 : -1;
          let bluemod = p.sin(p.millis() * 0.002) * p.cos((i % j) * 20) * 20;
          let gmod = p.cos(p.millis() * 0.0006) * ((j / 2) - j) * 4;
          let amod = p.sin(p.millis() * 0.001) * (i / 2 - i);
          p.fill(211 + amod, 89 + wiggle * 10 + gmod, 156 + bluemod);
          p.ellipse(x + wiggle * alternator, y, circleDiameter, circleDiameter);
        }
      }
    };
  },
};
