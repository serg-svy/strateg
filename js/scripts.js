$(function() {
	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		callbacks: {
			open: function() {
				$("html").addClass("popup-opened");
			},
			close: function() {
				$("html").removeClass("popup-opened");
			},
		},
	});


	function winH(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + "px");
	}
	winH();
	window.addEventListener('resize', () => {
		winH();
	});

	$("a, img").attr("draggable", "false");


	$(".sproduct-num__btn_minus").on("click", function(e) {
		e.preventDefault();
		let $input = $(this).parent().find("input");
		let count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
	});

	$(".sproduct-num__btn_plus").on("click", function(e) {
		e.preventDefault();
		let $input = $(this).parent().find("input");
		let count = parseInt($input.val()) + 1;
		count = count > parseInt($input.data("max-count")) ? parseInt($input.data("max-count")) : count;
		$input.val(parseInt(count));
	});

	$(".sproduct-num__input").bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
		if (this.value == "") {
			this.value = 1;
		}
		if (this.value > parseInt($(this).data("max-count"))) {
			this.value = parseInt($(this).data("max-count"));
		}
	});


	if($(".s1__items").length){
		let slider_s1 = tns({
			container: '.s1__items',
			items: 1,
			controls: false,
			mode: "gallery",
			navPosition: "bottom",
		});
	}
	if($(".s3__items").length){
		let slider_s3 = tns({
			container: '.s3__items',
			items: 1,
			nav: false,
			mouseDrag: true,
			responsive: {
				1200: {},
				992: {},
				768: {
					items: 2,
				},
				576: {},
			},
		});
	}

	document.querySelectorAll('.s4__items').forEach(slider => {
		tns({
			container: slider,
			items: 1,
			nav: false,
			mouseDrag: true,
			responsive: {
				1200: {
					items: 4,
				},
				992: {
					items: 3,
				},
				768: {},
				576: {
					items: 2,
				},
			},
		});
	});
	document.querySelectorAll('.s4__items-2').forEach(slider => {
		tns({
			container: slider,
			items: 1,
			nav: false,
			mouseDrag: true,
			responsive: {
				1200: {
					// items: 4,
				},
				992: {
					items: 3,
				},
				768: {},
				576: {
					items: 2,
				},
			},
		});
	});

	let slider_s8;
	if($(".s8__slider").length){
		slider_s8 = tns({
			container: '.s8__slider',
			items: 1,
			nav: false,
			controls: false,
		});
	}


	$(".header__menu-btn").on("click", function(e){
		e.preventDefault();
		$("body").toggleClass("menu-opened");
	});

	$(".header__menu-arrow").on("click", function(e){
		$(this).toggleClass("_active");
	});

	$('[type="tel"]').attr('autocomplete', "new-password");

	$.fn.setCursorPosition = function(pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};

	$.mask.definitions['h'] = "[^78А-Яа-яёЁЇїІіЄєҐґA-Za-z+]";

	var pMask = '+3 (h99) 999 - 99 - 99';
	$('[type="tel"]').click(function(){
		$(this).setCursorPosition(4);
	}).mask(pMask);

	if($('[type="tel"]').lenght) {
		$('[type="tel"]').mask(pMask);
	}





	$(".related").on("click", function(e) {
		$(this).toggleClass("_active");
	});

	$(".s8__tabs-list > *").on("click", function(e) {
		if($(window).width() > 575) {
			$(this).parent().find("li").removeClass("_active");
			$(this).addClass("_active");
			let tabs = $(".s8__tabs");
			tabs.find(".s8__tab").hide().removeClass("_active");
			tabs.find(".s8__tab").eq($(this).index()).fadeIn().addClass("_active");
		}
	});
	$(".s8__tab-heading").on("click", function(e) {
		let tab = $(this).parent();
		if(tab.hasClass("_active")){
			tab.removeClass("_active");
		} else {
			$(".s8__tab").removeClass("_active");
			tab.addClass("_active");
		}
	});


	$(".s8__image").on("click", function(e) {
		slider_s8.goTo($(this).parent().index());
	});
	baguetteBox.run(".s8__slider");



	let range = document.getElementById('filter-range');
	if(range != null){
		let rangeMin = +range.dataset.min;
		let rangeMax = +range.dataset.max;
		noUiSlider.create(range, {
			start: [rangeMin, rangeMax],
			range: {
				'min': rangeMin,
				'max': rangeMax,
			},
			connect: true,
			margin: 30,
		});
		let minPrice = document.getElementById("price-min");
		let maxPrice = document.getElementById("price-max");
		range.noUiSlider.on('update', function (values, handle) {
			minPrice.value = parseInt(values[0]);
			maxPrice.value = parseInt(values[1]);
		});
		minPrice.addEventListener('change', function () {
			range.noUiSlider.set([this.value, maxPrice.value]);
		});
		maxPrice.addEventListener('change', function () {
			range.noUiSlider.set([minPrice.value, this.value]);
		});
	}



	$(".s9__filter-btn").on("click", function(e){
		e.preventDefault();
		let filter = $(".s9__box > *:nth-child(1)");
		if(filter.is(":hidden")){
			filter.slideDown();
		} else {
			filter.slideUp();
		}
	});
	$(".s9__filter-close").on("click", function(e){
		e.preventDefault();
		let filter = $(".s9__box > *:nth-child(1)");
		filter.slideUp();
	});

	$(".message__close").on("click", function(e){
		e.preventDefault();
		$(".message").fadeOut();
	});


});