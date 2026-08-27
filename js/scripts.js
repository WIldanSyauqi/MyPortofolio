document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".navbar");
	const navbarMenu = document.querySelector("#navbarSupportedContent");
	const navbarToggle = document.querySelector(".navbar-toggler");

	if (!navbar || !navbarMenu) {
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

	navbarToggle?.addEventListener("click", (event) => {
		event.stopPropagation();
	});

	document.addEventListener("click", (event) => {
		if (window.innerWidth >= 992 || !navbarMenu.classList.contains("show")) {
			return;
		}

		const clickedInsideNavbar = navbar.contains(event.target);
		if (!clickedInsideNavbar) {
			bootstrap.Collapse.getOrCreateInstance(navbarMenu).hide();
		}
	});

	document.querySelectorAll(".navbar .nav-link").forEach((navLink) => {
		navLink.addEventListener("click", () => {
			if (window.innerWidth < 992) {
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

	document.querySelectorAll(".bi-download.me-2").forEach((downloadIcon) => {
		downloadIcon.addEventListener("click", () => {
			downloadIcon.classList.remove("download-icon-clicked");
			void downloadIcon.offsetWidth;
			downloadIcon.classList.add("download-icon-clicked");
		});
	});

	document.querySelectorAll(".resume-download").forEach((downloadButton) => {
		downloadButton.addEventListener("click", () => {
			downloadButton.classList.remove("resume-download-clicked");
			void downloadButton.offsetWidth;
			downloadButton.classList.add("resume-download-clicked");
		});
	});
});
