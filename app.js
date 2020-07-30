const options = document.querySelectorAll('.choice');
const reset = document.querySelector('#reset');
const p1Score = document.querySelector('#p1Score');
const p2Score = document.querySelector('#p2Score');
const Score = document.querySelector('.maxScore span');

let range = document.getElementById('range');
let base = window.getComputedStyle(document.body).getPropertyValue('--base');
let second = window.getComputedStyle(document.body).getPropertyValue('--second');

const pop = document.querySelector('#popup-1');
const content = document.querySelector('.content');

let yes = document.createElement('button');
let no = document.createElement('button');
let res = document.createElement('h2');

content.appendChild(res);

yes.innerHTML = 'yes';
no.innerHTML = 'no';

const game = [ 'rock', 'paper', 'scissor' ];

let gameOver = false,
	i = 0,
	j = 0,
	maxScore = 4;

Score.innerText = maxScore;
const userInput = () => {
	for (option of options) {
		option.addEventListener('click', function() {
			if (!gameOver && this.value != null) {
				let input1 = this.value;

				let input2 = comp();

				gameLogic(input1, input2);

				displayScores();

				evaluate();
			}
		});
	}
};

// fn for evaluating winner
const evaluate = () => {
	if (i == maxScore || j == maxScore) {
		gameOver = true;

		const msg = 'reached the max score!! Play Again!!';

		if (i == j) {
			res.innerText = `it's a draw!! play again!!`;
			togglePopup();
			return;
		}

		res.innerText = i == maxScore ? `you ${msg}` : `computer ${msg}`;

		togglePopup();
	}
};

// fn. to determine computer's selection
const comp = () => {
	let input = game[Math.floor(Math.random() * 3)];

	console.log(`computer selected ${input}`);

	return input;
};

// fn. to display scores
const displayScores = () => {
	p1Score.innerText = i;
	p2Score.innerText = j;
};

// fn. to display winner after each turn
const gameLogic = (x, y) => {
	if (x == y) {
		res.innerText = `It's a Draw!!!`;
		togglePopup();
		return;
	}

	const p1 = 'computer wins!! Try Again!!';
	const p2 = 'You Win!!! yaay!!';

	if (x == 'rock') {
		y == 'paper' ? ((res.innerText = p1), j++) : ((res.innerText = p2), i++);
	} else if (x == 'paper') {
		y == 'scissor' ? ((res.innerText = p1), j++) : ((res.innerText = p2), i++);
	} else {
		y == 'rock' ? ((res.innerText = p1), j++) : ((res.innerText = p2), i++);
	}
	if (i != maxScore && j != maxScore) togglePopup();
};

userInput();

// fn. to reset the game
reset.addEventListener('click', function() {
	if (yes != null && no != null) {
		yes.remove();
		no.remove();
	}

	res.innerText = 'Are you sure you wanna restart??';

	content.append(yes, no);

	togglePopup();

	yes.addEventListener('click', () => {
		(i = 0), (j = 0), (gameOver = false);
		pop.classList.remove('active');
		yes.remove();
		no.remove();
		displayScores();
	});

	no.addEventListener('click', () => {
		yes.remove();
		no.remove();
		pop.classList.remove('active');
	});
});

// fn. to toggle the popup
const togglePopup = () => {
	pop.classList.toggle('active');
};

// for slider input

let init = (value) => {
	document.getElementById('value').innerHTML = value;
	document.documentElement.style.setProperty('--range', value + '%');
};
let updateValue = (value) => {
	document.getElementById('value').innerHTML = Math.floor(value);
};
let updateVar = (value) => {
	document.documentElement.style.setProperty('--deg', value * 3.6 + 'deg');
	document.documentElement.style.setProperty('--range', value + '%');
	if (value >= 100) {
		document.documentElement.style.setProperty('--trackball', second);
	} else {
		document.documentElement.style.setProperty('--trackball', base);
	}
};

init(range.value);
range.addEventListener('input', () => {
	let deg = range.value * 3.6;
	updateVar(range.value);
	updateValue(range.value);
	maxScore = range.value;
	Score.innerText = maxScore;
});
