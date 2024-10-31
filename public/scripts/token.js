document.addEventListener("DOMContentLoaded", () => {
	const parts = window.location.href.split("/");
	const token = parts[parts.length - 1];
	if (!token) {
		window.location.href = "/";
		return;
	}
	sessionStorage.setItem("token", token);
	window.location.href = "/home";
});
