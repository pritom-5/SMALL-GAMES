interface iGame {
	switchPlayer: () => void;
}

type tGameBoard = (1 | 2 | 0)[][];
type tCurrentPlayer = 1 | 2;
type tScore = { 1: number; 2: number; 0: number };

class Game {
	GAME_BOARD: tGameBoard;
	CURRENT_PLAYER: tCurrentPlayer = 1;
	SCORE: tScore;

	constructor() {
		this.GAME_BOARD = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		this.CURRENT_PLAYER = 1;
		this.SCORE = { 1: 0, 2: 0, 0: 0 };
	}

	updateCurrentPlayer() {
		this.CURRENT_PLAYER = this.CURRENT_PLAYER === 1 ? 2 : 1;
	}

	updateGameBoard(board_row: number, board_col: number) {
		if (this.GAME_BOARD[board_row][board_col] !== 0) {
			return;
		}

		this.GAME_BOARD[board_row][board_col] = this.CURRENT_PLAYER;
	}

	isWinner() {
		if (
			(this.GAME_BOARD[0][0] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[0][0] === this.GAME_BOARD[0][1] &&
				this.GAME_BOARD[0][1] === this.GAME_BOARD[0][2]) ||
			(this.GAME_BOARD[1][0] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[1][0] === this.GAME_BOARD[1][1] &&
				this.GAME_BOARD[1][1] === this.GAME_BOARD[1][2]) ||
			(this.GAME_BOARD[2][0] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[2][0] === this.GAME_BOARD[2][1] &&
				this.GAME_BOARD[2][1] === this.GAME_BOARD[2][2]) ||
			(this.GAME_BOARD[0][0] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[0][0] === this.GAME_BOARD[1][0] &&
				this.GAME_BOARD[1][0] === this.GAME_BOARD[2][0]) ||
			(this.GAME_BOARD[0][1] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[0][1] === this.GAME_BOARD[1][1] &&
				this.GAME_BOARD[1][1] === this.GAME_BOARD[2][1]) ||
			(this.GAME_BOARD[0][2] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[0][2] === this.GAME_BOARD[1][2] &&
				this.GAME_BOARD[1][2] === this.GAME_BOARD[2][2]) ||
			(this.GAME_BOARD[0][0] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[0][0] === this.GAME_BOARD[1][1] &&
				this.GAME_BOARD[1][1] === this.GAME_BOARD[2][2]) ||
			(this.GAME_BOARD[0][2] === this.CURRENT_PLAYER &&
				this.GAME_BOARD[0][2] === this.GAME_BOARD[1][1] &&
				this.GAME_BOARD[1][1] === this.GAME_BOARD[2][0])
		) {
			return true;
		} else {
			return false;
		}
	}

	private isGameOver() {
		const is_board_full = this.GAME_BOARD.flat().includes(0) ? false : true;

		if (this.isWinner()) {
			return true;
		} else if (is_board_full) {
			return true;
		} else {
			return false;
		}
	}

	getWinner() {
		if (this.isWinner()) {
			this.SCORE[this.CURRENT_PLAYER] = ++this.SCORE[this.CURRENT_PLAYER];
			return this.CURRENT_PLAYER;
		} else if (this.isGameOver() && !this.isWinner()) {
			this.SCORE[0] = ++this.SCORE[0];
			return 0;
		}

		return undefined;
	}

	resetGame() {
		this.GAME_BOARD = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];

		this.CURRENT_PLAYER = 1;
	}
}

const game = new Game();
export default game;
