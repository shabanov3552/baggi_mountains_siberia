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
		let target = e.target;
		if (target.closest('video')) target.play();
	});
	videoBlock.addEventListener('mouseout', function (e) {
		let target = e.target;
		if (target.closest('video')) {
			target.pause();
			target.currentTime = 0;
		}
	});
}

const fancyVideos = Array.from(document.querySelectorAll('.slider-video__fancybox video'));
if (fancyVideos.length > 0) {
	fancyVideos.forEach(element => {
		element.parentElement.classList.add('video');
	});
}

document.addEventListener("afterPopupOpen", function (e) {
	if (e.detail.popup.targetOpen.element.querySelector('video')) {
		e.detail.popup.targetOpen.element.querySelector('video').play();
	}
});
// document.addEventListener("afterPopupClose", function (e) {
// 	if (e.detail.popup.targetOpen.element.querySelector('video')) {
// 		// e.detail.popup.targetOpen.element.querySelector('video').pause();
// 	}
// });
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

// if (document.querySelector('.tours')) {
// 	copyTourImages();

// 	const toursCards = document.querySelectorAll('.tours__content');
// 	toursCards.forEach(card => {
// 		card.addEventListener("mouseenter", animationTourCard);
// 	});
// }

// function copyTourImages() {
// 	const toursImages = document.querySelectorAll('.tours__image');

// 	toursImages.forEach(item => {
// 		var imageCopy = item.querySelector('img').cloneNode();
// 		imageCopy.setAttribute('class', 'img-copy');
// 		item.append(imageCopy);
// 	});
// }

// function animationTourCard(e) {
// 	const target = e.target;
// 	const targetImg = target.parentElement.querySelector('.tours__image');
// 	if (!targetImg.classList.contains('hover-anim')) {

// 		targetImg.classList.add('hover-anim');
// 		setTimeout(() => {
// 			targetImg.classList.remove('hover-anim');
// 		}, 550);
// 	}
// }

//#endregion

//#region Калькулятор стоимости участия

// function getCost(selector) {
// 	return document.querySelector(selector).innerText.split('').filter(item => {
// 		if (!isNaN(parseInt(item))) {
// 			return item;
// 		}
// 	}).join('');
// }

// function calcCostParticipation(cost, adults = 1, children = 0) {
// 	return adults * cost + children * (cost * 0.3);
// }

// function setTotalTourPrice(e) {
// 	let formatPrice = new Intl.NumberFormat('ru-RU').format(tourCalculator.calcCostParticipation());
// 	document.querySelector('.js-total-tour-price').innerHTML = `${formatPrice} ₽`;
// }

function calcCostRentBaggi(carPrice, days) {
	return carPrice * days;
}


let tourCalculator = {
	tourPrice: 0,
	adults: 1,
	children: 0,
	runDays: 0,
	totalTourPrice: 0,
	totalRentPrice: 0,
	totalPrice: 0,
	tourists: 1,
	errorMsg: document.querySelector('.total-cost__error-msg'),


	// Берет стоимость тура из элемента и форматирует в число
	getNum: function (selector) {
		return +document.querySelector(selector).innerText.split('').filter(item => {
			if (!isNaN(parseInt(item))) {
				return item;
			}
		}).join('');
	},

	// Считает цену стоимости участия
	calcCostParticipation: function () {
		return this.adults * this.tourPrice + this.children * (this.tourPrice * 0.3);
	},

	// Устанавливает цену стоимости участия на странице
	setTotalTourPrice: function (selector) {
		document.querySelector(selector).innerHTML = this.formattedPrice(this.calcCostParticipation());
		this.totalTourPrice = this.calcCostParticipation();
	},

	// Форматирует число разбивая пробелами и добавляя знак рубля
	formattedPrice: (num) => {
		return `${new Intl.NumberFormat('ru-RU').format(num)} ₽`;
	},

	// Устанавливает итоговую цену на странице
	setTotalPrice: function (selector) {
		document.querySelector(selector).innerHTML = this.formattedPrice(this.totalRentPrice + this.totalTourPrice);
	},

	// Считает общую стоимость аренды выбраных машин
	getRentPrice: function () {
		let price = 0;
		this.cars.forEach(car => {
			if (car.querySelector('input').checked) {
				price += +car.dataset.carPrice;
			}
		});
		return price;
	},

	// Считает общее колличество мест в выбраных машинах 
	getCarPlaces: function () {
		let places = 0;
		this.cars.forEach(car => {
			if (car.querySelector('input').checked) {
				places += +car.dataset.carPlaces;
			}
		});
		return places;
	},

	// Устанавливает итоговую стоимость аренды машин за n колличество ходовых дней на странице и в объекте
	setTotalRentPrice: function (selector) {
		document.querySelector(selector).innerHTML = this.formattedPrice(this.getRentPrice() * this.runDays);
		this.totalRentPrice = this.getRentPrice() * this.runDays;
	},

	// Проверяем, хватает ли мест в машинах и статусы чекбоксов
	// checkSeatsInCars: function (checkbox = false) {
	// 	if (!checkbox) {
	// 		console.log(checkbox);
	// 		return;
	// 	}
	// 	// Если клик на чекбокс "Своя техника"
	// 	if (checkbox.closest('.js-own-cars').checked) {
	// 		console.log(checkbox);
	// 		return;
	// 	}
	// 	// Если клик на чекбокс "Пассажир без управления"
	// 	if (checkbox.closest('.js-passenger').checked) {
	// 		console.log(checkbox);
	// 		return;
	// 	}
	// 	// if (this.tourists > this.getCarPlaces()) {
	// 	// 	this.errorMsg.hidden = false;
	// 	// } else {
	// 	// 	this.errorMsg.hidden = true;
	// 	// }
	// }

};



