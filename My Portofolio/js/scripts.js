document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".navbar");
	const navbarMenu = document.querySelector("#navbarSupportedContent");
	const navbarToggle = document.querySelector(".navbar-toggler");
	const navLinks = [...document.querySelectorAll(".navbar .nav-link")];
	const pageSections = navLinks
		.map((navLink) => document.querySelector(navLink.getAttribute("href")))
		.filter(Boolean);

	if (!navbar || !navbarMenu) {
		return;
	}

	const updateNavbar = () => {
		navbar.classList.toggle("navbar-scrolled", window.scrollY > 10);
	};

	const updateActiveSection = () => {
		const sectionOffset = navbar.offsetHeight + 120;
		let visibleSection = pageSections[0];
		const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

		pageSections.forEach((section) => {
			if (section.getBoundingClientRect().top <= sectionOffset) {
				visibleSection = section;
			}
		});

		if (isAtPageBottom) {
			visibleSection = pageSections[pageSections.length - 1];
		}

		if (!visibleSection) {
			return;
		}

		const sectionHash = `#${visibleSection.id}`;
		if (window.location.hash !== sectionHash) {
			history.replaceState(null, "", sectionHash);
		}

		navLinks.forEach((navLink) => {
			const isActive = navLink.getAttribute("href") === sectionHash;
			navLink.classList.toggle("active", isActive);
			navLink.toggleAttribute("aria-current", isActive);
		});
	};

	updateNavbar();
	updateActiveSection();
	let previousScrollY = window.scrollY;
	let scrollTicking = false;

	const updateNavbarOnScroll = () => {
		updateNavbar();
		updateActiveSection();

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

	window.addEventListener("hashchange", updateActiveSection);

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

	navLinks.forEach((navLink) => {
		navLink.addEventListener("click", () => {
			requestAnimationFrame(updateActiveSection);
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
