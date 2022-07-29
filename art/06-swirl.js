export default {
  name: 'Swirls',
  iconColor: '#aaa',
  script: function (p) {
    let s1, s2;
    let gravity = 9.0;
    let mass = 2.0;

    let angle = 0;

    let jointCount = 6;
    let jointLength = 150;
    let jointRadius = 5;

    let legCount = 100;

    let centerX, centerY;

    const rainbowColor = function (a) {
      let r, g, b;
      if (a > 120 && a < 300) {
        r = 256 * ((180 - a) / 60);
      } else if (a > 300) {
        r = 256 * ((a - 300) / 60);
      } else {
        r = 255;
      }
      if (a > 60 && a < 240) {
        g = 256 * ((a - 60) / 60);
      } else if (a > 240) {
        g = 256 * ((300 - a) / 60);
      } else {
        g = 0;
      }
      if (a < 180) {
        b = 256 * ((60 - a) / 60);
      } else {
        b = 256 * ((a - 180) / 60);
      }

      return p.color(r, g, b);
    }


    p.setup = function () {
      p.angleMode(p.DEGREES);
      p.createCanvas(p.windowWidth, p.windowHeight);
      centerX = p.width / 2;
      centerY = p.height / 2;

      jointLength = Math.max(centerX, centerY) / (jointCount-1);
    };

    p.draw = function () {
      p.background(0);
      let x1, x2, y1, y2;

      for (let i = 0; i < legCount; i++) {
        let thisAngle = (angle + (i * 360) / legCount) % 360;
        x1 = p.width / 2;
        y1 = p.height / 2;

        for (let j = 1; j <= jointCount; j++) {
          x2 = x1 + (jointLength + j) * p.cos(thisAngle);
          y2 = y1 + (jointLength + j) * p.sin(thisAngle);

          p.noStroke();
          let lineConstant = 256 * (Math.abs(p.sin(thisAngle)));
          let c = rainbowColor(((i - 1) / legCount) * 359);
          p.stroke(c);
          // p.strokeWeight((5 * Math.pow(j, 2)) / Math.pow(jointCount, 2));
          p.strokeWeight((5 * j) / jointCount);
          p.strokeWeight(0.5);

          p.line(x1, y1, x2, y2);

          x1 = x2;
          y1 = y2;
        }
      }

      angle = (angle + 0.2) % 360;
    };
  },
};
