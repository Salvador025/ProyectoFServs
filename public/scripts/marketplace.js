import basicLoad from "/assets/scripts/basic-load.js";

const boardList = document.getElementById("boardList");

function generateBoard(data) {
	return `
	<a href="marketplace/${data.owner}/${data.name}" class="board-item">
		<img src="${data.direction}" alt="${data.name}" />
		<h2>Classic Board</h2>
		<p>
        ${data.description}
		</p>
	</a>;
    `;
}

document.addEventListener("DOMContentLoaded", () => {
	basicLoad();
	const token = sessionStorage.getItem("token");
	const pageUrlSegments = window.location.href.split("/");
	const lastSegment = pageUrlSegments[pageUrlSegments.length - 1];
	if (lastSegment === "marketplace") {
		fetch("/api/boards")
			.then((response) => response.json())
			.then((data) => {
				boardList.innerHTML = data
					.map((board) => generateBoard(board))
					.join("");
			});
	}
});
