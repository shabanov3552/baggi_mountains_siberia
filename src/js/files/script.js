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

let tourCalculator = {
	adults: 1, // колличество взрослых
	children: 0, // колличество детей
	tourists: 1, // общее колличество участников тура

	runDays: 0, // колличество ходовых дней

	ownCarsCheckbox: false, // Статус чекбокса "Своя техника"
	passengerCheckbox: {
		check: false, // Статус чекбокса "Пассажир без управления"
		price: 9000 // Стоимсоть участия за пассажира без управления
	},

	checkedCars: [], // Массив с выбраными машинами

	tourPrice: 0, // Стоимсоть тура начальная
	totalTourPrice: 0, // Стоимость участия за всех участников тура
	totalRentPrice: 0, // Стоимость аренды выбраной техники
	totalPrice: 0, // Итоговая стоимость тура

	// Берет стоимость тура из элемента и форматирует в число
	getNum: function (selector) {
		return +document.querySelector(selector).innerText.split('').filter(item => {
			if (!isNaN(parseInt(item))) {
				return item;
			}
		}).join('');
	},

	// Форматирует число разбивая пробелами и добавляя знак рубля
	formattedPrice: (num) => {
		return `${new Intl.NumberFormat('ru-RU').format(num)} ₽`;
	},

	// Считает цену стоимости участия за всех участников тура
	calcCostParticipation: function () {
		return this.adults * this.tourPrice + this.children * (this.tourPrice * 0.7);
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

	// Добавляем стоимость участия в объект и на страницу 
	setTotalTourPrice: function (selector) {
		this.totalTourPrice = this.calcCostParticipation();
		// Выводим стоимость на страницу
		document.querySelector(selector).innerHTML = this.formattedPrice(this.totalTourPrice);
	},

	// Добавляем итоговую стоимость аренды машин за n колличество ходовых дней в объект и на страницу
	setTotalRentPrice: function (selector) {
		// Проверяем прожат ли чекбокс "Пассажир без управления"
		if (this.passengerCheckbox.check) {
			// Считаем стоимость аренды машин и цену за участие без управления за n ходовых дней и добавляем в объект
			this.totalRentPrice = (this.getRentPrice() + this.passengerCheckbox.price) * this.runDays;
			// Выводим стоимость на страницу
			document.querySelector(selector).innerHTML = this.formattedPrice(this.totalRentPrice);
			return;
		}
		// Считаем стоимость аренды машин за n ходовых дней
		this.totalRentPrice = this.getRentPrice() * this.runDays;
		// Выводим стоимость на страницу
		document.querySelector(selector).innerHTML = this.formattedPrice(this.totalRentPrice);
	},

	// Устанавливает итоговую цену на странице
	setTotalPrice: function (selector) {
		// Проверяем хватает ли мест в машинах всем участникам
		if (this.getCarPlaces() < this.tourists) {
			// Если не хватает выводим об этом сообщение
			this.errorMsg.hidden = false;
			// Деактивируем кнопку "Забровнировать"
			this.priceCalcForm.querySelector('.price-calc__btn').classList.add('off');
			// Проверяем прожат один из чекбоксов, если да, прячем сообщение
			if (this.ownCarsCheckbox || this.passengerCheckbox.check) {
				this.errorMsg.hidden = true;
				// Активируем кнопку "Забровнировать"
				this.priceCalcForm.querySelector('.price-calc__btn').classList.remove('off');
			}
		} else {
			// Прячем сообщение
			this.errorMsg.hidden = true;
			// Деактивируем кнопку "Забровнировать"
			this.priceCalcForm.querySelector('.price-calc__btn').classList.remove('off');
		}
		// Выводим итоговую стоимость тура на страницу
		document.querySelector(selector).innerHTML = this.formattedPrice(this.totalRentPrice + this.totalTourPrice);
	},
};



document.addEventListener("DOMContentLoaded", function (e) {

	// Добавляем в объект калькулятора форму калькулятора
	tourCalculator.priceCalcForm = document.querySelector('.price-calc__form');
	if (tourCalculator.priceCalcForm) {
		console.log('qwe');
		// Добавляем в объект калькулятора чекбоксы с машинами
		tourCalculator.cars = tourCalculator.priceCalcForm.querySelectorAll('.checkbox.car');
		// Добавляем в объект калькулятора колличество ходовых дней
		tourCalculator.runDays = +tourCalculator.priceCalcForm.querySelector('[data-run-days]').dataset.runDays;
		// Добавляем в объект калькулятора стоимость тура 
		tourCalculator.tourPrice = tourCalculator.getNum('.js-tour-price');
		// Добавляем в объект калькулятора сообщение об ошибке, что не хватает мест в машинах
		tourCalculator.errorMsg = document.querySelector('.total-cost__error-msg');


		// Ставим слушатель изменений элементов форм в калькуляторе
		tourCalculator.priceCalcForm.addEventListener('change', e => {
			const target = e.target;

			// Если клик на чекбокс "Аренда техники"
			if (target.closest('.js-car-rent')) {
				if (target.checked) {
					// Снимаем блокировку с чекбоксов
					tourCalculator.cars.forEach((item) => {
						item.querySelector('input').disabled = false;
						// Возвращаем ранее выбранные машины в состояние checked
						tourCalculator.checkedCars.forEach(id => {
							id === item.querySelector('input').id ? item.querySelector('input').checked = true : null;
						});
					});

					// Чистим массив 
					tourCalculator.checkedCars = [];
				} else {
					// Блокируем выбор чекбокса
					tourCalculator.cars.forEach(item => {
						item.querySelector('input').disabled = true;

						// Добавляем в массив выбранные машины
						item.querySelector('input').checked ? tourCalculator.checkedCars.push(item.querySelector('input').id) : null;
						item.querySelector('input').checked = false;
					});
				}
			}

			// Если клик на чекбокс "Своя техника"
			if (target.closest('.js-own-cars')) {
				target.checked ? tourCalculator.ownCarsCheckbox = true : tourCalculator.ownCarsCheckbox = false;
			}

			// Если клик на чекбокс "Пассажир без управления"
			if (target.closest('.js-passenger')) {
				target.checked ? tourCalculator.passengerCheckbox.check = true : tourCalculator.passengerCheckbox.check = false;
			}



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



			// Устанавливаем цены в калькуляторе после выбора колличества участников
			tourCalculator.setTotalTourPrice('.js-total-tour-price');
			tourCalculator.setTotalPrice('.js-total-price');
		});

		// Устанавливаем цены в калькуляторе на момент создания страницы
		tourCalculator.setTotalRentPrice('.js-total-rent-price');
		tourCalculator.setTotalTourPrice('.js-total-tour-price');
		tourCalculator.setTotalPrice('.js-total-price');

		//! Временное действие для теста
		// Добавление ценников машин в чекбокс
		tourCalculator.cars.forEach(car => {
			car.querySelector('.car__descr').insertAdjacentHTML('beforeEnd', `<br>Цена: ${car.dataset.carPrice} ₽`);
		});
	}
});

//#endregion
