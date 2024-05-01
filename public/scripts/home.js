document.getElementById("formSignUp").addEventListener("submit", (event) => {
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
		.then((data) => {
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
		})
		.catch((error) => {
			console.error(error.message);
			alert(error.message);
		});
});

document.addEventListener("DOMContentLoaded", function () {
	debugger;
	const token = sessionStorage.getItem("token");
	if (window.location.pathname === "/") {
		if (token) {
			window.location.href = "/home";
			return;
		}
		return;
	}

	if (!token) {
		window.location.href = "/";
		return;
	}
});
