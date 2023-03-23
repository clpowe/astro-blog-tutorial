let navLinks = document.querySelectorAll('[data-navLink]')

navLinks.forEach((link) => {
	console.log(link.getAttribute('href') === window.location.pathname)

	if (link.getAttribute('href') === window.location.pathname) {
		link.setAttribute('aria-current', 'page')
	}
})
