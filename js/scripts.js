document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".navbar");

	if (!navbar) {
		return;
	}

	const updateNavbar = () => {
		navbar.classList.toggle("navbar-scrolled", window.scrollY > 10);
	};

	updateNavbar();
	let previousScrollY = window.scrollY;
	let scrollTicking = false;

	const updateNavbarOnScroll = () => {
		updateNavbar();

		if (window.innerWidth < 992) {
			navbar.classList.remove("navbar-hidden");
			if (navbarMenu?.classList.contains("show")) {
				const collapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
				if (window.scrollY > navbar.offsetHeight + 20) {
					collapse.hide();
				}
			}
			previousScrollY = window.scrollY;
			scrollTicking = false;
			return;
		}

		const currentScrollY = window.scrollY;
		const isScrollingDown = currentScrollY > previousScrollY;

		if (isScrollingDown && currentScrollY > navbar.offsetHeight) {
			navbar.classList.add("navbar-hidden");
		} else if (!isScrollingDown) {
			navbar.classList.remove("navbar-hidden");
		}

		previousScrollY = currentScrollY;
		scrollTicking = false;
	};

	window.addEventListener("scroll", () => {
		if (!scrollTicking) {
			window.requestAnimationFrame(updateNavbarOnScroll);
			scrollTicking = true;
		}
	}, { passive: true });

	const navbarMenu = document.querySelector("#navbarSupportedContent");
	document.querySelectorAll(".navbar .nav-link").forEach((navLink) => {
		navLink.addEventListener("click", () => {
			if (window.innerWidth < 992 && navbarMenu) {
				bootstrap.Collapse.getOrCreateInstance(navbarMenu).hide();
			}
		});
	});

	document.querySelectorAll(".social-links a").forEach((socialLink) => {
		socialLink.addEventListener("click", () => {
			socialLink.classList.remove("social-link-clicked");
			void socialLink.offsetWidth;
			socialLink.classList.add("social-link-clicked");
		});
	});
});
