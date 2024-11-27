import basicLoad from "/assets/scripts/basic-load.js";

document.addEventListener("DOMContentLoaded", () => {
	basicLoad();
	const token = sessionStorage.getItem("token");
	const user = JSON.parse(sessionStorage.getItem("user"));

	if (!(user.role === "creator" || user.role === "admin")) {
		$("#creatorModal").modal("show");
		document.getElementById("closeModal").addEventListener("click", () => {
			window.location.href = "/home";
		});
		document.getElementById("noThanks").addEventListener("click", () => {
			window.location.href = "/home";
		});
		document.getElementById("becomeCreator").addEventListener("click", () => {
			fetch("/settings/updateRole", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					token: token,
				},
				body: JSON.stringify({ role: "creator" }),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to become creator");
					}
					return response;
				})
				.then(() => {
					sessionStorage.user = undefined;
					window.location.reload();
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}
	document
		.getElementById("file-upload")
		.addEventListener("change", function () {
			if (this.files && this.files.length > 0) {
				document.querySelector(".drop-area").innerText = this.files[0].name;
			}
		});

	document
		.getElementById("createBoardForm")
		.addEventListener("submit", (event) => {
			event.preventDefault();

			const formData = new FormData();

			formData.append("name", document.getElementById("boardName").value);
			formData.append(
				"description",
				document.getElementById("description").value,
			);
			formData.append("Board", document.getElementById("file-upload").files[0]);

			const options = {
				method: "POST",
				headers: {
					token: token,
				},
				body: formData,
			};

			fetch("/boards", options)
				.then((response) => {
					if (!response.ok) {
						return response.text().then((text) => {
							throw new Error(text);
						});
					}
					return response.json();
				})
				.then((data) => {
					alert("Board created successfully");
					window.location.href = `/marketplace/${data.owner}/${data.name}`;
				})
				.catch((error) => {
					console.error(error.message);
					alert(error.message);
				});
		});
});
