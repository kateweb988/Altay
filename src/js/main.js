document.addEventListener("DOMContentLoaded", () => {

  class Tabs {
    constructor(element) {
      this.container = element;

      // Ищем nav на любой глубине
      this.nav = this.container.querySelector('.tabs__nav, .tabs2__nav');

      if (!this.nav) return;

      // Кнопки
      this.buttons = this.nav.querySelectorAll('.tabs__btn');

      // Панели
      this.panes = this.container.querySelectorAll('.tabs__content .tabs__pane');

      this.init();
      this.events();
    }

    init() {
      this.container.setAttribute('role', 'tablist');

      this.buttons.forEach((btn, index) => {
        btn.dataset.index = index;
        btn.setAttribute('role', 'tab');

        if (this.panes[index]) {
          this.panes[index].setAttribute('role', 'tabpanel');
        }
      });
    }

    show(button) {
      const index = button.dataset.index;

      const activeBtn = this.nav.querySelector('.tabs__btn_active');
      const activePane = this.container.querySelector('.tabs__pane_show');

      if (button === activeBtn) return;

      if (activeBtn) activeBtn.classList.remove('tabs__btn_active', 'active');
      if (activePane) activePane.classList.remove('tabs__pane_show');

      button.classList.add('tabs__btn_active', 'active');

      if (this.panes[index]) {
        this.panes[index].classList.add('tabs__pane_show');
      }
    }

    events() {
      this.nav.addEventListener('click', (e) => {
        const btn = e.target.closest('.tabs__btn');
        if (!btn) return;

        e.preventDefault();
        this.show(btn);
      });
    }
  }

  // Инициализация всех табов
  document.querySelectorAll('.tabs, .tabs2').forEach(tab => {
    new Tabs(tab);
  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener("DOMContentLoaded", function () {
  
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");

  if (checkin) {
    checkin.addEventListener("click", function () {
      this.showPicker(); // открывает нативный календарь
    });
  }

  if (checkout) {
    checkout.addEventListener("click", function () {
      this.showPicker();
    });
  }

});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.nav__btn').click(function (e) {
    e.preventDefault();
    $('#popup-call1').arcticmodal({
    });
  });
  $('.item__btn').click(function (e) {
    e.preventDefault();
    $('#popup-call2').arcticmodal({
    });
  });
  $('.social, .menu__tel').click(function (e) {
    e.preventDefault();
    $('#popup-social').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".youtube-link");

  links.forEach(link => {

    const videoID = link.getAttribute("youtubeid");
    const autoPlay = 1;

    if (!videoID) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const popup = document.createElement("div");
      popup.className = "grtvideo-popup";

      popup.innerHTML = `
        <div class="grtvideo-popup-content">
          <span class="grtvideo-popup-close">&times;</span>
          <iframe class="grtyoutube-iframe"
            src="https://www.youtube.com/embed/${videoID}?rel=0&wmode=transparent&autoplay=${autoPlay}&iv_load_policy=3"
            allowfullscreen
            frameborder="0">
          </iframe>
        </div>
      `;

      document.body.appendChild(popup);

      const closeBtn = popup.querySelector(".grtvideo-popup-close");

      function closePopup() {
        popup.remove();
      }

      closeBtn.addEventListener("click", closePopup);

      popup.addEventListener("click", (e) => {
        if (e.target === popup) closePopup();
      });

      document.addEventListener("keyup", function escClose(e) {
        if (e.key === "Escape") {
          closePopup();
          document.removeEventListener("keyup", escClose);
        }
      });

    });

  });

});
document.addEventListener("DOMContentLoaded", () => {
  const social = document.querySelector(".social");

  const offsetBottom = 40;
  const limit = 390;
  const breakpoint = 1200;

  function updatePosition() {
    if (window.innerWidth < breakpoint) {
      social.style.bottom = offsetBottom + "px";
      return;
    }

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const distanceToBottom = docHeight - (scrollTop + windowHeight);

    if (distanceToBottom < limit) {
      social.style.bottom = offsetBottom + (limit - distanceToBottom) + "px";
    } else {
      social.style.bottom = offsetBottom + "px";
    }
  }

  window.addEventListener("scroll", updatePosition);
  window.addEventListener("resize", updatePosition);

  updatePosition();
});

