import basicLoad from "/assets/scripts/basic-load.js";

const boardList = document.getElementById("boardList");
basicLoad();

function generateBoard(data) {
	return `
	<a href="marketplace/${data.name}" class="board-item">
		<img src="${data.direction}" alt="${data.name}" />
		<h2>Classic Board</h2>
		<p>
        ${data.description}
		</p>
	</a>;
    `;
}
