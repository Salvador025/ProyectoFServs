export default () => {
	return new Promise((resolve, reject) => {
		debugger;
		const token = sessionStorage.getItem("token");
		const user = sessionStorage.getItem("user");
		if (!token) {
			window.location.href = "/";
			resolve("not logged in");
			return;
		}
		if (!user) {
			fetch("auth/me", { headers: { token: token } })
				.then((response) => {
					if (!response.ok) {
						return response.text().then((text) => {
							throw new Error(text);
						});
					}
					return response.json();
				})
				.then((data) => {
					debugger;
					console.log(data);
					sessionStorage.setItem("user", JSON.stringify(data));
					resolve(data);
				})
				.catch((error) => {
					console.error(error.message);
					alert(error.message);
					reject();
				});
		}
	});
};
