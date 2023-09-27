interface iGame {
	switchPlayer: () => void;
}

type tGameBoard = (1 | 2 | 0)[][];
type tCurrentPlayer = 1 | 2;

class Game {
	GAME_BOARD: tGameBoard;
	CURRENT_PLAYER: tCurrentPlayer = 1;

	constructor() {
		this.GAME_BOARD = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		this.CURRENT_PLAYER = 1;
	}

	// update the player last after checking gamelogic, updading board
	updateCurrentPlayer() {
		this.CURRENT_PLAYER = this.CURRENT_PLAYER === 1 ? 2 : 1;
	}

	updateGameBoard(board_row: number, board_col: number) {
		if (this.GAME_BOARD[board_row][board_col] !== 0) {
			return;
		}

		this.GAME_BOARD[board_row][board_col] = this.CURRENT_PLAYER;
	}

	// @todo: cross logicisWinner and up and down logic
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
				this.GAME_BOARD[1][1] === this.GAME_BOARD[2][1]) ||
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
			return this.CURRENT_PLAYER;
		} else if (this.isGameOver() && !this.isWinner()) {
			return 0;
		}

		return undefined;
	}
}

const game = new Game();
export default game;
