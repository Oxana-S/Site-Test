console.log("бургер скрипт");
let menuBtn = document.querySelector('.burger__btn');
let menu = document.querySelector('.header__menu');

menuBtn?.addEventListener('click', function () {
	console.log("бургер клик");
	menuBtn?.classList.toggle('active');
	menu?.classList.toggle('active');
})