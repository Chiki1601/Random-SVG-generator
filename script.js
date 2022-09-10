let s = Snap("#svg");
let svg = document.querySelector("svg");

function random(from, to, exclude) {
	let x;
	do {
		x = Math.floor(from + Math.random() * (to - from));
	} while (x === exclude);

	return x;
}

let small = 30;
let medium = 50;
let large = 90;

let shapeNumber = 1000;

let colours = [
	"var(--Petrol07)",
	"var(--Mint07)",
	"var(--Lime07)",
	"transparent"
];

let shapes = [
	{
		name:"circle in circle",
		drawShape: (x, y) => {
			let rndColourNumber = random(0, colours.length, undefined);
			s.circle(x, y, large / 2).attr({ fill: colours[rndColourNumber] });
			s.circle(x, y, small / 2).attr({
				fill: colours[random(0, colours.length, rndColourNumber)]
			});			
		},
		size: large,
	},
	{
		name:"square in circle",
		drawShape: (x, y) => {
			let rndColourNumber = random(0, colours.length, undefined);
			s.circle(x, y, large / 2).attr({ fill: colours[rndColourNumber] });
			s.rect(x, y, small, small).attr({
				fill: colours[random(0, colours.length, rndColourNumber)],
				transform: "translate(-15,-15)"
			});			
		},
		size: small,
	},
	{
		name:"diamond in circle",
		drawShape: (x, y) => {
			let rndColourNumber = random(0, colours.length, undefined);
			s.circle(x, y, large / 2).attr({ fill: colours[rndColourNumber] });
			s.polyline(15, 0, 30, 15, 15, 30, 0, 15, 15, 0).attr({
				fill: colours[random(0, colours.length, rndColourNumber)],
				transform: `translate(${x - 15},${y - 15})`
			});
		},
		size: small,
	},
	{
		name: "ring in circle",
		drawShape: (x, y) => {
			let rndColourNumber = random(0, colours.length, undefined);
			s.circle(x, y, large / 2).attr({ fill: colours[rndColourNumber] });
			s.path(
				"M 25 0 C 38.81 0 50 11.19 50 25 C 50 38.81 38.81 50 25 50 C 11.19 50 0 38.81 0 25 C 0 11.19 11.19 0 25 0 Z M 25 10 C 16.72 10 10 16.72 10 25 C 10 33.28 16.72 40 25 40 C 33.28 40 40 33.28 40 25 C 40 16.72 33.28 10 25 10 Z"
			).attr({
				fill: colours[random(0, colours.length, rndColourNumber)],
				transform: `translate(${x - 25},${y - 25})`
			});
		},
		size: medium,
	},
	{
		name: "cross in circle",
		drawShape: (x, y) => {
			let rndColourNumber = random(0, colours.length, undefined);
			s.circle(x, y, large / 2).attr({
				fill: colours[random(0, colours.length, rndColourNumber)]
			});
			s.line(0, 0, 20, 20).attr({
				stroke: colours[rndColourNumber],
				strokeWidth: "8",
				transform: `translate(${x - 10}, ${y - 10})`
			});
			s.line(20, 0, 0, 20).attr({
				stroke: colours[rndColourNumber],
				strokeWidth: "8",
				transform: `translate(${x - 10}, ${y - 10})`
			});
		},
	}
];

const numbers = [];
let lastRnd = -1;
for (let i = 0; i < shapeNumber; i++) {
	let nextRnd = random(0, shapes.length, lastRnd);
	numbers.push(nextRnd);
	lastRnd = nextRnd;
}
console.log(numbers);

let startx = 45;
let starty = 45;
let count = 0;
for (let i = 0; i < numbers.length; i++) {
	shapes[numbers[i]].drawShape(startx, starty);
	startx += 90;
	count += 1;
	if (count === 20) {
		starty += 90;
		startx = 45;
		count = 0;
	}
}
console.log(numbers);