import basicLoad from "/assets/scripts/basic-load.js";

document.addEventListener("DOMContentLoaded", () => {
	basicLoad();
	const token = sessionStorage.getItem("token");
	const pageUrlSegments = window.location.href.split("/");
	const boar_name = document.getElementById("board_name");
	const board_image = document.getElementById("board_image");
	const board_details = document.getElementById("board_details");
	const owner = document.getElementById("owner");

	fetch(
		`/boards/${pageUrlSegments[pageUrlSegments.length - 2]}/${pageUrlSegments[pageUrlSegments.length - 1]}`,
		{
			headers: { token: token },
		},
	)
		.then((response) => response.json())
		.then((data) => {
			boar_name.innerText = data.name;
			board_image.src = data.direction;
			board_image.alt = data.name;
			board_details.innerText = data.description;
			owner.innerText = data.owner;
		});
});
