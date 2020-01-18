$(function () {

	/*Fixed nav*/
	var header = $("#js-header"),
		header__logo = $("#js-header-logo"),
		headerH = $(".header").height(),
		scrollOffset = $(window).scrollTop();

	checkScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		checkScroll(scrollOffset);
	});

	function checkScroll(scrollOffset) {
		if (scrollOffset >= headerH) {
			header.addClass("fixed");
			header__logo.removeClass("header__logo");

		} else {
			header.removeClass("fixed");
			header__logo.addClass("header__logo");
		}
	}

	/*Menu nav toggle*/
	$("#nav_toggle").on("click", function (event) {
		event.preventDefault();
		$(this).toggleClass("active");
		$("#nav").toggleClass("active");
	});

	/*Smooth scroll*/
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data("scroll"),
			blockOffset = $(blockId).offset().top;

		$("#js-nav a").removeClass("active");
		$this.addClass("active");


		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);
	});

	/*Slider*/

	/*Intro*/
	$('[data-slider-intro]').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		dots: true,
		arrows: true,
		customPaging: function (slider, i) {
			return '<a class="slider-a"><span class="slider-span">0</span>' + (i + 1) + '</a>';
		}
	});

	/*Backpack*/
	$("[data-slider-backpack]").slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,

		responsive: [
			{
				breakpoint: 1201,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 771,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1
				}
			},
		]
	});

	$("[data-slider-nav]").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: "[data-slider-backpack]",
		lazyLoad: "progressive",
		centerMode: true,
	});

	/*Card*/
	$("[data-slider-card]").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	});

	$("[data-card-nav]").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: "[data-slider-card]",
		lazyLoad: 'progressive',
		centerMode: true,
	});

	/*Tabs*/
	$("[data-tab]").on("click", function (event) {
		event.preventDefault();

		var parentTab = $(this).parents(".tabs");
		var tabId = $(this).data("tab");
		parentTab.find(".tabs__content-item").removeClass("active");
		$(tabId).addClass("active");

		parentTab.find(".tabs__links-item").removeClass("selected");
		$(this).addClass("selected");
	});

	/*Click counter*/
	$(".plus").click(function () {
		var currentCard = $(this).parents(".card");
		var currentQty = currentCard.find(".counter");
		currentQty.html(+currentQty.html() + 1);
	});

	$(".minus").click(function () {
		var currentCard = $(this).parents(".card");
		var currentQty = currentCard.find(".counter");
		if (currentQty.html() != 1) {
			currentQty.html(+currentQty.html() - 1);
		} else {
			$(this).attr("disabled");
		}
	});

	/*Modals*/
	$(".js-show-modal").on("click", function (e) {
		e.preventDefault();
		var currentModal = $(this).data("modal");
		$(currentModal).fadeIn(500);
		$("body").append("<div class='overlay' id='js-overlay'></div>").addClass("open-modal");

		$('[data-card-nav]').slick("setPosition");
		$('[data-slider-card]').slick("setPosition");

		$("body").addClass("no-scroll");
	});

	$(".js-modal-close").on("click", function (e) {
		e.preventDefault();
		$(".js-modal").fadeOut(100);
		$("body").removeClass("open-modal");
		$("#js-overlay").remove();

		$("body").removeClass("no-scroll");
	});

	$("body").on("click", "#js-overlay", function () {
		$(".js-modal").fadeOut(100);
		$("body").removeClass("open-modal");
		$("#js-overlay").remove();

		$("body").removeClass("no-scroll");
	});
})