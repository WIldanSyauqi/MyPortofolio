document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".navbar");

	if (!navbar) {
		return;
	}

	const updateNavbar = () => {
		navbar.classList.toggle("navbar-scrolled", window.scrollY > 10);
	};

	updateNavbar();
	window.addEventListener("scroll", updateNavbar, { passive: true });

	document.querySelectorAll(".social-links a").forEach((socialLink) => {
		socialLink.addEventListener("click", () => {
			socialLink.classList.remove("social-link-clicked");
			void socialLink.offsetWidth;
			socialLink.classList.add("social-link-clicked");
		});
	});
});
