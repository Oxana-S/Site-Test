let modal,
	btn,
	closeModal,
	bodyScroll;

modal = document.querySelector('#modal');
btn = document.querySelector('#openModal');
closeModal = document.querySelector('.close');
bodyScroll = document.querySelector(".page-body");


btn?.addEventListener("click", function () {
	modal.style.display = 'flex';
	bodyScroll.style.overflow = "hidden";
})


closeModal?.addEventListener("click", function () {
	modal.style.display = 'none';
	bodyScroll.style.overflow = "auto";
})


window.addEventListener("click", function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
		bodyScroll.style.overflow = "auto";
	}
})