document.addEventListener("DOMContentLoaded", function (e) {
	// Берем всю форму калькулятора и добавляем в объект калькулятора
	tourCalculator.priceCalcForm = document.querySelector('.price-calc__form');
	// Берем список машин и добавляем в объект калькулятора
	tourCalculator.cars = tourCalculator.priceCalcForm.querySelectorAll('.checkbox.car');
	// Берем колличество ходовых дней и добавляем в объект калькулятора
	tourCalculator.runDays = +tourCalculator.priceCalcForm.querySelector('[data-run-days]').dataset.runDays;
	// Добавляем стоимость тура в объект калькулятора
	tourCalculator.tourPrice = tourCalculator.getNum('.js-tour-price');


	// Ставим слушатель изменений элементов форм в калькуляторе
	tourCalculator.priceCalcForm.addEventListener('change', e => {
		const target = e.target;

		// Если клик на чекбокс "Аренда техники"
		if (target.closest('.js-car-rent')) {
			if (target.checked) {
				tourCalculator.cars.forEach(item => {
					item.querySelector('input').disabled = false;
				});
			} else {
				tourCalculator.cars.forEach(item => {
					item.querySelector('input').disabled = true;
				});
			}
		}
		// // // Если клик на чекбокс "Своя техника"
		// // if (target.closest('.js-own-cars')) {
		// // 	tourCalculator.checkSeatsInCars(target);
		// // }
		// // // Если клик на чекбокс "Пассажир без управления"
		// // if (target.closest('.js-passenger')) {
		// // 	tourCalculator.checkSeatsInCars(target);
		// // }
		// tourCalculator.checkSeatsInCars(target);


		// Устанавливаем стоимость аренда техники и итоговую стоимость после выбора
		tourCalculator.setTotalRentPrice('.js-total-rent-price');
		tourCalculator.setTotalPrice('.js-total-price');
	});

	// Ставим слушатель на селекты выбора колличества участников
	document.addEventListener("selectCallback", (e) => {
		let target = e.detail.select;

		// Добовляем в объект выбранное колличество взрослых
		if (target.closest('.js-adults')) tourCalculator.adults = +target.value;
		// Добовляем в объект выбранное колличество детей
		if (target.closest('.js-children')) tourCalculator.children = +target.value;
		// Добовляем в объект общее колличество участников
		tourCalculator.tourists = tourCalculator.children + tourCalculator.adults;

		// tourCalculator.checkSeatsInCars();


		// Устанавливаем цены в калькуляторе после выбора колличества участников
		tourCalculator.setTotalTourPrice('.js-total-tour-price');
		tourCalculator.setTotalPrice('.js-total-price');
	});

	// tourCalculator.checkSeatsInCars();


	// Устанавливаем цены в калькуляторе на момент создания страницы
	tourCalculator.setTotalRentPrice('.js-total-rent-price');
	tourCalculator.setTotalTourPrice('.js-total-tour-price');
	tourCalculator.setTotalPrice('.js-total-price');


});

//#endregion

