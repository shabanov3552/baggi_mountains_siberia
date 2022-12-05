/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, EffectCreative, Pagination, Parallax, EffectFade } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.main-slider__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер reviews__slider
		new Swiper('.main-slider__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, EffectCreative],
			observer: true,
			observeParents: true,
			centeredSlides: true,
			// slidesPerView: 3,
			spaceBetween: 23,
			autoHeight: true,
			speed: 800,
			effect: 'creative',
			creativeEffect: {
				limitProgress: 4,
				prev: {
					// will set `translateZ(-400px)` on previous slides
					translate: [-233, 0, 0],
					opacity: 0.5,
				},
				next: {
					// will set `translateX(100%)` on next slides
					translate: [233, 0, 0],
				},
			},
			// Брейкпоинты

			breakpoints: {
				320: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-160, 0, 0],
							opacity: 0.7,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [160, 0, 0],
						},
					},
				},
				1100: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-200, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [200, 0, 0],
						},
					},
				},
				1700: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-233, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [233, 0, 0],
						},
					},
				},
				1920: {
					slidesPerView: 2,
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-233, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [233, 0, 0],
						},
					},
				},
			},
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			/* effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			}, */


			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},


			// События
			on: {

			}
		});
	}
	if (document.querySelector('.reviews__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.reviews__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Parallax, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 23,
			autoHeight: true,
			speed: 800,
			parallax: true,
			loop: true,
			/* effect: 'creative',
			creativeEffect: {
				limitProgress: 4,
				prev: {
					// will set `translateZ(-400px)` on previous slides
					translate: [-233, 0, 0],
					opacity: 0.5,
				},
				next: {
					// will set `translateX(100%)` on next slides
					translate: [233, 0, 0],
				},
			}, */
			// Брейкпоинты

			/* breakpoints: {
				320: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-160, 0, 0],
							opacity: 0.7,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [160, 0, 0],
						},
					},
				},
				1100: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-200, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [200, 0, 0],
						},
					},
				},
				1700: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-233, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [233, 0, 0],
						},
					},
				},
				1920: {
					slidesPerView: 2,
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-233, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [233, 0, 0],
						},
					},
				},
			}, */
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},


			// Пагинация

			pagination: {
				el: ".reviews__fraction",
				type: "fraction",
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.reviews__nav-prev',
				nextEl: '.reviews__nav-next',
			},


			// События
			on: {

			}
		});
	}
	if (document.querySelector('.slider-video__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер reviews__slider
		new Swiper('.slider-video__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			// centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 23,
			autoHeight: true,
			speed: 800,
			// Брейкпоинты

			/* breakpoints: {
				320: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-160, 0, 0],
							opacity: 0.7,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [160, 0, 0],
						},
					},
				},
				1100: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-200, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [200, 0, 0],
						},
					},
				},
				1700: {
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-233, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [233, 0, 0],
						},
					},
				},
				1920: {
					slidesPerView: 2,
					creativeEffect: {
						limitProgress: 4,
						prev: {
							// will set `translateZ(-400px)` on previous slides
							translate: [-233, 0, 0],
							opacity: 0.5,
						},
						next: {
							// will set `translateX(100%)` on next slides
							translate: [233, 0, 0],
						},
					},
				},
			}, */

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-video-button-prev',
				nextEl: '.slider-video-button-next',
			},
		});
	}
	if (document.querySelector('.technique__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер reviews__slider
		new Swiper('.technique__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			// centeredSlides: true,
			slidesPerView: 4,
			spaceBetween: 20,
			// autoHeight: true,
			speed: 800,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			loop: true,
			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
			},

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.technique__slider-button-prev',
				nextEl: '.technique__slider-button-next',
			},
		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});