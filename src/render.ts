import game from "./game";

const board_selector = <HTMLDivElement>document.querySelector("#board");

function renderBoard() {
	const board_html = game.GAME_BOARD.map((row_item, row_index) => {
		const col_items = row_item.map((col_item, col_index) => {
			return `<button id="1" data-col=${col_index} data-row=${row_index}>${col_item}</button>`;
		});

		return col_items;
	});

	board_selector.innerHTML = board_html.flat().join("");

	console.log("render");
}
renderBoard();

function addEventListenerButton() {
	const buttons_selector = <NodeListOf<HTMLButtonElement>>(
		board_selector.querySelectorAll("button")
	);
	buttons_selector.forEach((item) => {
		item.addEventListener("click", (e: Event) => {
			const target_item = <HTMLButtonElement>e.target;
			const row_index = +(<string>target_item.getAttribute("data-row"));
			const col_index = +(<string>target_item.getAttribute("data-col"));

			game.updateGameBoard(row_index, col_index);

			renderBoard();

			const winner = game.getWinner();
			if (winner !== undefined) {
				alert("game over");
			}

			game.updateCurrentPlayer();

			console.log("row: ", row_index, "col: ", col_index);

			addEventListenerButton();
		});
	});
}

addEventListenerButton();
