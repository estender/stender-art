export default {
  name: 'Infinite Kaleidoscope',
  script: function(p) {
    let symmetry = 12;

    let angle = 360 / symmetry;

    let prevStroke = 2;

    let counter = 0;

    let x = 0;
    let y = 0;
    let px = x;
    let py = y;

    let pr = 128;
    let pb = 128;
    let pg = 128;

    function negOneToOne() {
      return Math.random() * 2 - 1;
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(val, max));
    }

    p.setup = function() {
      p.createCanvas(p.windowWidth, p.windowHeight);
      x = p.windowWidth / 2;
      y = p.windowHeight / 2;
      p.angleMode(p.DEGREES);
      p.background(24);
    }

    p.draw = function() {
      p.translate(p.width / 2, p.height / 2);
      p.rotate(10);
      x = clamp(
        Math.round(x + negOneToOne() * 4 * Math.log2(counter) + 0.2),
        0,
        p.width
      );
      y = clamp(
        Math.round(y + negOneToOne() * 4 * Math.log2(counter) + 0.2),
        0,
        p.height
      );

      let mx = x - p.width / 2;
      let my = y - p.height / 2;
      let pmx = px - p.width / 2;
      let pmy = py - p.height / 2;

      pr = clamp(pr + negOneToOne() * 6, 0, 255);
      pb = clamp(pb + negOneToOne() * 6, 0, 255);
      pg = clamp(pg + negOneToOne() * 6, 0, 255);
      for (let i = 0; i < symmetry; i++) {
        p.rotate(angle);
        prevStroke = clamp(prevStroke + negOneToOne(), 1, 3);
        p.strokeWeight(prevStroke);
        p.stroke(pr, pb, pg);
        p.line(mx, my, pmx, pmy);
        p.push();
        p.scale(1, -1);
        p.line(mx, my, pmx, pmy);
        p.pop();
      }

      px = x;
      py = y;
      counter++;
    }
  }
}
