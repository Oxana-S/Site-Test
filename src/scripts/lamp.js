
// Скрипт смены картинки на горящую лампочку по клику на неё
const lamp = document.querySelector('#lamp');

let flag = false;
if (lamp !== null) {
	lamp.addEventListener("click", function () {
		console.log('тест лампочка-клик');
		if (flag) lamp.setAttribute('src', 'img/lamp-on.png');
		else lamp.setAttribute('src', 'img/lamp-off.png');
		flag = !flag;
	})
}

// Скрипт смены картинки на горящую лампочку при наведении на пункты о компании 1, 2, 3 
let step = document.querySelectorAll(".step-on");

if (lamp !== null) {
	for (let i = 0; i < step.length; i++) {
		step[i].addEventListener("mouseover", function () {
			lamp.setAttribute('src', 'img/lamp-on.png');
		})

		step[i].addEventListener("mouseout", function () {
			lamp.setAttribute('src', 'img/lamp-off.png');
		})
	}
}




