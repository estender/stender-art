export default {
  name: 'Camoflage',
  iconColor: '#aaa',
  script: function (p) {
    let rows, cols, size, gridSize;
    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(160, 110, 20);
      p.noStroke();
      gridSize = 14;
      size = 6;
      cols = Math.floor(p.windowWidth / (gridSize + 2));
      rows = Math.floor(p.windowHeight / (gridSize + 2));
    };

    p.draw = function () {
      p.background(30, 40, 20);

      for (let i = -5; i <= rows + 5; i++) {
        for (let j = -5; j <= cols + 5; j++) {
          let x = (j / cols) * p.windowWidth;
          let y = (i / rows) * p.windowHeight;
          let graymod =
            p.abs(
              p.sin(
                (Math.pow(i + j, 2) / (Math.pow(i, 2) + Math.pow(j, 2))) *
                  p.millis() * 0.001
              ) * 130
            ) + 30;
          graymod = p.sin(Math.pow(x * y, 2) + p.millis() * 0.0001) * 70;
          let color = p.color(10 + graymod, 30 + graymod, 10 + graymod);

          p.fill(color);
          let xmod = p.sin(p.millis() * 0.0008) * 12;
          let ymod = p.sin(p.millis() * 0.0008) * 12;
          p.quad(
            x - size + xmod,
            y - size - ymod,
            x - size - xmod,
            y + size - ymod,
            x + size - xmod,
            y + size + ymod,
            x + size,
            y - size
          );
        }
      }
    };
  },
};
