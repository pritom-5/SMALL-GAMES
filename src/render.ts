import game from "./game";

class Render {
	constructor(public board_selector: HTMLDivElement) {
		this.renderBoard = this.renderBoard.bind(this);
		this.addEventListenerButton = this.addEventListenerButton.bind(this);
	}

	renderCurrentTurn() {
		const current_turn_selector = <HTMLSpanElement>(
			document.querySelector("#current_turn_span")
		);
		const current_turn_emoji = game.CURRENT_PLAYER === 1 ? "✅" : "❌";
		current_turn_selector.innerHTML = current_turn_emoji;
	}

	renderScore() {
		const { "0": draw, "1": tick, "2": cross } = game.SCORE;

		const tick_span_selector = <HTMLSpanElement>(
			document.querySelector("#tick-container span")
		);
		const cross_span_selector = <HTMLSpanElement>(
			document.querySelector("#cross-container span")
		);
		const draw_span_selector = <HTMLSpanElement>(
			document.querySelector("#draw-container span")
		);

		tick_span_selector.textContent = String(tick);
		cross_span_selector.textContent = String(cross);
		draw_span_selector.textContent = String(draw);
	}

	renderBoard() {
		const board_html = game.GAME_BOARD.map((row_item, row_index) => {
			const col_items = row_item.map((col_item, col_index) => {
				const button_inner_text =
					col_item === 1 ? "✅" : col_item === 2 ? "❌" : "";
				return `<button id="1" class="ji" data-col=${col_index} ${
					col_item !== 0 ? "disabled" : ""
				} data-row=${row_index}>${button_inner_text}</button>`;
			});

			return col_items;
		});

		this.board_selector.innerHTML = board_html.flat().join("");
	}

	addEventListenerButton() {
		const buttons_selector = <NodeListOf<HTMLButtonElement>>(
			this.board_selector.querySelectorAll("button")
		);
		buttons_selector.forEach((item) => {
			item.addEventListener("click", (e: Event) => {
				const target_item = <HTMLButtonElement>e.target;
				const row_index = +(<string>(
					target_item.getAttribute("data-row")
				));
				const col_index = +(<string>(
					target_item.getAttribute("data-col")
				));

				game.updateGameBoard(row_index, col_index);

				this.winnerScreenRender();
				this.renderBoard();
				this.renderScore();

				game.updateCurrentPlayer();

				this.renderCurrentTurn();

				this.addEventListenerButton();
			});
		});
	}

	renderDialogModal(title: string) {
		const dialog_selector = document.createElement("dialog");
		dialog_selector.innerHTML = `
			<h1>${title}</h1>
			<button id="start-game">Start Next Game</button>
		`;
		document.body.appendChild(dialog_selector);

		dialog_selector.showModal();

		dialog_selector
			.querySelector("#start-game")
			?.addEventListener("click", () => {
				game.resetGame();
				this.renderBoard();
				this.renderScore();
				this.addEventListenerButton();
				this.renderCurrentTurn();
				dialog_selector.close();
			});
	}

	winnerScreenRender() {
		const winner = game.getWinner();

		if (winner === undefined) {
			return;
		}

		let title: string;

		if (winner === 0) {
			title = "🤝 Game is Drawn";
		} else if (winner === 1) {
			title = "✅ has won the game";
		} else if (winner === 2) {
			title = "❌ has won the game";
		} else {
			title = "game is still on";
		}
		this.renderDialogModal(title);
	}
}

const board_selector = <HTMLDivElement>document.querySelector("#board");
const render = new Render(board_selector);
render.renderBoard();
render.renderCurrentTurn();
render.renderScore();
render.addEventListenerButton();
