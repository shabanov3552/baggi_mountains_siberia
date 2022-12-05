// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";


//#region Глобальный клик

document.addEventListener("click", function (e) {
	if (e.target.closest('textarea')) {
		txtarAutoHeight(e.target)
	}
	if (e.target.closest('.form__input-clear')) {
		let input = e.target.parentElement.parentElement.querySelector('.form__input');
		input.value = '';
		input.classList.remove('_form-focus');
		input.parentElement.classList.remove('_form-focus');
		e.target.closest('.form__input-clear').classList.remove('_active');
	}
});

//#endregion

//#region Функции работы с видео слайдерами

const videoBlock = document.querySelector('.main-slider, .slider-video__content, .about');
if (videoBlock) {
	videoBlock.addEventListener("mouseover", function (e) {
		let intervalId;
		if (e.target.closest('video')) {
			let video = e.target;
			clearInterval(intervalId);
			video.play();
		}
	});
	videoBlock.addEventListener('mouseout', function (e) {
		let intervalId;
		if (e.target.closest('video')) {
			let video = e.target;
			clearInterval(intervalId);
			video.pause()
			intervalId = setInterval(() => {
				video.currentTime += -.1;
				if (video.currentTime <= 0) {
					clearInterval(intervalId);
					video.load();
				}
			}, 30);
		}
	});
}

const fancyVideos = Array.from(document.querySelectorAll('.slider-video__fancybox video'));
if (fancyVideos.length > 0) {
	fancyVideos.forEach(element => {
		element.parentElement.classList.add('video')
	});
}

document.addEventListener("afterPopupOpen", function (e) {
	if (e.detail.popup.targetOpen.element.querySelector('video')) {
		e.detail.popup.targetOpen.element.querySelector('video').play();
	}
});
document.addEventListener("afterPopupClose", function (e) {
	if (e.detail.popup.targetOpen.element.querySelector('video')) {
		e.detail.popup.targetOpen.element.querySelector('video').load();
	}
});
//#endregion

//#region автовысота для textarea

function txtarAutoHeight(target) {
	const el = target;
	if (el.closest('textarea')) {
		el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
		el.classList.add('auto');
		el.addEventListener('input', e => {
			el.style.height = 'auto';
			el.style.height = (el.scrollHeight) + 10 + 'px';
		});
	}
}

//#endregion

//#region добавление класса анимации для кнопки в форме

const forms = Array.from(document.querySelectorAll('#form'));
if (forms.length > 0) {
	forms.forEach(el => {
		$(el).parsley().on('field:validated', function () {
			var ok = $('.parsley-error').length === 0;
			if (!ok) {
				$('.form__button').addClass('btn-err');
			} else { $('.form__button').removeClass('btn-err'); }
		})
	});
}
let btns = document.querySelectorAll('.form__button');
btns.forEach(e => {
	e.addEventListener('animationend', function () {
		e.classList.remove('btn-err');
	})
});

//#endregion

//#region  показать\спрятать реквизиты

const btn_more = document.querySelectorAll('.page-contacts__show-more');

if (btn_more.length > 0) {
	btn_more.forEach(element => {
		element.addEventListener("click", function (e) {
			e.preventDefault();
			e.target.classList.toggle('_active');
			e.target.previousElementSibling.classList.toggle('_active');
			if (!e.target.classList.contains('_active')) {
				element.innerHTML = 'Показать реквизиты';
			} else {
				element.innerHTML = 'Скрыть';
			}
		});
	});
}

//#endregion

//#region добавление класса анимации к первому экрану на главной

const fullScreenBlock = document.querySelector('.fullscreen-block');
if (fullScreenBlock) {
	document.querySelector('.header').classList.add('full-animation');
}

//#endregion

//#region hover картинок туров в списке туров

if (document.querySelector('.tours')) {
	copyTourImages();

	const toursCards = document.querySelectorAll('.tours__content');
	toursCards.forEach(card => {
		card.addEventListener("mouseenter", animationTourCard);
	});
}

function copyTourImages() {
	const toursImages = document.querySelectorAll('.tours__image');

	toursImages.forEach(item => {
		var imageCopy = item.querySelector('img').cloneNode();
		imageCopy.setAttribute('class', 'img-copy');
		item.append(imageCopy);
	});
}

function animationTourCard(e) {
	const target = e.target;
	const targetImg = target.parentElement.querySelector('.tours__image');
	if (!targetImg.classList.contains('hover-anim')) {

		targetImg.classList.add('hover-anim');
		setTimeout(() => {
			targetImg.classList.remove('hover-anim');
		}, 550);
	}
}

//#endregion