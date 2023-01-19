export default {
  name: 'Color Clover',
  iconColor: '#666',
  script: function (p) {
    let globalAngle = 0;

    let jointCount = 6;
    let jointRadius = 5;
    let jointLength;

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
    };

    const Joint = function (idx) {
      this.x1 = 0;
      this.y1 = 0;
      this.x2 = 0;
      this.y2 = 0;
      this.index = idx;

      this.update = function (x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
      };

      this.display = function (legIndex) {
        let c = rainbowColor((legIndex / legCount) * 360);
        p.stroke(c);
        p.strokeWeight(0.5);
        p.line(this.x1, this.y1, this.x2, this.y2);
      };
    }

    const Leg = function (x0, y0, idx) {
      this.x = x0; // The x- and y-coordinates
      this.y = y0;
      this.index = idx;
      this.joints = [];
      for (let i = 0; i < jointCount; i++) {
        this.joints.push(new Joint(i));
      }

      this.update = function (newAngle) {
        let x1, x2, y1, y2;
        this.angle = (newAngle + (this.index * 360) / legCount) % 360;
        x1 = this.x;
        y1 = this.y;
        for (let i = 0; i < jointCount; i++) {
          x2 = x1 + (jointLength + i) * p.cos(this.angle);
          y2 = y1 + (jointLength + i) * p.sin(this.angle);
          this.joints[i].update(x1, y1, x2, y2);
          x1 = x2;
          y1 = y2;
        }
      };

      this.display = function () {
        let idx = this.index;
        this.joints.forEach(function (joint) {
          joint.display(idx);
        })
      };
    }

    let legs = [];

    p.setup = function () {
      p.angleMode(p.DEGREES);
      p.createCanvas(p.windowWidth, p.windowHeight);
      centerX = p.width / 2;
      centerY = p.height / 2;

      jointLength = Math.max(centerX, centerY) / (jointCount - 1);

      for (let i = 0; i < legCount; i++) {
        legs.push(new Leg(centerX, centerY, i));
      }
    };

    p.draw = function () {
      p.background(0);

      for (let i = 0; i < legCount; i++) {
        legs[i].update(globalAngle);
        legs[i].display();
      }

      globalAngle = (globalAngle + 0.2) % 360;
    };
  },
};
