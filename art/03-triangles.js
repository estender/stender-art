const TRI_COUNT = 311;
const SIZE = 20;

export default {
	name: 'Triangle Tornado',
	script: function(p) {
		let counter = 0;

		let palate;

		const tris = [];

		p.setup = function() {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.angleMode(p.DEGREES);
			p.background(244, 244, 255);
			p.noStroke();

			palate = [
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
			].map(rgb => {
				let c = p.color(...rgb);
				c.setAlpha(190);
				return c;
			});

			for (let i = 0; i < TRI_COUNT; i++) {
				let t = {
					x: Math.floor(Math.random() * p.windowWidth),
					y: Math.floor(Math.random() * p.windowHeight),
					size: Math.floor(Math.random() * 10 + 8),
					rotation: Math.floor(Math.random() * 360),
					color: palate[Math.floor(Math.random() * palate.length)],
				};
				tris.push(t);
			}
		}

		p.draw = function() {
			let midColor = p.color(225, 225, 225);

			p.clear();
			p.fill(midColor);
			p.translate(p.width / 2, p.height / 2);
			p.triangle(p.width, -1 * p.height, -1 * p.width, 0, -1 * p.width, p.height);
			p.triangle(
				0.2 * p.width,
				0,
				-0.3 * p.width,
				-1.5 * p.height,
				-0.3 * p.width,
				1.5 * p.height
			);
			p.push();
			for (let i = 0; i < tris.length; i++) {
				const t = tris[i];
				p.fill(t.color);
				p.rotate((t.rotation + counter / 200) % 360);
				let randoModifier = i % 2 == 0 ? -1 : 1;
				let sinC = p.sin((counter / 10 + i * 5) % 360) * 2 * randoModifier;
				p.triangle(
					t.x + sinC,
					t.y - t.size,
					t.x - sinC - t.size,
					t.y + t.size,
					t.x + sinC + t.size,
					t.y - sinC + t.size
				);
			}
			p.pop();
			p.fill(midColor);
			p.triangle(0, 0, p.width, 0, p.width, 0.5 * p.height);
			p.triangle(0, 0, -1 * p.width, 0, -1 * p.width, -0.5 * p.height);
			p.triangle(0, 0, 0, -1 * p.height, 0.3 * p.width, -1 * p.height);

			counter++;
		}
	}
}