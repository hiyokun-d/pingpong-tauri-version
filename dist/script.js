import { Paddles } from "./asset/class.mjs";
import { RectCircleColliding } from "./asset/collision.mjs";
import { drawCircleMove, drawRect } from "./asset/context function.mjs";
import { keys } from "./asset/EventkeyList.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreText = {
	player1: document.getElementById("player1"),
	player2: document.getElementById("player2"),
};

let playClick = document.querySelector(".playClick");
let ballSpeed = document.querySelector(".speed");
let botPlayer = document.querySelector(".botPlayer");
let botToggles = document.querySelector(".bot-button");

let score = {
	player1: 0,
	player2: 0,
};

let playGame = false;
let Goal = false;
let warning = false;

const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const paddles1 = new Paddles({
	x: 10,
	y: size.height / 2 - 140 / 2,
});

const paddles2 = new Paddles({
	x: size.width - 30,
	y: size.height / 2 - 140 / 2,
});

let ball = {
	x: size.width / 2,
	y: size.height / 2,
	r: 10,
	velocity: {
		x: Math.floor(Math.random() * 105 + 100) / 20, //30 is fps
		y: Math.floor(Math.random() * 105 + 100) / 20,
	},
};

addEventListener("resize", () => {
	size.width = window.innerWidth;
	size.height = window.innerHeight;

	paddles2.x = size.width - 30;
	paddles2.y = size.height / 2 - 140 / 2;

	paddles1.y = size.height / 2 - 140 / 2;

	ball.x = size.width / 2;
	ball.y = size.height / 2;
	playGame = false;

	if (size.width <= 1000) {
		if (!warning) {
			warning = true;
			alert(
				"i'm are not recommended this page size under of 1000px it's for good game at all, i'm really recommend you to play at 1500px"
			);
		}
	} else {
		warning = false;
	}
});

let computer = true;
let computerLevel = 0.5;

if (Math.floor(Math.random() * 2) == 0) {
	ball.velocity.x = -ball.velocity.x;
}

if (Math.floor(Math.random() * 2) == 0) {
	ball.velocity.y = -ball.velocity.y;
}

function ResetBall() {
	ball.x = size.width / 2;
	ball.y = size.height / 2;
}

const ballMove = function () {
	return (
		(ball.x += ball.velocity.x), (ball.y += ball.velocity.y), (Goal = false)
	);
};

function game() {
	//!DANGER ZONE
	requestAnimationFrame(game);
	canvas.width = size.width;
	canvas.height = size.height;

	if (computer) {
		botPlayer.innerText = "on";
	} else {
		botPlayer.innerText = "off";
	}

	scoreText.player1.innerText = score.player1;
	scoreText.player2.innerText = score.player2;

	drawRect(0, 0, size.width, size.height, "black");

	//*Ball Physics
	ballSpeed.innerText = ball.velocity.x.toString().replace("-", " ");

	if (playGame && !Goal) {
		playClick.classList.add("start");
		ballMove();
		Goal = false;
	} else if (Goal && playGame) {
		setTimeout(ballMove, 3000);
	}

	if (ball.x - ball.r / 2 < 0 && ball.velocity.x < 0) {
		ResetBall();
		Goal = true;
		score.player2 += 1;
	}

	if (ball.x + ball.r / 2 > size.width && ball.velocity.x > 0) {
		ResetBall();
		Goal = true;
		score.player1 += 1;
	}

	// computer controller
	if (computer)
		paddles2.y += (ball.y - (paddles2.y + paddles2.h / 2)) * computerLevel;

	if (ball.y - ball.r / 2 < 0 && ball.velocity.y < 0) {
		ball.velocity.y = -ball.velocity.y;
	}

	if (ball.y + ball.r / 2 > size.height && ball.velocity.y > 0) {
		ball.velocity.y = -ball.velocity.y;
	}

	//*player 1 paddles collision
	if (RectCircleColliding(ball, paddles1)) {
		ball.velocity.x = -ball.velocity.x;
	}

	//*player 2 paddles collision
	if (RectCircleColliding(ball, paddles2)) {
		ball.velocity.x = -ball.velocity.x;
	}

	if (score.player2 === 1 && playGame) {
		location.reload()
		playGame = false;
		if (!computer) {
			alert("PLAYER 2 WIN THIS GAME");
		} else {
			alert("you lose!")
		}
		score.player1 = 0;
		ResetBall()
	} else if (score.player1 === 1 && playGame) {
		location.reload()
		playGame = false;
			if (!computer) {
				alert("PLAYER 1 WIN THIS GAME");
			} else {
				alert("you win!");
			}
		
		score.player2 = 0
		ResetBall();
	}
	//!--------------------------!

	paddles1.draw(ctx);
	paddles1.moving(size);

	paddles2.draw(ctx);
	paddles2.moving(size);

	drawCircleMove(ball.x - ball.r / 2, ball.y - ball.r / 2, ball.r, "white");
}

canvas.addEventListener("click", () => {
	if (!playGame) {
		playGame = true;
	}
});

addEventListener("keydown", (e) => {
	//*player 1
	if (e.keyCode === keys.w) {
		paddles1.move.up = true;
	} else if (e.keyCode === keys.s) {
		paddles1.move.down = true;
	}

	//*player 2
	if (!computer) {
		if (e.keyCode === keys.arrowUp) {
			paddles2.move.up = true;
		} else if (e.keyCode === keys.arrowDown) {
			paddles2.move.down = true;
		}
	}
});

addEventListener("keyup", (e) => {
	//*player 1
	if (e.keyCode === keys.w) {
		paddles1.move.up = false;
	} else if (e.keyCode === keys.s) {
		paddles1.move.down = false;
	}

	//*player 2
	if (e.keyCode === keys.arrowUp) {
		paddles2.move.up = false;
	} else if (e.keyCode === keys.arrowDown) {
		paddles2.move.down = false;
	}
});

botToggles.addEventListener("click", () => {
	if (computer) {
		computer = false;
	} else {
		computer = true;
	}
});

game();
