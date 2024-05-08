import basicLoad from "/assets/scripts/basic-load.js";

const token = sessionStorage.getItem("token");
document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname === "/") {
		if (token) {
			window.location.href = "/home";
			return;
		}
		document
			.getElementById("formSignUp")
			.addEventListener("submit", (event) => {
				event.preventDefault();

				const username = document.querySelector("#singUp #username_singUp");
				const name = document.querySelector("#singUp #name_singUp");
				const email = document.querySelector("#singUp #email_singUp");
				const password = document.querySelector("#singUp #password_singUp");

				const formData = {
					username: username.value,
					name: name.value,
					email: email.value,
					password: password.value,
				};

				fetch("auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				})
					.then((response) => {
						if (!response.ok) {
							return response.text().then((text) => {
								throw new Error(text);
							});
						}
						$("#singUp").modal("hide");
						name.value = "";
						email.value = "";
						password.value = "";
						return response.text();
					})
					.then(() => {
						return fetch("auth/login", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(formData),
						});
					})
					.then((response) => {
						if (!response.ok) {
							return response.text().then((text) => {
								throw new Error(text);
							});
						}
						return response.json();
					})
					.then((data) => {
						sessionStorage.setItem("token", data.token);

						console.log(data.token);
						window.location.href = "/home";
					})
					.catch((error) => {
						console.error(error.message);
						alert(error.message);
					});
			});

		document.getElementById("formLogIn").addEventListener("submit", (event) => {
			event.preventDefault();

			const email = document.querySelector("#logIn #email_logIn");
			const password = document.querySelector("#logIn #password_logIn");

			const formData = {
				email: email.value,
				password: password.value,
			};
			fetch("auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((response) => {
					if (!response.ok) {
						return response.text().then((text) => {
							throw new Error(text);
						});
					}
					$("#logIn").modal("hide");
					email.value = "";
					password.value = "";
					return response.json();
				})
				.then((data) => {
					sessionStorage.setItem("token", data.token);
					console.log(data.token);
					window.location.href = "/home";
				})
				.catch((error) => {
					console.error(error.message);
					alert(error.message);
				});
		});
		return;
	}

	basicLoad().then((data) => {
		console.log(data);
	});

	if (window.location.pathname === "/settings") {
		document
			.getElementById("formEditUser")
			.addEventListener("submit", (event) => {
				event.preventDefault();

				const username = document.getElementById("username_editUser");
				const name = document.getElementById("name_editUser");
				const password = document.getElementById("password_editUser");
				const fileInput = document.getElementById("profilePicture");

				const formData = {
					username: username.value,
					name: name.value,
					password: password.value,
				};
				if (password.value === "") {
					delete formData.password;
				}
				if (name.value === "") {
					delete formData.name;
				}
				if (username.value === "") {
					delete formData.username;
				}
				if (
					username.value !== "" ||
					name.value !== "" ||
					password.value !== ""
				) {
					fetch("settings/profile", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							token: token,
						},
						body: JSON.stringify(formData),
					})
						.then((response) => {
							console.log(response);
							if (!response.ok) {
								return response.text().then((text) => {
									throw new Error(text);
								});
							}
							loadDashboard();
							$("#editUserModal").modal("hide");
							username.value = "";
							name.value = "";
							password.value = "";
						})
						.catch((error) => {
							console.error(error.message);
							alert(error.message);
						});
				}

				if (fileInput.files.length > 0) {
					const fileData = new FormData();
					fileData.append("profilePicture", fileInput.files[0]);
					fetch("settings/profile/uploadProfilePicture", {
						method: "PUT",
						headers: {
							token: token,
						},
						body: fileData,
					})
						.then((response) => {
							if (!response.ok) {
								return response.text().then((text) => {
									throw new Error(text);
								});
							}
							console.log(response);
							sessionStorage.removeItem("user");
							window.location.reload();
						})
						.catch((error) => {
							console.error(error.message);
							alert(error.message);
						});
				}
			});
		loadDashboard();
	}
});

function loadDashboard() {
	fetch("settings/profile", { headers: { token: token } })
		.then((response) => {
			if (!response.ok) {
				return response.text().then((text) => {
					throw new Error(text);
				});
			}
			return response.json();
		})
		.then((data) => {
			const { username, name, email, role } = data;
			document.getElementById("username_settings").innerHTML = username;
			document.getElementById("name_settings").innerHTML = name;
			document.getElementById("email_settings").innerHTML = email;
			document.getElementById("role_settings").innerHTML = role;

			const img = document.getElementById("user-profile");
			const user = JSON.parse(sessionStorage.getItem("user"));
			if (user.image) {
				img.src = user.image;
				img.style.display = "block";
				document.getElementById("user-circle-profile").style.display = "none";
			}
		})
		.catch((error) => {
			console.error(error.message);
			alert(error.message);
		});
}
