export default {
  name: 'Camouflage',
  iconColor: '#ddd',
  script: function (p) {
    let rows, cols, size, gridSize;
    let xmid, ymid;
    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(160, 110, 20);
      p.noStroke();
      gridSize = 14;
      size = 6;
      xmid = p.windowWidth / 2;
      ymid = p.windowHeight / 2;
      cols = Math.floor(p.windowWidth / (gridSize + 2));
      rows = Math.floor(p.windowHeight / (gridSize + 2));
    };

    p.draw = function () {
      p.background(30, 40, 20);

      for (let i = -5; i <= rows + 5; i++) {
        for (let j = -5; j <= cols + 5; j++) {
          let x = (j / cols) * p.windowWidth;
          let y = (i / rows) * p.windowHeight;
          let xdist = Math.abs(x - xmid);
          let ydist = Math.abs(y - ymid);
          let graymod = p.abs(p.sin(xdist + ydist + p.millis() * 0.0004) * 60);
          graymod += p.sin(Math.pow(x * y, 2) + p.millis() * 0.0001) * 40;
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
