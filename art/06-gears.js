export default {
  name: 'The Grind',
  iconColor: '#aaa',
  script: function (p) {
    // let rows, cols, size, gridSize;
    let radius = 55;
    let cols = Math.ceil(p.windowWidth / (radius * 1.9));
    let rows = Math.ceil(p.windowHeight / (radius * 1.9));
    // let xmid, ymid;
    function star(x, y, radius1, radius2, npoints) {
      let angle = p.TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += angle) {
        let sx = x + p.cos(a) * radius2;
        let sy = y + p.sin(a) * radius2;
        p.vertex(sx, sy);
        sx = x + p.cos(a + halfAngle) * radius1;
        sy = y + p.sin(a + halfAngle) * radius1;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
    }

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = function () {
      p.background(100, 50, 20);

      for (let i = -1; i <= cols; i++) {
        for (let j = -1; j <= rows; j++) {
          let xoffset = i % 2 === 0 ? 1 : 0;
          let yoffset = j % 2 === 0 ? 1 : 0;
          let direction = (i + j) % 2 === 0 ? -1 : 1;
          let grow = p.sin(p.millis() * 0.0004 * direction) * 0.2;
          let colorfade =
            p.sin(10000 + p.millis() * 0.0002 * (i)) * 0.3 +
            p.cos(10000 + p.millis() * 0.0002 * (j)) * 0.2;
          p.push();
          p.fill(204 * (1 + colorfade), 102 * (1 + colorfade), 0);
          p.translate(
            p.width * (i / cols),
            p.height * (j / rows) + (xoffset * radius) / 2
          );
          p.rotate((p.frameCount / 200.0) * direction);
          star(
            0,
            0,
            (radius - 20) * (1 + grow + colorfade * 0.2),
            radius * (1 + grow + colorfade * 0.2),
            20
          );
          p.pop();
        }
      }
    };
  },
};
