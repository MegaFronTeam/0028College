"use strict";

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			} // beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },

		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},

	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},

	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},

	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu a"); // (1)

			if (!container || link) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	// /mobileMenu
	// tabs  .
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
		});
	},

	// /tabs
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	// /inputMask
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},

	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");

			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick);
			} else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({
					scrollTop: destination - 80
				}, 0);
				return false;
			}
		});
	},

	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.getCurrentYear('.year');
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', () => {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	const swiper4 = new Swiper('.sMost__slider--js', {
		slidesPerView: 'auto',
		// slideToClickedSlide: true, 
		observer: true
	}); // modal window

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		}
	}; //luckyoneJs

	let sClosestPrev = document.querySelector('.sClosest--js .swiper-prev');
	let sClosestNext = document.querySelector('.sClosest--js .swiper-next');
	let sClosestSlider = new Swiper('.sClosest-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 35,
		navigation: {
			nextEl: sClosestNext,
			prevEl: sClosestPrev
		}
	}); //.sProfs-slider-js

	let sProfsPrev = document.querySelector('.sProfs--js .swiper-prev');
	let sProfsNext = document.querySelector('.sProfs--js .swiper-next');
	let sProfsSlider = new Swiper('.sProfs-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 35,
		navigation: {
			nextEl: sProfsNext,
			prevEl: sProfsPrev
		}
	}); //.sGalery-slider-js

	let sGaleryPrev = document.querySelector('.sGalery--js .swiper-prev');
	let sGaleryNext = document.querySelector('.sGalery--js .swiper-next');
	let sGalerySlider = new Swiper('.sGalery-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 35,
		navigation: {
			nextEl: sGaleryNext,
			prevEl: sGaleryPrev
		}
	}); //.sUnivers-slider-js

	let sUniversSlider = new Swiper('.sUnivers-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		breakpoints: {
			0: {
				spaceBetween: 40
			},
			768: {
				spaceBetween: 70
			},
			1200: {
				spaceBetween: 114
			}
		}
	}); //

	function makeDDGroup(ArrSelectors) {
		for (let parentSelect of ArrSelectors) {
			let parent = document.querySelector(parentSelect);

			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js');
				$(ChildHeads).click(function () {
					let clickedHead = this;
					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						} else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});
				});
			}
		}
	}

	makeDDGroup(['.sFaq-dd-group-js']); //

	$('.menu-mobile--js .menu-item-has-children').click(function () {
		$(this).find('ul').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	let sWeekSlider = new Swiper('.sWeek-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 40,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	}); //

	$('.sBaner-menu-btn-js').click(function () {
		$('.sBaner-menu-content-js li:hidden').slideDown();
		$(this).fadeOut();
	}); //

	let sEventsSlider = new Swiper('.sEvents-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 40,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev'
		}
	}); //

	let topNav = document.querySelector(".top-nav");

	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--top-nav-h', "".concat(topNav.offsetHeight, "px"));
	}

	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight(); //endluckyoneJs
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }