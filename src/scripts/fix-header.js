$(function () {
	let header = $('.header');
	let hederHeight = header.height(); // вычисляем высоту шапки

	$(window).scroll(function () {
		// Фиксация шапки при прокрутке
		if ($(this).scrollTop() > 1) {
			header.addClass('header-fixed');
			$('body').css({
				'paddingTop': hederHeight + 'px' // делаем отступ у body, равный высоте шапки
			});
		} else {
			header.removeClass('header-fixed');
			$('body').css({
				'paddingTop': 0 // удаляю отступ у body, равный высоте шапки
			})
		}
		// Изменение высоты, цвета фона шапки при прокрутке
		if ($(this).scrollTop() > 300) {
			header.css({
				'padding': '5px 0',
				'background': '#ebebeb',
				'transition': '.3s'
			});
		} else {
			header.css({
				'padding': '15px 0',
				'background': '#fff',
				'transition': '.3s'
			});
		}
	});

});