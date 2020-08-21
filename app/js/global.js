$(function() {

	$('.header-open-menu').on('click', function() {
		$('.header-right').addClass('opened');
	});

	$('.header-close-menu').on('click', function() {
		$('.header-right').removeClass('opened');
	});

	$('.main-window-left-content').each(function(i) {
		let ths = $(this),
				sliderContent = ths.find('.main-window-slider-content');
		if ( i === 0 ) {
			ths.show().addClass('active');
		}
		$('.main-slider').append([
			`<div class="main-slider-item ${i === 0 ? 'active' : ''}">`,
			sliderContent.html(),
			'</div>',
		].join(''));
		sliderContent.remove();
		$('.main-window-pagination').find('')
	});

	$('.main-window-pagination').find('span:first-child > span').text('01');
	$('.main-window-pagination').find('span:last-child > span').text(`0${$('.main-window-left-content').length}`);

	let mainSlideIndex = 1,
			mainSlidesQnt = $('.main-slider-item').length;

	$('.main-slider-prev').on('click', function() {
		mainSlideIndex = mainSlideIndex > 1 ? mainSlideIndex - 1 : mainSlidesQnt;
		mainSlideNext(mainSlideIndex - 1);
	});

	$('.main-slider-next').on('click', function() {
		mainSlideIndex = mainSlideIndex == mainSlidesQnt ? 1 : mainSlideIndex + 1;
		mainSlideNext(mainSlideIndex - 1);
	});

	function mainSlideNext(index) {
		$('.main-slider-item').removeClass('active');
		$('.main-slider-item').eq(index).addClass('active');
		$('.main-window-left-content').hide().removeClass('active');
		$('.main-window-left-content').eq(index).show();
		$('.main-window-pagination').find('span:first-child > span').text(`0${index + 1}`);
		setTimeout(() => {
			$('.main-window-left-content').eq(index).addClass('active');
		}, 50)
	}

	let mainSlider = $('.main-slider');

	function initMainSlider() {
		if ( $(window).width() < 576 ) {
			mainSlider.addClass('owl-carousel');
			mainSlider.owlCarousel({
				items: 1,
				dots: false,
				nav: true,
				margin: 27,
				autoWidth: true,
				mouseDrag: false,
				touchDrag: false
			})
			mainSlider.on('changed.owl.carousel', function(e) {
				let currentIndex = e.item.index;
				mainSlideNext(currentIndex);
			});
		}
		else {
			mainSlider.removeClass('owl-carousel');
			mainSlider.trigger('destroy.owl.carousel')
		}
	};

	if ( !$('body').hasClass('is-admin') ) {

		initMainSlider();

		$('.course-slider').owlCarousel({
			items: 1,
			dots: false,
			nav: true,
			mouseDrag: false,
			margin: 0
		});

	}
	else {
		$('.course-slider').removeClass('owl-carousel')
	}

	$('.skill-tabs-body-item').each(function(i) {
		let ths = $(this),
				img = ths.find('.skill-tabs-img'),
				imgSrc = ths.find('.skill-tabs-img').find('img').attr('src');
		img.remove();
		$('.skill-tabs-img-list').append(`<div class="skill-tabs-img" style="background-image: url(${imgSrc});"></div>`);
	});

	$('.skill-tabs-link').eq(0).addClass('active');
	$('.skill-tabs-img').eq(0).show();
	$('.skill-tabs-body-item').eq(0).show().addClass('active');

	$('.skill-tabs-border').css('width', $('.skill-tabs-link').outerWidth());

	$('.skill-tabs-link').on('click', function(e) {
		e.preventDefault();

		let ths = $(this),
				index = ths.index() - 1;

		if ( $('.skill-tabs-body-item').eq(index).is(':hidden') ) {

			$('.skill-tabs-link').removeClass('active');

			ths.addClass('active');

			let pos = ths.position().left;
			$('.skill-tabs-border').css({
				'-webkit-transform': `translateX(${pos}px)`,
				'-moz-transform': `translateX(${pos}px)`,
				'-o-transform': `translateX(${pos}px)`,
				'transform': `translateX(${pos}px)`,
				'width': `${ths.outerWidth()}px`
			});

			$('.skill-tabs-img').hide();
			$(`.skill-tabs-img`).eq(index).fadeIn(400);

			$('.skill-tabs-body-item').removeClass('active').hide();
			$('.skill-tabs-body-item').eq(index).show();
			setTimeout(() => {
				$('.skill-tabs-body-item').eq(index).addClass('active')
			}, 50);

		}

	});

	$('.accordion-item').eq(0).find('.accordion-title').addClass('active');
	$('.accordion-item').eq(0).find('.accordion-body').show();

	$('.accordion-item').each(function() {
		let ths = $(this),
				title = ths.find('.accordion-title'),
				body = ths.find('.accordion-body');
		title.on('click', function() {
			body.slideToggle(400);
			title.toggleClass('active');
		});
	});

	function animation(top) {

		$('.numbers-item').eq(0).css({
			'-webkit-transition-delay': '0s',
			'-moz-transition-delay': '0s',
			'-o-transition-delay': '0s',
			'transition-delay': '0s',
		});
		$('.numbers-item').eq(1).css({
			'-webkit-transition-delay': '.25s',
			'-moz-transition-delay': '.25s',
			'-o-transition-delay': '.25s',
			'transition-delay': '.25s',
		});
		$('.numbers-item').eq(2).css({
			'-webkit-transition-delay': '.5s',
			'-moz-transition-delay': '.5s',
			'-o-transition-delay': '.5s',
			'transition-delay': '.5s',
		});
		$('.numbers-item').eq(3).css({
			'-webkit-transition-delay': '.75s',
			'-moz-transition-delay': '.75s',
			'-o-transition-delay': '.75s',
			'transition-delay': '.75s',
		});

		$('.animate').each(function() {
			let ths = $(this),
					thsTop = ths.offset().top;
			if ( top >= thsTop - $(window).height() * 0.9 ) {
				ths.addClass('animate-fade-in')
			}
		});

	}animation($(window).scrollTop());

	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.header').length ) {
			$('.header-right').removeClass('opened')
		}
	});

	$(window).on('scroll', function() {
		let top = $(window).scrollTop();
		animation(top);
	});

	$(window).on('resize', function() {
		if ( !$('body').hasClass('is-admin') ) {
			initMainSlider()
		}
	});

	$(window).on('load', function() {
		$('body').css('opacity', '');
		setTimeout(() => {
			$('body').removeClass('load-animation')
		}, 300)
	});

});
