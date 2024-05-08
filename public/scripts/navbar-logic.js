export default () => {
	const navbar = document.getElementById("navbar");

	if (!navbar) return;
	const img = document.getElementById("nav-user-profile");
	const logout = document.getElementById("nav-logout");
	logout.addEventListener("click", () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		window.location.href = "/";
	});

	const user = JSON.parse(sessionStorage.getItem("user"));
	if (user.image) {
		img.src = user.image;
		img.style.display = "block";
		document.getElementById("user-circle").style.display = "none";
	}
};