document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', () => {
  /* ==============================
     SWIPER 3 + SELECT
  ============================== */
  if (document.querySelector('.swiper3')) {

    const swiper3 = new Swiper('.swiper3', {
      slidesPerView: 'auto',
      loop: true,
      pagination: {
        el: '.swiper-pagination3',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next3',
        prevEl: '.swiper-button-prev3',
      },
    });

    const select = document.getElementById('swiperSelect3');

    if (select) {
      select.addEventListener('change', () => {
        swiper3.slideToLoop(+select.value);
      });

      swiper3.on('slideChange', () => {
        select.value = swiper3.realIndex;
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 700,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
      },
  });

  const preview = document.querySelector(".preview");

  function updatePreview() {
    preview.innerHTML = "";
    const slides = swiper.slides;
    const previewCount = 4; // максимальное количество превью
    let width = 46; // начальная ширина
    const widthStep = 10; // шаг уменьшения

    const remainingSlides = slides.length - swiper.activeIndex - 1; 
    if (remainingSlides <= 0) return; // если после активного нет слайдов, не рисуем

    // сколько блоков превью реально рисуем
    const blocksToShow = Math.min(previewCount, remainingSlides);

    for (let i = 0; i < blocksToShow; i++) {
      const index = swiper.activeIndex + 1 + i; // начинаем с слайда после активного
      const imgSrc = slides[index].querySelector("img").src;

      const div = document.createElement("div");
      div.style.width = width + "px";
      div.style.height = "100%";
      div.style.marginBottom = "4px";
      div.innerHTML = `<img src="${imgSrc}">`;
      preview.appendChild(div);

      width -= widthStep;
      if (width < 20) width = 20; // минимальная ширина
    }
  }

  swiper.on("init", updatePreview);
  swiper.on("slideChange", updatePreview);
  swiper.init();

  // сразу отображаем превью для первого слайда
  updatePreview();
});
document.addEventListener('DOMContentLoaded', function () {
    
  /* ==============================
     SWIPER HOTEL
  ============================== */

  let swiperHotel;

  if (document.querySelector('.swiper-hotel')) {
    swiperHotel = new Swiper('.swiper-hotel', {
      spaceBetween: 19,
      slidesPerView: 4,
      watchOverflow: true,
      allowTouchMove: false,
      pagination: {
        el: '.swiper-pagination-hotel',
        type: 'progressbar',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          allowTouchMove: true,
          grid: {
            rows: 1,
            fill: 'row',
          },
        },
        768: {
          slidesPerView: 2,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        1200: {
          slidesPerView: 4,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  /* ==============================
     SWIPER CHALET
  ============================== */

  let swiperChalet;

  if (document.querySelector('.swiper-chalet')) {
    swiperChalet = new Swiper('.swiper-chalet', {
      spaceBetween: 19,
      slidesPerView: 4,
      watchOverflow: true,
      allowTouchMove: false,
      pagination: {
        el: '.swiper-pagination-chalet',
        type: 'progressbar',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          allowTouchMove: true,
          grid: {
            rows: 1,
            fill: 'row',
          },
        },
        768: {
          slidesPerView: 2,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        1200: {
          slidesPerView: 4,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  /* ==============================
     SWIPER 4
  ============================== */

  if (document.querySelector('.swiper4')) {
    new Swiper('.swiper4', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next4',
        prevEl: '.swiper-button-prev4',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 12,
          loop: true,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }

  /* ==============================
     SWIPER 5 + THUMBS
  ============================== */

  if (document.querySelector('.mySwiper5') && document.querySelector('.mySwiper6')) {

    const swiper6 = new Swiper(".mySwiper6", {
      spaceBetween: 0,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(".mySwiper5", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next5",
        prevEl: ".swiper-button-prev5",
      },
      thumbs: {
        swiper: swiper6,
      },
    });

  }

  /* ==============================
     SWIPER 7
  ============================== */

  if (document.querySelector('.swiper7')) {
    new Swiper('.swiper7', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next7',
        prevEl: '.swiper-button-prev7',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
        },
        767: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 1,
        }
      }
    });
  }

  /* ==============================
     SWIPER 9
  ============================== */

  if (document.querySelector('.swiper9')) {
    new Swiper('.swiper9', {
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next9',
        prevEl: '.swiper-button-prev9',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
        },
        767: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        }
      }
    });
  }

  /* ==============================
     SWIPER 8
  ============================== */

  if (document.querySelector('.swiper8')) {
    new Swiper('.swiper8', {
      slidesPerView: 3,
      spaceBetween: 40,
      navigation: {
        nextEl: '.swiper-button-next8',
        prevEl: '.swiper-button-prev8',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
        },
        767: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      }
    });
  }

  /* ==============================
     TABS
  ============================== */

  const tabs = document.querySelectorAll(".title-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabs.length) {

    tabs.forEach(tab => {
      tab.addEventListener("click", function () {

        const tabName = this.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");

        tabContents.forEach(content => {
          content.classList.remove("active");
          if (content.dataset.tab === tabName) {
            content.classList.add("active");
          }
        });

        setTimeout(() => {

          if (swiperHotel) {
            swiperHotel.update();
            swiperHotel.updateSlides();
            swiperHotel.updateProgress();
            swiperHotel.updateSize();
            swiperHotel.pagination.render();
            swiperHotel.pagination.update();
          }

          if (swiperChalet) {
            swiperChalet.update();
            swiperChalet.updateSlides();
            swiperChalet.updateProgress();
            swiperChalet.updateSize();
            swiperChalet.pagination.render();
            swiperChalet.pagination.update();
          }

        }, 120);

      });
    });

  }

});
document.addEventListener('DOMContentLoaded', function () {
  const wrap = document.querySelector('.main__wrap');
  const row = wrap.querySelector('.main__row');

  // Проверяем, что устройство – десктоп
  if (window.matchMedia("(min-width: 768px)").matches) {
    wrap.addEventListener('mousemove', e => {
      const { width } = wrap.getBoundingClientRect();
      const mouseX = e.clientX - wrap.getBoundingClientRect().left;

      const maxScroll = row.scrollWidth - wrap.clientWidth;
      const scroll = (mouseX / width) * maxScroll;

      row.style.transform = `translateX(${-scroll}px)`;
    });

    // Чтобы скролл возвращался в исходное положение при уходе мыши
    wrap.addEventListener('mouseleave', () => {
      row.style.transform = `translateX(0)`;
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {

  const guestSelect = document.getElementById('guestSelect');
  const guestResult = document.getElementById('guestResult');

  if (!guestSelect || !guestResult) return;

  const trigger = guestSelect.querySelector('.select-trigger');

  /* ==============================
     Открытие / закрытие
  ============================== */
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      guestSelect.classList.toggle('active');
    });
  }

  /* ==============================
     Обновление текста
  ============================== */
  function updateGuestText() {
    const adultsInput = guestSelect.querySelector('input[name="adults"]:checked');
    const childrenInput = guestSelect.querySelector('input[name="children"]:checked');

    const adults = adultsInput ? adultsInput.value : 0;
    const children = childrenInput ? childrenInput.value : 0;

    guestResult.textContent = `${adults} взрослых, ${children} детей`;
  }

  // Слушаем изменение радиокнопок
  guestSelect.addEventListener('change', (e) => {
    if (e.target.matches('input[name="adults"], input[name="children"]')) {
      updateGuestText();
    }
  });

  /* ==============================
     Закрытие при клике вне
  ============================== */
  document.addEventListener('click', (e) => {
    if (!guestSelect.contains(e.target)) {
      guestSelect.classList.remove('active');
    }
  });

  /* ==============================
     Инициализация текста при загрузке
  ============================== */
  updateGuestText();

});
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const close1 = document.querySelector('.close1');
  const close2 = document.querySelector('.close2');

  // открыть меню
  menuBtn.addEventListener('click', () => {
    menu.classList.add('active');
  });

  // закрыть меню (оба крестика)
  close1.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  close2.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});
// Меню: переключение классов по клику
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu li a.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('.menu-btn')?.classList.toggle('active');
      document.querySelector('.menu')?.classList.toggle('active');
    });
  });
});

// Скролл по якорям
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const targetSelector = link.getAttribute('href');

      if (!targetSelector || targetSelector === '#') return;

      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        const offset = 100;

        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn('Нет элемента:', targetSelector);
      }
    });
  });
});

// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

