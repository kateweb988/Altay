
document.addEventListener("DOMContentLoaded", () => {

  class Tabs {
    constructor(element) {
      this.container = element;
      this.nav = this.container.querySelector(':scope > .tabs__nav, :scope > .tabs2__nav');
      this.buttons = this.nav.querySelectorAll(':scope > .tabs__btn');
      this.panes = this.container.querySelectorAll(':scope > .tabs__content > .tabs__pane');

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
      const activePane = this.container.querySelector(':scope > .tabs__content > .tabs__pane_show');

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

  // Инициализация ВСЕХ табов на странице
  document.querySelectorAll('.tabs, .tabs2').forEach(tab => {
    new Tabs(tab);
  });

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
document.addEventListener('DOMContentLoaded', function () {

  /* ==============================
     SWIPER 1
  ============================== */
  if (document.querySelector('.swiper1')) {
    new Swiper('.swiper1', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 800,
      allowTouchMove: true,
      watchOverflow: true,
      resistanceRatio: 0,
      navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
      },
    });
  }

  /* ==============================
     SWIPER 2 (GRID БЕЗ ПАДЕНИЯ)
  ============================== */
  const swiper2El = document.querySelector('.swiper2');

  if (
    swiper2El &&
    swiper2El.querySelector('.swiper-wrapper') &&
    swiper2El.querySelectorAll('.swiper-slide').length
  ) {

    new Swiper(swiper2El, {
      spaceBetween: 19,
      slidesPerView: 3,
      watchOverflow: true,
      pagination: {
        el: '.swiper-pagination2',
        type: 'progressbar',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
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
          slidesPerView: 3,
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
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
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


/**
 * Swiper 9.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 13, 2023
 */

!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t() }(this, (function () { "use strict"; function e(e) { return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object } function t(s, a) { void 0 === s && (s = {}), void 0 === a && (a = {}), Object.keys(a).forEach((i => { void 0 === s[i] ? s[i] = a[i] : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]) })) } const s = { body: {}, addEventListener() { }, removeEventListener() { }, activeElement: { blur() { }, nodeName: "" }, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createEvent: () => ({ initEvent() { } }), createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() { }, getElementsByTagName: () => [] }), createElementNS: () => ({}), importNode: () => null, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" } }; function a() { const e = "undefined" != typeof document ? document : {}; return t(e, s), e } const i = { document: s, navigator: { userAgent: "" }, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" }, history: { replaceState() { }, pushState() { }, go() { }, back() { } }, CustomEvent: function () { return this }, addEventListener() { }, removeEventListener() { }, getComputedStyle: () => ({ getPropertyValue: () => "" }), Image() { }, Date() { }, screen: {}, setTimeout() { }, clearTimeout() { }, matchMedia: () => ({}), requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0), cancelAnimationFrame(e) { "undefined" != typeof setTimeout && clearTimeout(e) } }; function r() { const e = "undefined" != typeof window ? window : {}; return t(e, i), e } function n(e, t) { return void 0 === t && (t = 0), setTimeout(e, t) } function l() { return Date.now() } function o(e, t) { void 0 === t && (t = "x"); const s = r(); let a, i, n; const l = function (e) { const t = r(); let s; return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s }(e); return s.WebKitCSSMatrix ? (i = l.transform || l.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e => e.replace(",", "."))).join(", ")), n = new s.WebKitCSSMatrix("none" === i ? "" : i)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a = n.toString().split(",")), "x" === t && (i = s.WebKitCSSMatrix ? n.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = s.WebKitCSSMatrix ? n.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0 } function d(e) { return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1) } function c(e) { return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType) } function p() { const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = ["__proto__", "constructor", "prototype"]; for (let s = 1; s < arguments.length; s += 1) { const a = s < 0 || arguments.length <= s ? void 0 : arguments[s]; if (null != a && !c(a)) { const s = Object.keys(Object(a)).filter((e => t.indexOf(e) < 0)); for (let t = 0, i = s.length; t < i; t += 1) { const i = s[t], r = Object.getOwnPropertyDescriptor(a, i); void 0 !== r && r.enumerable && (d(e[i]) && d(a[i]) ? a[i].__swiper__ ? e[i] = a[i] : p(e[i], a[i]) : !d(e[i]) && d(a[i]) ? (e[i] = {}, a[i].__swiper__ ? e[i] = a[i] : p(e[i], a[i])) : e[i] = a[i]) } } } return e } function u(e, t, s) { e.style.setProperty(t, s) } function m(e) { let { swiper: t, targetPosition: s, side: a } = e; const i = r(), n = -t.translate; let l, o = null; const d = t.params.speed; t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID); const c = s > n ? "next" : "prev", p = (e, t) => "next" === c && e >= t || "prev" === c && e <= t, u = () => { l = (new Date).getTime(), null === o && (o = l); const e = Math.max(Math.min((l - o) / d, 1), 0), r = .5 - Math.cos(e * Math.PI) / 2; let c = n + r * (s - n); if (p(c, s) && (c = s), t.wrapperEl.scrollTo({ [a]: c }), p(c, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout((() => { t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({ [a]: c }) })), void i.cancelAnimationFrame(t.cssModeFrameID); t.cssModeFrameID = i.requestAnimationFrame(u) }; u() } function h(e) { return e.querySelector(".swiper-slide-transform") || e.shadowEl && e.shadowEl.querySelector(".swiper-slide-transform") || e } function f(e, t) { return void 0 === t && (t = ""), [...e.children].filter((e => e.matches(t))) } function g(e, t) { void 0 === t && (t = []); const s = document.createElement(e); return s.classList.add(...Array.isArray(t) ? t : [t]), s } function v(e) { const t = r(), s = a(), i = e.getBoundingClientRect(), n = s.body, l = e.clientTop || n.clientTop || 0, o = e.clientLeft || n.clientLeft || 0, d = e === t ? t.scrollY : e.scrollTop, c = e === t ? t.scrollX : e.scrollLeft; return { top: i.top + d - l, left: i.left + c - o } } function w(e, t) { return r().getComputedStyle(e, null).getPropertyValue(t) } function b(e) { let t, s = e; if (s) { for (t = 0; null !== (s = s.previousSibling);)1 === s.nodeType && (t += 1); return t } } function y(e, t) { const s = []; let a = e.parentElement; for (; a;)t ? a.matches(t) && s.push(a) : s.push(a), a = a.parentElement; return s } function E(e, t) { t && e.addEventListener("transitionend", (function s(a) { a.target === e && (t.call(e, a), e.removeEventListener("transitionend", s)) })) } function x(e, t, s) { const a = r(); return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth } let S, T, M; function C() { return S || (S = function () { const e = r(), t = a(); return { smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style, touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch) } }()), S } function P(e) { return void 0 === e && (e = {}), T || (T = function (e) { let { userAgent: t } = void 0 === e ? {} : e; const s = C(), a = r(), i = a.navigator.platform, n = t || a.navigator.userAgent, l = { ios: !1, android: !1 }, o = a.screen.width, d = a.screen.height, c = n.match(/(Android);?[\s\/]+([\d.]+)?/); let p = n.match(/(iPad).*OS\s([\d_]+)/); const u = n.match(/(iPod)(.*OS\s([\d_]+))?/), m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), h = "Win32" === i; let f = "MacIntel" === i; return !p && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${d}`) >= 0 && (p = n.match(/(Version)\/([\d.]+)/), p || (p = [0, 1, "13_0_0"]), f = !1), c && !h && (l.os = "android", l.android = !0), (p || m || u) && (l.os = "ios", l.ios = !0), l }(e)), T } function L() { return M || (M = function () { const e = r(); let t = !1; function s() { const t = e.navigator.userAgent.toLowerCase(); return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0 } if (s()) { const s = String(e.navigator.userAgent); if (s.includes("Version/")) { const [e, a] = s.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e))); t = e < 16 || 16 === e && a < 2 } } return { isSafari: t || s(), needPerspectiveFix: t, isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent) } }()), M } var z = { on(e, t, s) { const a = this; if (!a.eventsListeners || a.destroyed) return a; if ("function" != typeof t) return a; const i = s ? "unshift" : "push"; return e.split(" ").forEach((e => { a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t) })), a }, once(e, t, s) { const a = this; if (!a.eventsListeners || a.destroyed) return a; if ("function" != typeof t) return a; function i() { a.off(e, i), i.__emitterProxy && delete i.__emitterProxy; for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)r[n] = arguments[n]; t.apply(a, r) } return i.__emitterProxy = t, a.on(e, i, s) }, onAny(e, t) { const s = this; if (!s.eventsListeners || s.destroyed) return s; if ("function" != typeof e) return s; const a = t ? "unshift" : "push"; return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s }, offAny(e) { const t = this; if (!t.eventsListeners || t.destroyed) return t; if (!t.eventsAnyListeners) return t; const s = t.eventsAnyListeners.indexOf(e); return s >= 0 && t.eventsAnyListeners.splice(s, 1), t }, off(e, t) { const s = this; return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => { void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((a, i) => { (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1) })) })), s) : s }, emit() { const e = this; if (!e.eventsListeners || e.destroyed) return e; if (!e.eventsListeners) return e; let t, s, a; for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)r[n] = arguments[n]; "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), a = e) : (t = r[0].events, s = r[0].data, a = r[0].context || e), s.unshift(a); return (Array.isArray(t) ? t : t.split(" ")).forEach((t => { e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => { e.apply(a, [t, ...s]) })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => { e.apply(a, s) })) })), e } }; const A = (e, t) => { if (!e || e.destroyed || !e.params) return; const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`); if (s) { const t = s.querySelector(`.${e.params.lazyPreloaderClass}`); t && t.remove() } }, $ = (e, t) => { if (!e.slides[t]) return; const s = e.slides[t].querySelector('[loading="lazy"]'); s && s.removeAttribute("loading") }, I = e => { if (!e || e.destroyed || !e.params) return; let t = e.params.lazyPreloadPrevNext; const s = e.slides.length; if (!s || !t || t < 0) return; t = Math.min(t, s); const a = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), i = e.activeIndex; if (e.params.grid && e.params.grid.rows > 1) { const s = i, r = [s - t]; return r.push(...Array.from({ length: t }).map(((e, t) => s + a + t))), void e.slides.forEach(((t, s) => { r.includes(t.column) && $(e, s) })) } const r = i + a - 1; if (e.params.rewind || e.params.loop) for (let a = i - t; a <= r + t; a += 1) { const t = (a % s + s) % s; (t < i || t > r) && $(e, t) } else for (let a = Math.max(i - t, 0); a <= Math.min(r + t, s - 1); a += 1)a !== i && (a > r || a < i) && $(e, a) }; var k = { updateSize: function () { const e = this; let t, s; const a = e.el; t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(w(a, "padding-left") || 0, 10) - parseInt(w(a, "padding-right") || 0, 10), s = s - parseInt(w(a, "padding-top") || 0, 10) - parseInt(w(a, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s })) }, updateSlides: function () { const e = this; function t(t) { return e.isHorizontal() ? t : { width: "height", "margin-top": "margin-left", "margin-bottom ": "margin-right", "margin-left": "margin-top", "margin-right": "margin-bottom", "padding-left": "padding-top", "padding-right": "padding-bottom", marginRight: "marginBottom" }[t] } function s(e, s) { return parseFloat(e.getPropertyValue(t(s)) || 0) } const a = e.params, { wrapperEl: i, slidesEl: r, size: n, rtlTranslate: l, wrongRTL: o } = e, d = e.virtual && a.virtual.enabled, c = d ? e.virtual.slides.length : e.slides.length, p = f(r, `.${e.params.slideClass}, swiper-slide`), m = d ? e.virtual.slides.length : p.length; let h = []; const g = [], v = []; let b = a.slidesOffsetBefore; "function" == typeof b && (b = a.slidesOffsetBefore.call(e)); let y = a.slidesOffsetAfter; "function" == typeof y && (y = a.slidesOffsetAfter.call(e)); const E = e.snapGrid.length, S = e.slidesGrid.length; let T = a.spaceBetween, M = -b, C = 0, P = 0; if (void 0 === n) return; "string" == typeof T && T.indexOf("%") >= 0 ? T = parseFloat(T.replace("%", "")) / 100 * n : "string" == typeof T && (T = parseFloat(T)), e.virtualSize = -T, p.forEach((e => { l ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "" })), a.centeredSlides && a.cssMode && (u(i, "--swiper-centered-offset-before", ""), u(i, "--swiper-centered-offset-after", "")); const L = a.grid && a.grid.rows > 1 && e.grid; let z; L && e.grid.initSlides(m); const A = "auto" === a.slidesPerView && a.breakpoints && Object.keys(a.breakpoints).filter((e => void 0 !== a.breakpoints[e].slidesPerView)).length > 0; for (let i = 0; i < m; i += 1) { let r; if (z = 0, p[i] && (r = p[i]), L && e.grid.updateSlide(i, r, m, t), !p[i] || "none" !== w(r, "display")) { if ("auto" === a.slidesPerView) { A && (p[i].style[t("width")] = ""); const n = getComputedStyle(r), l = r.style.transform, o = r.style.webkitTransform; if (l && (r.style.transform = "none"), o && (r.style.webkitTransform = "none"), a.roundLengths) z = e.isHorizontal() ? x(r, "width", !0) : x(r, "height", !0); else { const e = s(n, "width"), t = s(n, "padding-left"), a = s(n, "padding-right"), i = s(n, "margin-left"), l = s(n, "margin-right"), o = n.getPropertyValue("box-sizing"); if (o && "border-box" === o) z = e + i + l; else { const { clientWidth: s, offsetWidth: n } = r; z = e + t + a + i + l + (n - s) } } l && (r.style.transform = l), o && (r.style.webkitTransform = o), a.roundLengths && (z = Math.floor(z)) } else z = (n - (a.slidesPerView - 1) * T) / a.slidesPerView, a.roundLengths && (z = Math.floor(z)), p[i] && (p[i].style[t("width")] = `${z}px`); p[i] && (p[i].swiperSlideSize = z), v.push(z), a.centeredSlides ? (M = M + z / 2 + C / 2 + T, 0 === C && 0 !== i && (M = M - n / 2 - T), 0 === i && (M = M - n / 2 - T), Math.abs(M) < .001 && (M = 0), a.roundLengths && (M = Math.floor(M)), P % a.slidesPerGroup == 0 && h.push(M), g.push(M)) : (a.roundLengths && (M = Math.floor(M)), (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup == 0 && h.push(M), g.push(M), M = M + z + T), e.virtualSize += z + T, C = z, P += 1 } } if (e.virtualSize = Math.max(e.virtualSize, n) + y, l && o && ("slide" === a.effect || "coverflow" === a.effect) && (i.style.width = `${e.virtualSize + T}px`), a.setWrapperSize && (i.style[t("width")] = `${e.virtualSize + T}px`), L && e.grid.updateWrapperSize(z, h, t), !a.centeredSlides) { const t = []; for (let s = 0; s < h.length; s += 1) { let i = h[s]; a.roundLengths && (i = Math.floor(i)), h[s] <= e.virtualSize - n && t.push(i) } h = t, Math.floor(e.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - n) } if (d && a.loop) { const t = v[0] + T; if (a.slidesPerGroup > 1) { const s = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / a.slidesPerGroup), i = t * a.slidesPerGroup; for (let e = 0; e < s; e += 1)h.push(h[h.length - 1] + i) } for (let s = 0; s < e.virtual.slidesBefore + e.virtual.slidesAfter; s += 1)1 === a.slidesPerGroup && h.push(h[h.length - 1] + t), g.push(g[g.length - 1] + t), e.virtualSize += t } if (0 === h.length && (h = [0]), 0 !== T) { const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight"); p.filter(((e, t) => !(a.cssMode && !a.loop) || t !== p.length - 1)).forEach((e => { e.style[s] = `${T}px` })) } if (a.centeredSlides && a.centeredSlidesBounds) { let e = 0; v.forEach((t => { e += t + (T || 0) })), e -= T; const t = e - n; h = h.map((e => e <= 0 ? -b : e > t ? t + y : e)) } if (a.centerInsufficientSlides) { let e = 0; if (v.forEach((t => { e += t + (T || 0) })), e -= T, e < n) { const t = (n - e) / 2; h.forEach(((e, s) => { h[s] = e - t })), g.forEach(((e, s) => { g[s] = e + t })) } } if (Object.assign(e, { slides: p, snapGrid: h, slidesGrid: g, slidesSizesGrid: v }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) { u(i, "--swiper-centered-offset-before", -h[0] + "px"), u(i, "--swiper-centered-offset-after", e.size / 2 - v[v.length - 1] / 2 + "px"); const t = -e.snapGrid[0], s = -e.slidesGrid[0]; e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s)) } if (m !== c && e.emit("slidesLengthChange"), h.length !== E && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), g.length !== S && e.emit("slidesGridLengthChange"), a.watchSlidesProgress && e.updateSlidesOffset(), !(d || a.cssMode || "slide" !== a.effect && "fade" !== a.effect)) { const t = `${a.containerModifierClass}backface-hidden`, s = e.el.classList.contains(t); m <= a.maxBackfaceHiddenSlides ? s || e.el.classList.add(t) : s && e.el.classList.remove(t) } }, updateAutoHeight: function (e) { const t = this, s = [], a = t.virtual && t.params.virtual.enabled; let i, r = 0; "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed); const n = e => a ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]; if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) if (t.params.centeredSlides) (t.visibleSlides || []).forEach((e => { s.push(e) })); else for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) { const e = t.activeIndex + i; if (e > t.slides.length && !a) break; s.push(n(e)) } else s.push(n(t.activeIndex)); for (i = 0; i < s.length; i += 1)if (void 0 !== s[i]) { const e = s[i].offsetHeight; r = e > r ? e : r } (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`) }, updateSlidesOffset: function () { const e = this, t = e.slides, s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0; for (let a = 0; a < t.length; a += 1)t[a].swiperSlideOffset = (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) - s - e.cssOverflowAdjustment() }, updateSlidesProgress: function (e) { void 0 === e && (e = this && this.translate || 0); const t = this, s = t.params, { slides: a, rtlTranslate: i, snapGrid: r } = t; if (0 === a.length) return; void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset(); let n = -e; i && (n = e), a.forEach((e => { e.classList.remove(s.slideVisibleClass) })), t.visibleSlidesIndexes = [], t.visibleSlides = []; let l = s.spaceBetween; "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l)); for (let e = 0; e < a.length; e += 1) { const o = a[e]; let d = o.swiperSlideOffset; s.cssMode && s.centeredSlides && (d -= a[0].swiperSlideOffset); const c = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l), p = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l), u = -(n - d), m = u + t.slidesSizesGrid[e]; (u >= 0 && u < t.size - 1 || m > 1 && m <= t.size || u <= 0 && m >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), a[e].classList.add(s.slideVisibleClass)), o.progress = i ? -c : c, o.originalProgress = i ? -p : p } }, updateProgress: function (e) { const t = this; if (void 0 === e) { const s = t.rtlTranslate ? -1 : 1; e = t && t.translate && t.translate * s || 0 } const s = t.params, a = t.maxTranslate() - t.minTranslate(); let { progress: i, isBeginning: r, isEnd: n, progressLoop: l } = t; const o = r, d = n; if (0 === a) i = 0, r = !0, n = !0; else { i = (e - t.minTranslate()) / a; const s = Math.abs(e - t.minTranslate()) < 1, l = Math.abs(e - t.maxTranslate()) < 1; r = s || i <= 0, n = l || i >= 1, s && (i = 0), l && (i = 1) } if (s.loop) { const s = t.getSlideIndexByData(0), a = t.getSlideIndexByData(t.slides.length - 1), i = t.slidesGrid[s], r = t.slidesGrid[a], n = t.slidesGrid[t.slidesGrid.length - 1], o = Math.abs(e); l = o >= i ? (o - i) / n : (o + n - r) / n, l > 1 && (l -= 1) } Object.assign(t, { progress: i, progressLoop: l, isBeginning: r, isEnd: n }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !d && t.emit("reachEnd toEdge"), (o && !r || d && !n) && t.emit("fromEdge"), t.emit("progress", i) }, updateSlidesClasses: function () { const e = this, { slides: t, params: s, slidesEl: a, activeIndex: i } = e, r = e.virtual && s.virtual.enabled, n = e => f(a, `.${s.slideClass}${e}, swiper-slide${e}`)[0]; let l; if (t.forEach((e => { e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass) })), r) if (s.loop) { let t = i - e.virtual.slidesBefore; t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), l = n(`[data-swiper-slide-index="${t}"]`) } else l = n(`[data-swiper-slide-index="${i}"]`); else l = t[i]; if (l) { l.classList.add(s.slideActiveClass); let e = function (e, t) { const s = []; for (; e.nextElementSibling;) { const a = e.nextElementSibling; t ? a.matches(t) && s.push(a) : s.push(a), e = a } return s }(l, `.${s.slideClass}, swiper-slide`)[0]; s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass); let a = function (e, t) { const s = []; for (; e.previousElementSibling;) { const a = e.previousElementSibling; t ? a.matches(t) && s.push(a) : s.push(a), e = a } return s }(l, `.${s.slideClass}, swiper-slide`)[0]; s.loop && 0 === !a && (a = t[t.length - 1]), a && a.classList.add(s.slidePrevClass) } e.emitSlidesClasses() }, updateActiveIndex: function (e) { const t = this, s = t.rtlTranslate ? t.translate : -t.translate, { snapGrid: a, params: i, activeIndex: r, realIndex: n, snapIndex: l } = t; let o, d = e; const c = e => { let s = e - t.virtual.slidesBefore; return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s }; if (void 0 === d && (d = function (e) { const { slidesGrid: t, params: s } = e, a = e.rtlTranslate ? e.translate : -e.translate; let i; for (let e = 0; e < t.length; e += 1)void 0 !== t[e + 1] ? a >= t[e] && a < t[e + 1] - (t[e + 1] - t[e]) / 2 ? i = e : a >= t[e] && a < t[e + 1] && (i = e + 1) : a >= t[e] && (i = e); return s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i }(t)), a.indexOf(s) >= 0) o = a.indexOf(s); else { const e = Math.min(i.slidesPerGroupSkip, d); o = e + Math.floor((d - e) / i.slidesPerGroup) } if (o >= a.length && (o = a.length - 1), d === r) return o !== l && (t.snapIndex = o, t.emit("snapIndexChange")), void (t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = c(d))); let p; p = t.virtual && i.virtual.enabled && i.loop ? c(d) : t.slides[d] ? parseInt(t.slides[d].getAttribute("data-swiper-slide-index") || d, 10) : d, Object.assign(t, { previousSnapIndex: l, snapIndex: o, previousRealIndex: n, realIndex: p, previousIndex: r, activeIndex: d }), t.initialized && I(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), n !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange") }, updateClickedSlide: function (e) { const t = this, s = t.params, a = e.closest(`.${s.slideClass}, swiper-slide`); let i, r = !1; if (a) for (let e = 0; e < t.slides.length; e += 1)if (t.slides[e] === a) { r = !0, i = e; break } if (!a || !r) return t.clickedSlide = void 0, void (t.clickedIndex = void 0); t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(a.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = i, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide() } }; var O = { getTranslate: function (e) { void 0 === e && (e = this.isHorizontal() ? "x" : "y"); const { params: t, rtlTranslate: s, translate: a, wrapperEl: i } = this; if (t.virtualTranslate) return s ? -a : a; if (t.cssMode) return a; let r = o(i, e); return r += this.cssOverflowAdjustment(), s && (r = -r), r || 0 }, setTranslate: function (e, t) { const s = this, { rtlTranslate: a, params: i, wrapperEl: r, progress: n } = s; let l, o = 0, d = 0; s.isHorizontal() ? o = a ? -e : e : d = e, i.roundLengths && (o = Math.floor(o), d = Math.floor(d)), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? o : d, i.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : i.virtualTranslate || (s.isHorizontal() ? o -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(), r.style.transform = `translate3d(${o}px, ${d}px, 0px)`); const c = s.maxTranslate() - s.minTranslate(); l = 0 === c ? 0 : (e - s.minTranslate()) / c, l !== n && s.updateProgress(e), s.emit("setTranslate", s.translate, t) }, minTranslate: function () { return -this.snapGrid[0] }, maxTranslate: function () { return -this.snapGrid[this.snapGrid.length - 1] }, translateTo: function (e, t, s, a, i) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === a && (a = !0); const r = this, { params: n, wrapperEl: l } = r; if (r.animating && n.preventInteractionOnTransition) return !1; const o = r.minTranslate(), d = r.maxTranslate(); let c; if (c = a && e > o ? o : a && e < d ? d : e, r.updateProgress(c), n.cssMode) { const e = r.isHorizontal(); if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c; else { if (!r.support.smoothScroll) return m({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0; l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" }) } return !0 } return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) { r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd")) }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0 } }; function D(e) { let { swiper: t, runCallbacks: s, direction: a, step: i } = e; const { activeIndex: r, previousIndex: n } = t; let l = a; if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"), t.emit(`transition${i}`), s && r !== n) { if ("reset" === l) return void t.emit(`slideResetTransition${i}`); t.emit(`slideChangeTransition${i}`), "next" === l ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`) } } var G = { slideTo: function (e, t, s, a, i) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10)); const r = this; let n = e; n < 0 && (n = 0); const { params: l, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: h, enabled: f } = r; if (r.animating && l.preventInteractionOnTransition || !f && !a && !i) return !1; const g = Math.min(r.params.slidesPerGroupSkip, n); let v = g + Math.floor((n - g) / r.params.slidesPerGroup); v >= o.length && (v = o.length - 1); const w = -o[v]; if (l.normalizeSlideIndex) for (let e = 0; e < d.length; e += 1) { const t = -Math.floor(100 * w), s = Math.floor(100 * d[e]), a = Math.floor(100 * d[e + 1]); void 0 !== d[e + 1] ? t >= s && t < a - (a - s) / 2 ? n = e : t >= s && t < a && (n = e + 1) : t >= s && (n = e) } if (r.initialized && n !== p) { if (!r.allowSlideNext && (u ? w > r.translate && w > r.minTranslate() : w < r.translate && w < r.minTranslate())) return !1; if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (p || 0) !== n) return !1 } let b; if (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(w), b = n > p ? "next" : n < p ? "prev" : "reset", u && -w === r.translate || !u && w === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(w), "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)), !1; if (l.cssMode) { const e = r.isHorizontal(), s = u ? w : -w; if (0 === t) { const t = r.virtual && r.params.virtual.enabled; t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame((() => { h[e ? "scrollLeft" : "scrollTop"] = s }))) : h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => { r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1 })) } else { if (!r.support.smoothScroll) return m({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0; h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" }) } return !0 } return r.setTransition(t), r.setTranslate(w), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, b), 0 === t ? r.transitionEnd(s, b) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) { r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, b)) }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0 }, slideToLoop: function (e, t, s, a) { if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) { e = parseInt(e, 10) } const i = this; let r = e; return i.params.loop && (i.virtual && i.params.virtual.enabled ? r += i.virtual.slidesBefore : r = i.getSlideIndexByData(r)), i.slideTo(r, t, s, a) }, slideNext: function (e, t, s) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); const a = this, { enabled: i, params: r, animating: n } = a; if (!i) return a; let l = r.slidesPerGroup; "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1)); const o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l, d = a.virtual && r.virtual.enabled; if (r.loop) { if (n && !d && r.loopPreventsSliding) return !1; a.loopFix({ direction: "next" }), a._clientLeft = a.wrapperEl.clientLeft } return r.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s) }, slidePrev: function (e, t, s) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); const a = this, { params: i, snapGrid: r, slidesGrid: n, rtlTranslate: l, enabled: o, animating: d } = a; if (!o) return a; const c = a.virtual && i.virtual.enabled; if (i.loop) { if (d && !c && i.loopPreventsSliding) return !1; a.loopFix({ direction: "prev" }), a._clientLeft = a.wrapperEl.clientLeft } function p(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) } const u = p(l ? a.translate : -a.translate), m = r.map((e => p(e))); let h = r[m.indexOf(u) - 1]; if (void 0 === h && i.cssMode) { let e; r.forEach(((t, s) => { u >= t && (e = s) })), void 0 !== e && (h = r[e > 0 ? e - 1 : e]) } let f = 0; if (void 0 !== h && (f = n.indexOf(h), f < 0 && (f = a.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (f = f - a.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), i.rewind && a.isBeginning) { const i = a.params.virtual && a.params.virtual.enabled && a.virtual ? a.virtual.slides.length - 1 : a.slides.length - 1; return a.slideTo(i, e, t, s) } return a.slideTo(f, e, t, s) }, slideReset: function (e, t, s) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s) }, slideToClosest: function (e, t, s, a) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === a && (a = .5); const i = this; let r = i.activeIndex; const n = Math.min(i.params.slidesPerGroupSkip, r), l = n + Math.floor((r - n) / i.params.slidesPerGroup), o = i.rtlTranslate ? i.translate : -i.translate; if (o >= i.snapGrid[l]) { const e = i.snapGrid[l]; o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup) } else { const e = i.snapGrid[l - 1]; o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup) } return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, s) }, slideToClickedSlide: function () { const e = this, { params: t, slidesEl: s } = e, a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView; let i, r = e.clickedIndex; const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`; if (t.loop) { if (e.animating) return; i = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = e.getSlideIndex(f(s, `${l}[data-swiper-slide-index="${i}"]`)[0]), n((() => { e.slideTo(r) }))) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = e.getSlideIndex(f(s, `${l}[data-swiper-slide-index="${i}"]`)[0]), n((() => { e.slideTo(r) }))) : e.slideTo(r) } else e.slideTo(r) } }; var H = { loopCreate: function (e) { const t = this, { params: s, slidesEl: a } = t; if (!s.loop || t.virtual && t.params.virtual.enabled) return; f(a, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => { e.setAttribute("data-swiper-slide-index", t) })), t.loopFix({ slideRealIndex: e, direction: s.centeredSlides ? void 0 : "next" }) }, loopFix: function (e) { let { slideRealIndex: t, slideTo: s = !0, direction: a, setTranslate: i, activeSlideIndex: r, byController: n, byMousewheel: l } = void 0 === e ? {} : e; const o = this; if (!o.params.loop) return; o.emit("beforeLoopFix"); const { slides: d, allowSlidePrev: c, allowSlideNext: p, slidesEl: u, params: m } = o; if (o.allowSlidePrev = !0, o.allowSlideNext = !0, o.virtual && m.virtual.enabled) return s && (m.centeredSlides || 0 !== o.snapIndex ? m.centeredSlides && o.snapIndex < m.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)), o.allowSlidePrev = c, o.allowSlideNext = p, void o.emit("loopFix"); const h = "auto" === m.slidesPerView ? o.slidesPerViewDynamic() : Math.ceil(parseFloat(m.slidesPerView, 10)); let f = m.loopedSlides || h; f % m.slidesPerGroup != 0 && (f += m.slidesPerGroup - f % m.slidesPerGroup), o.loopedSlides = f; const g = [], v = []; let w = o.activeIndex; void 0 === r ? r = o.getSlideIndex(o.slides.filter((e => e.classList.contains(m.slideActiveClass)))[0]) : w = r; const b = "next" === a || !a, y = "prev" === a || !a; let E = 0, x = 0; if (r < f) { E = Math.max(f - r, m.slidesPerGroup); for (let e = 0; e < f - r; e += 1) { const t = e - Math.floor(e / d.length) * d.length; g.push(d.length - t - 1) } } else if (r > o.slides.length - 2 * f) { x = Math.max(r - (o.slides.length - 2 * f), m.slidesPerGroup); for (let e = 0; e < x; e += 1) { const t = e - Math.floor(e / d.length) * d.length; v.push(t) } } if (y && g.forEach((e => { o.slides[e].swiperLoopMoveDOM = !0, u.prepend(o.slides[e]), o.slides[e].swiperLoopMoveDOM = !1 })), b && v.forEach((e => { o.slides[e].swiperLoopMoveDOM = !0, u.append(o.slides[e]), o.slides[e].swiperLoopMoveDOM = !1 })), o.recalcSlides(), "auto" === m.slidesPerView && o.updateSlides(), m.watchSlidesProgress && o.updateSlidesOffset(), s) if (g.length > 0 && y) if (void 0 === t) { const e = o.slidesGrid[w], t = o.slidesGrid[w + E] - e; l ? o.setTranslate(o.translate - t) : (o.slideTo(w + E, 0, !1, !0), i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t)) } else i && o.slideToLoop(t, 0, !1, !0); else if (v.length > 0 && b) if (void 0 === t) { const e = o.slidesGrid[w], t = o.slidesGrid[w - x] - e; l ? o.setTranslate(o.translate - t) : (o.slideTo(w - x, 0, !1, !0), i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t)) } else o.slideToLoop(t, 0, !1, !0); if (o.allowSlidePrev = c, o.allowSlideNext = p, o.controller && o.controller.control && !n) { const e = { slideRealIndex: t, slideTo: !1, direction: a, setTranslate: i, activeSlideIndex: r, byController: !0 }; Array.isArray(o.controller.control) ? o.controller.control.forEach((t => { !t.destroyed && t.params.loop && t.loopFix(e) })) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix(e) } o.emit("loopFix") }, loopDestroy: function () { const e = this, { params: t, slidesEl: s } = e; if (!t.loop || e.virtual && e.params.virtual.enabled) return; e.recalcSlides(); const a = []; e.slides.forEach((e => { const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex; a[t] = e })), e.slides.forEach((e => { e.removeAttribute("data-swiper-slide-index") })), a.forEach((e => { s.append(e) })), e.recalcSlides(), e.slideTo(e.realIndex, 0) } }; function X(e) { const t = this, s = a(), i = r(), n = t.touchEventsData; n.evCache.push(e); const { params: o, touches: d, enabled: c } = t; if (!c) return; if (!o.simulateTouch && "mouse" === e.pointerType) return; if (t.animating && o.preventInteractionOnTransition) return; !t.animating && o.cssMode && o.loop && t.loopFix(); let p = e; p.originalEvent && (p = p.originalEvent); let u = p.target; if ("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(u)) return; if ("which" in p && 3 === p.which) return; if ("button" in p && p.button > 0) return; if (n.isTouched && n.isMoved) return; const m = !!o.noSwipingClass && "" !== o.noSwipingClass, h = e.composedPath ? e.composedPath() : e.path; m && p.target && p.target.shadowRoot && h && (u = h[0]); const f = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`, g = !(!p.target || !p.target.shadowRoot); if (o.noSwiping && (g ? function (e, t) { return void 0 === t && (t = this), function t(s) { if (!s || s === a() || s === r()) return null; s.assignedSlot && (s = s.assignedSlot); const i = s.closest(e); return i || s.getRootNode ? i || t(s.getRootNode().host) : null }(t) }(f, u) : u.closest(f))) return void (t.allowClick = !0); if (o.swipeHandler && !u.closest(o.swipeHandler)) return; d.currentX = p.pageX, d.currentY = p.pageY; const v = d.currentX, w = d.currentY, b = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection, y = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold; if (b && (v <= y || v >= i.innerWidth - y)) { if ("prevent" !== b) return; e.preventDefault() } Object.assign(n, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), d.startX = v, d.startY = w, n.touchStartTime = l(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, o.threshold > 0 && (n.allowThresholdMove = !1); let E = !0; u.matches(n.focusableElements) && (E = !1, "SELECT" === u.nodeName && (n.isTouched = !1)), s.activeElement && s.activeElement.matches(n.focusableElements) && s.activeElement !== u && s.activeElement.blur(); const x = E && t.allowTouchMove && o.touchStartPreventDefault; !o.touchStartForcePreventDefault && !x || u.isContentEditable || p.preventDefault(), o.freeMode && o.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", p) } function Y(e) { const t = a(), s = this, i = s.touchEventsData, { params: r, touches: n, rtlTranslate: o, enabled: d } = s; if (!d) return; if (!r.simulateTouch && "mouse" === e.pointerType) return; let c = e; if (c.originalEvent && (c = c.originalEvent), !i.isTouched) return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", c)); const p = i.evCache.findIndex((e => e.pointerId === c.pointerId)); p >= 0 && (i.evCache[p] = c); const u = i.evCache.length > 1 ? i.evCache[0] : c, m = u.pageX, h = u.pageY; if (c.preventedByNestedSwiper) return n.startX = m, void (n.startY = h); if (!s.allowTouchMove) return c.target.matches(i.focusableElements) || (s.allowClick = !1), void (i.isTouched && (Object.assign(n, { startX: m, startY: h, prevX: s.touches.currentX, prevY: s.touches.currentY, currentX: m, currentY: h }), i.touchStartTime = l())); if (r.touchReleaseOnEdges && !r.loop) if (s.isVertical()) { if (h < n.startY && s.translate <= s.maxTranslate() || h > n.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1) } else if (m < n.startX && s.translate <= s.maxTranslate() || m > n.startX && s.translate >= s.minTranslate()) return; if (t.activeElement && c.target === t.activeElement && c.target.matches(i.focusableElements)) return i.isMoved = !0, void (s.allowClick = !1); if (i.allowTouchCallbacks && s.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1) return; n.currentX = m, n.currentY = h; const f = n.currentX - n.startX, g = n.currentY - n.startY; if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold) return; if (void 0 === i.isScrolling) { let e; s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : f * f + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(f)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle) } if (i.isScrolling && s.emit("touchMoveOpposite", c), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && i.evCache.length > 1) return void (i.isTouched = !1); if (!i.startMoving) return; s.allowClick = !1, !r.cssMode && c.cancelable && c.preventDefault(), r.touchMoveStopPropagation && !r.nested && c.stopPropagation(); let v = s.isHorizontal() ? f : g, w = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY; r.oneWayMovement && (v = Math.abs(v) * (o ? 1 : -1), w = Math.abs(w) * (o ? 1 : -1)), n.diff = v, v *= r.touchRatio, o && (v = -v, w = -w); const b = s.touchesDirection; s.swipeDirection = v > 0 ? "prev" : "next", s.touchesDirection = w > 0 ? "prev" : "next"; const y = s.params.loop && !r.cssMode; if (!i.isMoved) { if (y && s.loopFix({ direction: s.swipeDirection }), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) { const e = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 }); s.wrapperEl.dispatchEvent(e) } i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", c) } let E; i.isMoved && b !== s.touchesDirection && y && Math.abs(v) >= 1 && (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), E = !0), s.emit("sliderMove", c), i.isMoved = !0, i.currentTranslate = v + i.startTranslate; let x = !0, S = r.resistanceRatio; if (r.touchReleaseOnEdges && (S = 0), v > 0 ? (y && !E && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 }), i.currentTranslate > s.minTranslate() && (x = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + v) ** S))) : v < 0 && (y && !E && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({ direction: "next", setTranslate: !0, activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10))) }), i.currentTranslate < s.maxTranslate() && (x = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - v) ** S))), x && (c.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) { if (!(Math.abs(v) > r.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate); if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void (n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY) } r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate)) } function B(e) { const t = this, s = t.touchEventsData, a = s.evCache.findIndex((t => t.pointerId === e.pointerId)); if (a >= 0 && s.evCache.splice(a, 1), ["pointercancel", "pointerout", "pointerleave"].includes(e.type)) { if (!("pointercancel" === e.type && (t.browser.isSafari || t.browser.isWebView))) return } const { params: i, touches: r, rtlTranslate: o, slidesGrid: d, enabled: c } = t; if (!c) return; if (!i.simulateTouch && "mouse" === e.pointerType) return; let p = e; if (p.originalEvent && (p = p.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", p), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && i.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void (s.startMoving = !1); i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1); const u = l(), m = u - s.touchStartTime; if (t.allowClick) { const e = p.path || p.composedPath && p.composedPath(); t.updateClickedSlide(e && e[0] || p.target), t.emit("tap click", p), m < 300 && u - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", p) } if (s.lastClickTime = l(), n((() => { t.destroyed || (t.allowClick = !0) })), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === r.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void (s.startMoving = !1); let h; if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = i.followFinger ? o ? t.translate : -t.translate : -s.currentTranslate, i.cssMode) return; if (i.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: h }); let f = 0, g = t.slidesSizesGrid[0]; for (let e = 0; e < d.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) { const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup; void 0 !== d[e + t] ? h >= d[e] && h < d[e + t] && (f = e, g = d[e + t] - d[e]) : h >= d[e] && (f = e, g = d[d.length - 1] - d[d.length - 2]) } let v = null, w = null; i.rewind && (t.isBeginning ? w = i.virtual && i.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (v = 0)); const b = (h - d[f]) / g, y = f < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup; if (m > i.longSwipesMs) { if (!i.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && (b >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? v : f + y) : t.slideTo(f)), "prev" === t.swipeDirection && (b > 1 - i.longSwipesRatio ? t.slideTo(f + y) : null !== w && b < 0 && Math.abs(b) > i.longSwipesRatio ? t.slideTo(w) : t.slideTo(f)) } else { if (!i.shortSwipes) return void t.slideTo(t.activeIndex); t.navigation && (p.target === t.navigation.nextEl || p.target === t.navigation.prevEl) ? p.target === t.navigation.nextEl ? t.slideTo(f + y) : t.slideTo(f) : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : f + y), "prev" === t.swipeDirection && t.slideTo(null !== w ? w : f)) } } function N() { const e = this, { params: t, el: s } = e; if (s && 0 === s.offsetWidth) return; t.breakpoints && e.setBreakpoint(); const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e, n = e.virtual && e.params.virtual.enabled; e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(); const l = n && t.loop; !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout((() => { e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume() }), 500)), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow() } function q(e) { const t = this; t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))) } function R() { const e = this, { wrapperEl: t, rtlTranslate: s, enabled: a } = e; if (!a) return; let i; e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses(); const r = e.maxTranslate() - e.minTranslate(); i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1) } function F(e) { const t = this; A(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update() } let _ = !1; function V() { } const j = (e, t) => { const s = a(), { params: i, el: r, wrapperEl: n, device: l } = e, o = !!i.nested, d = "on" === t ? "addEventListener" : "removeEventListener", c = t; r[d]("pointerdown", e.onTouchStart, { passive: !1 }), s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }), s[d]("pointerup", e.onTouchEnd, { passive: !0 }), s[d]("pointercancel", e.onTouchEnd, { passive: !0 }), s[d]("pointerout", e.onTouchEnd, { passive: !0 }), s[d]("pointerleave", e.onTouchEnd, { passive: !0 }), (i.preventClicks || i.preventClicksPropagation) && r[d]("click", e.onClick, !0), i.cssMode && n[d]("scroll", e.onScroll), i.updateOnWindowResize ? e[c](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", N, !0) : e[c]("observerUpdate", N, !0), r[d]("load", e.onLoad, { capture: !0 }) }; const W = (e, t) => e.grid && t.grid && t.grid.rows > 1; var U = { init: !0, direction: "horizontal", oneWayMovement: !1, touchEventsTarget: "wrapper", initialSlide: 0, speed: 300, cssMode: !1, updateOnWindowResize: !0, resizeObserver: !0, nested: !1, createElements: !1, enabled: !0, focusableElements: "input, select, option, textarea, button, video, label", width: null, height: null, preventInteractionOnTransition: !1, userAgent: null, url: null, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsBase: "window", spaceBetween: 0, slidesPerView: 1, slidesPerGroup: 1, slidesPerGroupSkip: 0, slidesPerGroupAuto: !1, centeredSlides: !1, centeredSlidesBounds: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 5, touchMoveStopPropagation: !1, touchStartPreventDefault: !0, touchStartForcePreventDefault: !1, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, loop: !1, loopedSlides: null, loopPreventsSliding: !0, rewind: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, maxBackfaceHiddenSlides: 10, containerModifierClass: "swiper-", slideClass: "swiper-slide", slideActiveClass: "swiper-slide-active", slideVisibleClass: "swiper-slide-visible", slideNextClass: "swiper-slide-next", slidePrevClass: "swiper-slide-prev", wrapperClass: "swiper-wrapper", lazyPreloaderClass: "swiper-lazy-preloader", lazyPreloadPrevNext: 0, runCallbacksOnInit: !0, _emitClasses: !1 }; function K(e, t) { return function (s) { void 0 === s && (s = {}); const a = Object.keys(s)[0], i = s[a]; "object" == typeof i && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = { auto: !0 }), a in e && "enabled" in i ? (!0 === e[a] && (e[a] = { enabled: !0 }), "object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0), e[a] || (e[a] = { enabled: !1 }), p(t, s)) : p(t, s)) : p(t, s) } } const Z = { eventsEmitter: z, update: k, translate: O, transition: { setTransition: function (e, t) { const s = this; s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`), s.emit("setTransition", e, t) }, transitionStart: function (e, t) { void 0 === e && (e = !0); const s = this, { params: a } = s; a.cssMode || (a.autoHeight && s.updateAutoHeight(), D({ swiper: s, runCallbacks: e, direction: t, step: "Start" })) }, transitionEnd: function (e, t) { void 0 === e && (e = !0); const s = this, { params: a } = s; s.animating = !1, a.cssMode || (s.setTransition(0), D({ swiper: s, runCallbacks: e, direction: t, step: "End" })) } }, slide: G, loop: H, grabCursor: { setGrabCursor: function (e) { const t = this; if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return; const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl; t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame((() => { t.__preventObserver__ = !1 })) }, unsetGrabCursor: function () { const e = this; e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame((() => { e.__preventObserver__ = !1 }))) } }, events: { attachEvents: function () { const e = this, t = a(), { params: s } = e; e.onTouchStart = X.bind(e), e.onTouchMove = Y.bind(e), e.onTouchEnd = B.bind(e), s.cssMode && (e.onScroll = R.bind(e)), e.onClick = q.bind(e), e.onLoad = F.bind(e), _ || (t.addEventListener("touchstart", V), _ = !0), j(e, "on") }, detachEvents: function () { j(this, "off") } }, breakpoints: { setBreakpoint: function () { const e = this, { realIndex: t, initialized: s, params: a, el: i } = e, r = a.breakpoints; if (!r || r && 0 === Object.keys(r).length) return; const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el); if (!n || e.currentBreakpoint === n) return; const l = (n in r ? r[n] : void 0) || e.originalParams, o = W(e, a), d = W(e, l), c = a.enabled; o && !d ? (i.classList.remove(`${a.containerModifierClass}grid`, `${a.containerModifierClass}grid-column`), e.emitContainerClasses()) : !o && d && (i.classList.add(`${a.containerModifierClass}grid`), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === a.grid.fill) && i.classList.add(`${a.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => { if (void 0 === l[t]) return; const s = a[t] && a[t].enabled, i = l[t] && l[t].enabled; s && !i && e[t].disable(), !s && i && e[t].enable() })); const u = l.direction && l.direction !== a.direction, m = a.loop && (l.slidesPerView !== a.slidesPerView || u); u && s && e.changeDirection(), p(e.params, l); const h = e.params.enabled; Object.assign(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }), c && !h ? e.disable() : !c && h && e.enable(), e.currentBreakpoint = n, e.emit("_beforeBreakpoint", l), m && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()), e.emit("breakpoint", l) }, getBreakpoint: function (e, t, s) { if (void 0 === t && (t = "window"), !e || "container" === t && !s) return; let a = !1; const i = r(), n = "window" === t ? i.innerHeight : s.clientHeight, l = Object.keys(e).map((e => { if ("string" == typeof e && 0 === e.indexOf("@")) { const t = parseFloat(e.substr(1)); return { value: n * t, point: e } } return { value: e, point: e } })); l.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10))); for (let e = 0; e < l.length; e += 1) { const { point: r, value: n } = l[e]; "window" === t ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r) : n <= s.clientWidth && (a = r) } return a || "max" } }, checkOverflow: { checkOverflow: function () { const e = this, { isLocked: t, params: s } = e, { slidesOffsetBefore: a } = s; if (a) { const t = e.slides.length - 1, s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a; e.isLocked = e.size > s } else e.isLocked = 1 === e.snapGrid.length; !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock") } }, classes: { addClasses: function () { const e = this, { classNames: t, params: s, rtl: a, el: i, device: r } = e, n = function (e, t) { const s = []; return e.forEach((e => { "object" == typeof e ? Object.keys(e).forEach((a => { e[a] && s.push(t + a) })) : "string" == typeof e && s.push(t + e) })), s }(["initialized", s.direction, { "free-mode": e.params.freeMode && s.freeMode.enabled }, { autoheight: s.autoHeight }, { rtl: a }, { grid: s.grid && s.grid.rows > 1 }, { "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill }, { android: r.android }, { ios: r.ios }, { "css-mode": s.cssMode }, { centered: s.cssMode && s.centeredSlides }, { "watch-progress": s.watchSlidesProgress }], s.containerModifierClass); t.push(...n), i.classList.add(...t), e.emitContainerClasses() }, removeClasses: function () { const { el: e, classNames: t } = this; e.classList.remove(...t), this.emitContainerClasses() } } }, Q = {}; class J { constructor() { let e, t; for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)i[r] = arguments[r]; 1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = p({}, t), e && !t.el && (t.el = e); const n = a(); if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) { const e = []; return n.querySelectorAll(t.el).forEach((s => { const a = p({}, t, { el: s }); e.push(new J(a)) })), e } const l = this; l.__swiper__ = !0, l.support = C(), l.device = P({ userAgent: t.userAgent }), l.browser = L(), l.eventsListeners = {}, l.eventsAnyListeners = [], l.modules = [...l.__modules__], t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules); const o = {}; l.modules.forEach((e => { e({ params: t, swiper: l, extendParams: K(t, o), on: l.on.bind(l), once: l.once.bind(l), off: l.off.bind(l), emit: l.emit.bind(l) }) })); const d = p({}, U, o); return l.params = p({}, d, Q, t), l.originalParams = p({}, l.params), l.passedParams = p({}, t), l.params && l.params.on && Object.keys(l.params.on).forEach((e => { l.on(e, l.params.on[e]) })), l.params && l.params.onAny && l.onAny(l.params.onAny), Object.assign(l, { enabled: l.params.enabled, el: e, classNames: [], slides: [], slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: () => "horizontal" === l.params.direction, isVertical: () => "vertical" === l.params.direction, activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, cssOverflowAdjustment() { return Math.trunc(this.translate / 2 ** 23) * 2 ** 23 }, allowSlideNext: l.params.allowSlideNext, allowSlidePrev: l.params.allowSlidePrev, touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, focusableElements: l.params.focusableElements, lastClickTime: 0, clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, startMoving: void 0, evCache: [] }, allowClick: !0, allowTouchMove: l.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), l.emit("_swiper"), l.params.init && l.init(), l } getSlideIndex(e) { const { slidesEl: t, params: s } = this, a = b(f(t, `.${s.slideClass}, swiper-slide`)[0]); return b(e) - a } getSlideIndexByData(e) { return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0]) } recalcSlides() { const { slidesEl: e, params: t } = this; this.slides = f(e, `.${t.slideClass}, swiper-slide`) } enable() { const e = this; e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable")) } disable() { const e = this; e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable")) } setProgress(e, t) { const s = this; e = Math.min(Math.max(e, 0), 1); const a = s.minTranslate(), i = (s.maxTranslate() - a) * e + a; s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses() } emitContainerClasses() { const e = this; if (!e.params._emitClasses || !e.el) return; const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass))); e.emit("_containerClasses", t.join(" ")) } getSlideClasses(e) { const t = this; return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ") } emitSlidesClasses() { const e = this; if (!e.params._emitClasses || !e.el) return; const t = []; e.slides.forEach((s => { const a = e.getSlideClasses(s); t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a) })), e.emit("_slideClasses", t) } slidesPerViewDynamic(e, t) { void 0 === e && (e = "current"), void 0 === t && (t = !1); const { params: s, slides: a, slidesGrid: i, slidesSizesGrid: r, size: n, activeIndex: l } = this; let o = 1; if (s.centeredSlides) { let e, t = a[l] ? a[l].swiperSlideSize : 0; for (let s = l + 1; s < a.length; s += 1)a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0)); for (let s = l - 1; s >= 0; s -= 1)a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0)) } else if ("current" === e) for (let e = l + 1; e < a.length; e += 1) { (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1) } else for (let e = l - 1; e >= 0; e -= 1) { i[l] - i[e] < n && (o += 1) } return o } update() { const e = this; if (!e || e.destroyed) return; const { snapGrid: t, params: s } = e; function a() { const t = e.rtlTranslate ? -1 * e.translate : e.translate, s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate()); e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses() } let i; if (s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => { t.complete && A(e, t) })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), s.freeMode && s.freeMode.enabled && !s.cssMode) a(), s.autoHeight && e.updateAutoHeight(); else { if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) { const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides; i = e.slideTo(t.length - 1, 0, !1, !0) } else i = e.slideTo(e.activeIndex, 0, !1, !0); i || a() } s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update") } changeDirection(e, t) { void 0 === t && (t = !0); const s = this, a = s.params.direction; return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${a}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((t => { "vertical" === e ? t.style.width = "" : t.style.height = "" })), s.emit("changeDirection"), t && s.update()), s } changeLanguageDirection(e) { const t = this; t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update()) } mount(e) { const t = this; if (t.mounted) return !0; let s = e || t.params.el; if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1; s.swiper = t, s.shadowEl && (t.isElement = !0); const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`; let i = (() => { if (s && s.shadowRoot && s.shadowRoot.querySelector) { return s.shadowRoot.querySelector(a()) } return f(s, a())[0] })(); return !i && t.params.createElements && (i = g("div", t.params.wrapperClass), s.append(i), f(s, `.${t.params.slideClass}`).forEach((e => { i.append(e) }))), Object.assign(t, { el: s, wrapperEl: i, slidesEl: t.isElement ? s : i, mounted: !0, rtl: "rtl" === s.dir.toLowerCase() || "rtl" === w(s, "direction"), rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === w(s, "direction")), wrongRTL: "-webkit-box" === w(i, "display") }), !0 } init(e) { const t = this; if (t.initialized) return t; return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e => { e.complete ? A(t, e) : e.addEventListener("load", (e => { A(t, e.target) })) })), I(t), t.initialized = !0, I(t), t.emit("init"), t.emit("afterInit")), t } destroy(e, t) { void 0 === e && (e = !0), void 0 === t && (t = !0); const s = this, { params: a, el: i, wrapperEl: r, slides: n } = s; return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttribute("style"), r.removeAttribute("style"), n && n.length && n.forEach((e => { e.classList.remove(a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index") }))), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => { s.off(e) })), !1 !== e && (s.el.swiper = null, function (e) { const t = e; Object.keys(t).forEach((e => { try { t[e] = null } catch (e) { } try { delete t[e] } catch (e) { } })) }(s)), s.destroyed = !0), null } static extendDefaults(e) { p(Q, e) } static get extendedDefaults() { return Q } static get defaults() { return U } static installModule(e) { J.prototype.__modules__ || (J.prototype.__modules__ = []); const t = J.prototype.__modules__; "function" == typeof e && t.indexOf(e) < 0 && t.push(e) } static use(e) { return Array.isArray(e) ? (e.forEach((e => J.installModule(e))), J) : (J.installModule(e), J) } } function ee(e, t, s, a) { return e.params.createElements && Object.keys(a).forEach((i => { if (!s[i] && !0 === s.auto) { let r = f(e.el, `.${a[i]}`)[0]; r || (r = g("div", a[i]), r.className = a[i], e.el.append(r)), s[i] = r, t[i] = r } })), s } function te(e) { return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}` } function se(e) { const t = this, { params: s, slidesEl: a } = t; s.loop && t.loopDestroy(); const i = e => { if ("string" == typeof e) { const t = document.createElement("div"); t.innerHTML = e, a.append(t.children[0]), t.innerHTML = "" } else a.append(e) }; if ("object" == typeof e && "length" in e) for (let t = 0; t < e.length; t += 1)e[t] && i(e[t]); else i(e); t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update() } function ae(e) { const t = this, { params: s, activeIndex: a, slidesEl: i } = t; s.loop && t.loopDestroy(); let r = a + 1; const n = e => { if ("string" == typeof e) { const t = document.createElement("div"); t.innerHTML = e, i.prepend(t.children[0]), t.innerHTML = "" } else i.prepend(e) }; if ("object" == typeof e && "length" in e) { for (let t = 0; t < e.length; t += 1)e[t] && n(e[t]); r = a + e.length } else n(e); t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), t.slideTo(r, 0, !1) } function ie(e, t) { const s = this, { params: a, activeIndex: i, slidesEl: r } = s; let n = i; a.loop && (n -= s.loopedSlides, s.loopDestroy(), s.recalcSlides()); const l = s.slides.length; if (e <= 0) return void s.prependSlide(t); if (e >= l) return void s.appendSlide(t); let o = n > e ? n + 1 : n; const d = []; for (let t = l - 1; t >= e; t -= 1) { const e = s.slides[t]; e.remove(), d.unshift(e) } if ("object" == typeof t && "length" in t) { for (let e = 0; e < t.length; e += 1)t[e] && r.append(t[e]); o = n > e ? n + t.length : n } else r.append(t); for (let e = 0; e < d.length; e += 1)r.append(d[e]); s.recalcSlides(), a.loop && s.loopCreate(), a.observer && !s.isElement || s.update(), a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1) } function re(e) { const t = this, { params: s, activeIndex: a } = t; let i = a; s.loop && (i -= t.loopedSlides, t.loopDestroy()); let r, n = i; if ("object" == typeof e && "length" in e) { for (let s = 0; s < e.length; s += 1)r = e[s], t.slides[r] && t.slides[r].remove(), r < n && (n -= 1); n = Math.max(n, 0) } else r = e, t.slides[r] && t.slides[r].remove(), r < n && (n -= 1), n = Math.max(n, 0); t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1) } function ne() { const e = this, t = []; for (let s = 0; s < e.slides.length; s += 1)t.push(s); e.removeSlide(t) } function le(e) { const { effect: t, swiper: s, on: a, setTranslate: i, setTransition: r, overwriteParams: n, perspective: l, recreateShadows: o, getEffectParams: d } = e; let c; a("beforeInit", (() => { if (s.params.effect !== t) return; s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`); const e = n ? n() : {}; Object.assign(s.params, e), Object.assign(s.originalParams, e) })), a("setTranslate", (() => { s.params.effect === t && i() })), a("setTransition", ((e, a) => { s.params.effect === t && r(a) })), a("transitionEnd", (() => { if (s.params.effect === t && o) { if (!d || !d().slideShadows) return; s.slides.forEach((e => { e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e => e.remove())) })), o() } })), a("virtualUpdate", (() => { s.params.effect === t && (s.slides.length || (c = !0), requestAnimationFrame((() => { c && s.slides && s.slides.length && (i(), c = !1) }))) })) } function oe(e, t) { const s = h(t); return s !== t && (s.style.backfaceVisibility = "hidden", s.style["-webkit-backface-visibility"] = "hidden"), s } function de(e) { let { swiper: t, duration: s, transformElements: a, allSlides: i } = e; const { activeIndex: r } = t; if (t.params.virtualTranslate && 0 !== s) { let e, s = !1; e = i ? a : a.filter((e => { const s = e.classList.contains("swiper-slide-transform") ? (e => { if (!e.parentElement) return t.slides.filter((t => t.shadowEl && t.shadowEl === e.parentNode))[0]; return e.parentElement })(e) : e; return t.getSlideIndex(s) === r })), e.forEach((e => { E(e, (() => { if (s) return; if (!t || t.destroyed) return; s = !0, t.animating = !1; const e = new window.CustomEvent("transitionend", { bubbles: !0, cancelable: !0 }); t.wrapperEl.dispatchEvent(e) })) })) } } function ce(e, t, s) { const a = "swiper-slide-shadow" + (s ? `-${s}` : ""), i = h(t); let r = i.querySelector(`.${a}`); return r || (r = g("div", "swiper-slide-shadow" + (s ? `-${s}` : "")), i.append(r)), r } Object.keys(Z).forEach((e => { Object.keys(Z[e]).forEach((t => { J.prototype[t] = Z[e][t] })) })), J.use([function (e) { let { swiper: t, on: s, emit: a } = e; const i = r(); let n = null, l = null; const o = () => { t && !t.destroyed && t.initialized && (a("beforeResize"), a("resize")) }, d = () => { t && !t.destroyed && t.initialized && a("orientationchange") }; s("init", (() => { t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e => { l = i.requestAnimationFrame((() => { const { width: s, height: a } = t; let i = s, r = a; e.forEach((e => { let { contentBoxSize: s, contentRect: a, target: n } = e; n && n !== t.el || (i = a ? a.width : (s[0] || s).inlineSize, r = a ? a.height : (s[0] || s).blockSize) })), i === s && r === a || o() })) })), n.observe(t.el)) : (i.addEventListener("resize", o), i.addEventListener("orientationchange", d)) })), s("destroy", (() => { l && i.cancelAnimationFrame(l), n && n.unobserve && t.el && (n.unobserve(t.el), n = null), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", d) })) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const n = [], l = r(), o = function (e, s) { void 0 === s && (s = {}); const a = new (l.MutationObserver || l.WebkitMutationObserver)((e => { if (t.__preventObserver__) return; if (1 === e.length) return void i("observerUpdate", e[0]); const s = function () { i("observerUpdate", e[0]) }; l.requestAnimationFrame ? l.requestAnimationFrame(s) : l.setTimeout(s, 0) })); a.observe(e, { attributes: void 0 === s.attributes || s.attributes, childList: void 0 === s.childList || s.childList, characterData: void 0 === s.characterData || s.characterData }), n.push(a) }; s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }), a("init", (() => { if (t.params.observer) { if (t.params.observeParents) { const e = y(t.el); for (let t = 0; t < e.length; t += 1)o(e[t]) } o(t.el, { childList: t.params.observeSlideChildren }), o(t.wrapperEl, { attributes: !1 }) } })), a("destroy", (() => { n.forEach((e => { e.disconnect() })), n.splice(0, n.length) })) }]); const pe = [function (e) { let t, { swiper: s, extendParams: i, on: r, emit: n } = e; i({ virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, renderExternalUpdate: !0, addSlidesBefore: 0, addSlidesAfter: 0 } }); const l = a(); s.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }; const o = l.createElement("div"); function d(e, t) { const a = s.params.virtual; if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t]; let i; return a.renderSlide ? (i = a.renderSlide.call(s, e, t), "string" == typeof i && (o.innerHTML = i, i = o.children[0])) : i = s.isElement ? g("swiper-slide") : g("div", s.params.slideClass), i.setAttribute("data-swiper-slide-index", t), a.renderSlide || (i.innerHTML = e), a.cache && (s.virtual.cache[t] = i), i } function c(e) { const { slidesPerView: t, slidesPerGroup: a, centeredSlides: i, loop: r } = s.params, { addSlidesBefore: l, addSlidesAfter: o } = s.params.virtual, { from: c, to: p, slides: u, slidesGrid: m, offset: h } = s.virtual; s.params.cssMode || s.updateActiveIndex(); const g = s.activeIndex || 0; let v, w, b; v = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top", i ? (w = Math.floor(t / 2) + a + o, b = Math.floor(t / 2) + a + l) : (w = t + (a - 1) + o, b = (r ? t : a) + l); let y = g - b, E = g + w; r || (y = Math.max(y, 0), E = Math.min(E, u.length - 1)); let x = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0); function S() { s.updateSlides(), s.updateProgress(), s.updateSlidesClasses(), n("virtualUpdate") } if (r && g >= b ? (y -= b, i || (x += s.slidesGrid[0])) : r && g < b && (y = -b, i && (x += s.slidesGrid[0])), Object.assign(s.virtual, { from: y, to: E, offset: x, slidesGrid: s.slidesGrid, slidesBefore: b, slidesAfter: w }), c === y && p === E && !e) return s.slidesGrid !== m && x !== h && s.slides.forEach((e => { e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px" })), s.updateProgress(), void n("virtualUpdate"); if (s.params.virtual.renderExternal) return s.params.virtual.renderExternal.call(s, { offset: x, from: y, to: E, slides: function () { const e = []; for (let t = y; t <= E; t += 1)e.push(u[t]); return e }() }), void (s.params.virtual.renderExternalUpdate ? S() : n("virtualUpdate")); const T = [], M = [], C = e => { let t = e; return e < 0 ? t = u.length + e : t >= u.length && (t -= u.length), t }; if (e) s.slidesEl.querySelectorAll(`.${s.params.slideClass}, swiper-slide`).forEach((e => { e.remove() })); else for (let e = c; e <= p; e += 1)if (e < y || e > E) { const t = C(e); s.slidesEl.querySelectorAll(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`).forEach((e => { e.remove() })) } const P = r ? -u.length : 0, L = r ? 2 * u.length : u.length; for (let t = P; t < L; t += 1)if (t >= y && t <= E) { const s = C(t); void 0 === p || e ? M.push(s) : (t > p && M.push(s), t < c && T.push(s)) } if (M.forEach((e => { s.slidesEl.append(d(u[e], e)) })), r) for (let e = T.length - 1; e >= 0; e -= 1) { const t = T[e]; s.slidesEl.prepend(d(u[t], t)) } else T.sort(((e, t) => t - e)), T.forEach((e => { s.slidesEl.prepend(d(u[e], e)) })); f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e => { e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px" })), S() } r("beforeInit", (() => { if (!s.params.virtual.enabled) return; let e; if (void 0 === s.passedParams.virtual.slides) { const t = [...s.slidesEl.children].filter((e => e.matches(`.${s.params.slideClass}, swiper-slide`))); t && t.length && (s.virtual.slides = [...t], e = !0, t.forEach(((e, t) => { e.setAttribute("data-swiper-slide-index", t), s.virtual.cache[t] = e, e.remove() }))) } e || (s.virtual.slides = s.params.virtual.slides), s.classNames.push(`${s.params.containerModifierClass}virtual`), s.params.watchSlidesProgress = !0, s.originalParams.watchSlidesProgress = !0, s.params.initialSlide || c() })), r("setTranslate", (() => { s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t), t = setTimeout((() => { c() }), 100)) : c()) })), r("init update resize", (() => { s.params.virtual.enabled && s.params.cssMode && u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`) })), Object.assign(s.virtual, { appendSlide: function (e) { if ("object" == typeof e && "length" in e) for (let t = 0; t < e.length; t += 1)e[t] && s.virtual.slides.push(e[t]); else s.virtual.slides.push(e); c(!0) }, prependSlide: function (e) { const t = s.activeIndex; let a = t + 1, i = 1; if (Array.isArray(e)) { for (let t = 0; t < e.length; t += 1)e[t] && s.virtual.slides.unshift(e[t]); a = t + e.length, i = e.length } else s.virtual.slides.unshift(e); if (s.params.virtual.cache) { const e = s.virtual.cache, t = {}; Object.keys(e).forEach((s => { const a = e[s], r = a.getAttribute("data-swiper-slide-index"); r && a.setAttribute("data-swiper-slide-index", parseInt(r, 10) + i), t[parseInt(s, 10) + i] = a })), s.virtual.cache = t } c(!0), s.slideTo(a, 0) }, removeSlide: function (e) { if (null == e) return; let t = s.activeIndex; if (Array.isArray(e)) for (let a = e.length - 1; a >= 0; a -= 1)s.virtual.slides.splice(e[a], 1), s.params.virtual.cache && delete s.virtual.cache[e[a]], e[a] < t && (t -= 1), t = Math.max(t, 0); else s.virtual.slides.splice(e, 1), s.params.virtual.cache && delete s.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0); c(!0), s.slideTo(t, 0) }, removeAllSlides: function () { s.virtual.slides = [], s.params.virtual.cache && (s.virtual.cache = {}), c(!0), s.slideTo(0, 0) }, update: c }) }, function (e) { let { swiper: t, extendParams: s, on: i, emit: n } = e; const l = a(), o = r(); function d(e) { if (!t.enabled) return; const { rtlTranslate: s } = t; let a = e; a.originalEvent && (a = a.originalEvent); const i = a.keyCode || a.charCode, r = t.params.keyboard.pageUpDown, d = r && 33 === i, c = r && 34 === i, p = 37 === i, u = 39 === i, m = 38 === i, h = 40 === i; if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && h || c)) return !1; if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && m || d)) return !1; if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) { if (t.params.keyboard.onlyInViewport && (d || c || p || u || m || h)) { let e = !1; if (y(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 && 0 === y(t.el, `.${t.params.slideActiveClass}`).length) return; const a = t.el, i = a.clientWidth, r = a.clientHeight, n = o.innerWidth, l = o.innerHeight, d = v(a); s && (d.left -= a.scrollLeft); const c = [[d.left, d.top], [d.left + i, d.top], [d.left, d.top + r], [d.left + i, d.top + r]]; for (let t = 0; t < c.length; t += 1) { const s = c[t]; if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) { if (0 === s[0] && 0 === s[1]) continue; e = !0 } } if (!e) return } t.isHorizontal() ? ((d || c || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((c || u) && !s || (d || p) && s) && t.slideNext(), ((d || p) && !s || (c || u) && s) && t.slidePrev()) : ((d || c || m || h) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (c || h) && t.slideNext(), (d || m) && t.slidePrev()), n("keyPress", i) } } function c() { t.keyboard.enabled || (l.addEventListener("keydown", d), t.keyboard.enabled = !0) } function p() { t.keyboard.enabled && (l.removeEventListener("keydown", d), t.keyboard.enabled = !1) } t.keyboard = { enabled: !1 }, s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }), i("init", (() => { t.params.keyboard.enabled && c() })), i("destroy", (() => { t.keyboard.enabled && p() })), Object.assign(t.keyboard, { enable: c, disable: p }) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const o = r(); let d; s({ mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarget: "container", thresholdDelta: null, thresholdTime: null, noMousewheelClass: "swiper-no-mousewheel" } }), t.mousewheel = { enabled: !1 }; let c, p = l(); const u = []; function m() { t.enabled && (t.mouseEntered = !0) } function h() { t.enabled && (t.mouseEntered = !1) } function f(e) { return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && (!(t.params.mousewheel.thresholdTime && l() - p < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && l() - p < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), i("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), i("scroll", e.raw)), p = (new o.Date).getTime(), !1))) } function g(e) { let s = e, a = !0; if (!t.enabled) return; if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`)) return; const r = t.params.mousewheel; t.params.cssMode && s.preventDefault(); let o = t.el; "container" !== t.params.mousewheel.eventsTarget && (o = document.querySelector(t.params.mousewheel.eventsTarget)); const p = o && o.contains(s.target); if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0; s.originalEvent && (s = s.originalEvent); let m = 0; const h = t.rtlTranslate ? -1 : 1, g = function (e) { let t = 0, s = 0, a = 0, i = 0; return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), a = 10 * t, i = 10 * s, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = i, i = 0), (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, i *= 40) : (a *= 800, i *= 800)), a && !t && (t = a < 1 ? -1 : 1), i && !s && (s = i < 1 ? -1 : 1), { spinX: t, spinY: s, pixelX: a, pixelY: i } }(s); if (r.forceToAxis) if (t.isHorizontal()) { if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0; m = -g.pixelX * h } else { if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0; m = -g.pixelY } else m = Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY; if (0 === m) return !0; r.invert && (m = -m); let v = t.getTranslate() + m * r.sensitivity; if (v >= t.minTranslate() && (v = t.minTranslate()), v <= t.maxTranslate() && (v = t.maxTranslate()), a = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()), a && t.params.nested && s.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) { const e = { time: l(), delta: Math.abs(m), direction: Math.sign(m) }, a = c && e.time < c.time + 500 && e.delta <= c.delta && e.direction === c.direction; if (!a) { c = void 0; let l = t.getTranslate() + m * r.sensitivity; const o = t.isBeginning, p = t.isEnd; if (l >= t.minTranslate() && (l = t.minTranslate()), l <= t.maxTranslate() && (l = t.maxTranslate()), t.setTransition(0), t.setTranslate(l), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!o && t.isBeginning || !p && t.isEnd) && t.updateSlidesClasses(), t.params.loop && t.loopFix({ direction: e.direction < 0 ? "next" : "prev", byMousewheel: !0 }), t.params.freeMode.sticky) { clearTimeout(d), d = void 0, u.length >= 15 && u.shift(); const s = u.length ? u[u.length - 1] : void 0, a = u[0]; if (u.push(e), s && (e.delta > s.delta || e.direction !== s.direction)) u.splice(0); else if (u.length >= 15 && e.time - a.time < 500 && a.delta - e.delta >= 1 && e.delta <= 6) { const s = m > 0 ? .8 : .2; c = e, u.splice(0), d = n((() => { t.slideToClosest(t.params.speed, !0, void 0, s) }), 0) } d || (d = n((() => { c = e, u.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5) }), 500)) } if (a || i("scroll", s), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), l === t.minTranslate() || l === t.maxTranslate()) return !0 } } else { const s = { time: l(), delta: Math.abs(m), direction: Math.sign(m), raw: e }; u.length >= 2 && u.shift(); const a = u.length ? u[u.length - 1] : void 0; if (u.push(s), a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && f(s) : f(s), function (e) { const s = t.params.mousewheel; if (e.direction < 0) { if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0 } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges) return !0; return !1 }(s)) return !0 } return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1 } function v(e) { let s = t.el; "container" !== t.params.mousewheel.eventsTarget && (s = document.querySelector(t.params.mousewheel.eventsTarget)), s[e]("mouseenter", m), s[e]("mouseleave", h), s[e]("wheel", g) } function w() { return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", g), !0) : !t.mousewheel.enabled && (v("addEventListener"), t.mousewheel.enabled = !0, !0) } function b() { return t.params.cssMode ? (t.wrapperEl.addEventListener(event, g), !0) : !!t.mousewheel.enabled && (v("removeEventListener"), t.mousewheel.enabled = !1, !0) } a("init", (() => { !t.params.mousewheel.enabled && t.params.cssMode && b(), t.params.mousewheel.enabled && w() })), a("destroy", (() => { t.params.cssMode && w(), t.mousewheel.enabled && b() })), Object.assign(t.mousewheel, { enable: w, disable: b }) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; s({ navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock", navigationDisabledClass: "swiper-navigation-disabled" } }), t.navigation = { nextEl: null, prevEl: null }; const r = e => (Array.isArray(e) || (e = [e].filter((e => !!e))), e); function n(e) { let s; return e && "string" == typeof e && t.isElement && (s = t.el.shadowRoot.querySelector(e), s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))), e && !s ? e : s) } function l(e, s) { const a = t.params.navigation; (e = r(e)).forEach((e => { e && (e.classList[s ? "add" : "remove"](...a.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = s), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](a.lockClass)) })) } function o() { const { nextEl: e, prevEl: s } = t.navigation; if (t.params.loop) return l(s, !1), void l(e, !1); l(s, t.isBeginning && !t.params.rewind), l(e, t.isEnd && !t.params.rewind) } function d(e) { e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), i("navigationPrev")) } function c(e) { e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), i("navigationNext")) } function p() { const e = t.params.navigation; if (t.params.navigation = ee(t, t.originalParams.navigation, t.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }), !e.nextEl && !e.prevEl) return; let s = n(e.nextEl), a = n(e.prevEl); Object.assign(t.navigation, { nextEl: s, prevEl: a }), s = r(s), a = r(a); const i = (s, a) => { s && s.addEventListener("click", "next" === a ? c : d), !t.enabled && s && s.classList.add(...e.lockClass.split(" ")) }; s.forEach((e => i(e, "next"))), a.forEach((e => i(e, "prev"))) } function u() { let { nextEl: e, prevEl: s } = t.navigation; e = r(e), s = r(s); const a = (e, s) => { e.removeEventListener("click", "next" === s ? c : d), e.classList.remove(...t.params.navigation.disabledClass.split(" ")) }; e.forEach((e => a(e, "next"))), s.forEach((e => a(e, "prev"))) } a("init", (() => { !1 === t.params.navigation.enabled ? m() : (p(), o()) })), a("toEdge fromEdge lock unlock", (() => { o() })), a("destroy", (() => { u() })), a("enable disable", (() => { let { nextEl: e, prevEl: s } = t.navigation; e = r(e), s = r(s), [...e, ...s].filter((e => !!e)).forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.navigation.lockClass))) })), a("click", ((e, s) => { let { nextEl: a, prevEl: n } = t.navigation; a = r(a), n = r(n); const l = s.target; if (t.params.navigation.hideOnClick && !n.includes(l) && !a.includes(l)) { if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l))) return; let e; a.length ? e = a[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (e = n[0].classList.contains(t.params.navigation.hiddenClass)), i(!0 === e ? "navigationShow" : "navigationHide"), [...a, ...n].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass))) } })); const m = () => { t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), u() }; Object.assign(t.navigation, { enable: () => { t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), p(), o() }, disable: m, update: o, init: p, destroy: u }) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const r = "swiper-pagination"; let n; s({ pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: e => e, formatFractionTotal: e => e, bulletClass: `${r}-bullet`, bulletActiveClass: `${r}-bullet-active`, modifierClass: `${r}-`, currentClass: `${r}-current`, totalClass: `${r}-total`, hiddenClass: `${r}-hidden`, progressbarFillClass: `${r}-progressbar-fill`, progressbarOppositeClass: `${r}-progressbar-opposite`, clickableClass: `${r}-clickable`, lockClass: `${r}-lock`, horizontalClass: `${r}-horizontal`, verticalClass: `${r}-vertical`, paginationDisabledClass: `${r}-disabled` } }), t.pagination = { el: null, bullets: [] }; let l = 0; const o = e => (Array.isArray(e) || (e = [e].filter((e => !!e))), e); function d() { return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length } function c(e, s) { const { bulletActiveClass: a } = t.params.pagination; e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${a}-${s}`), (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${a}-${s}-${s}`)) } function p(e) { const s = e.target.closest(te(t.params.pagination.bulletClass)); if (!s) return; e.preventDefault(); const a = b(s) * t.params.slidesPerGroup; if (t.params.loop) { if (t.realIndex === a) return; const e = t.getSlideIndexByData(a), s = t.getSlideIndexByData(t.realIndex); e > t.slides.length - t.loopedSlides && t.loopFix({ direction: e > s ? "next" : "prev", activeSlideIndex: e, slideTo: !1 }), t.slideToLoop(a) } else t.slideTo(a) } function u() { const e = t.rtl, s = t.params.pagination; if (d()) return; let a, r, p = t.pagination.el; p = o(p); const u = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length, m = t.params.loop ? Math.ceil(u / t.params.slidesPerGroup) : t.snapGrid.length; if (t.params.loop ? (r = t.previousRealIndex || 0, a = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (a = t.snapIndex, r = t.previousSnapIndex) : (r = t.previousIndex || 0, a = t.activeIndex || 0), "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) { const i = t.pagination.bullets; let o, d, u; if (s.dynamicBullets && (n = x(i[0], t.isHorizontal() ? "width" : "height", !0), p.forEach((e => { e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px" })), s.dynamicMainBullets > 1 && void 0 !== r && (l += a - (r || 0), l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)), o = Math.max(a - l, 0), d = o + (Math.min(i.length, s.dynamicMainBullets) - 1), u = (d + o) / 2), i.forEach((e => { const t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${s.bulletActiveClass}${e}`))].map((e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat(); e.classList.remove(...t) })), p.length > 1) i.forEach((e => { const i = b(e); i === a ? e.classList.add(...s.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"), s.dynamicBullets && (i >= o && i <= d && e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")), i === o && c(e, "prev"), i === d && c(e, "next")) })); else { const e = i[a]; if (e && e.classList.add(...s.bulletActiveClass.split(" ")), t.isElement && i.forEach(((e, t) => { e.setAttribute("part", t === a ? "bullet-active" : "bullet") })), s.dynamicBullets) { const e = i[o], t = i[d]; for (let e = o; e <= d; e += 1)i[e] && i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" ")); c(e, "prev"), c(t, "next") } } if (s.dynamicBullets) { const a = Math.min(i.length, s.dynamicMainBullets + 4), r = (n * a - n) / 2 - u * n, l = e ? "right" : "left"; i.forEach((e => { e.style[t.isHorizontal() ? l : "top"] = `${r}px` })) } } p.forEach(((e, r) => { if ("fraction" === s.type && (e.querySelectorAll(te(s.currentClass)).forEach((e => { e.textContent = s.formatFractionCurrent(a + 1) })), e.querySelectorAll(te(s.totalClass)).forEach((e => { e.textContent = s.formatFractionTotal(m) }))), "progressbar" === s.type) { let i; i = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical"; const r = (a + 1) / m; let n = 1, l = 1; "horizontal" === i ? n = r : l = r, e.querySelectorAll(te(s.progressbarFillClass)).forEach((e => { e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`, e.style.transitionDuration = `${t.params.speed}ms` })) } "custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, a + 1, m), 0 === r && i("paginationRender", e)) : (0 === r && i("paginationRender", e), i("paginationUpdate", e)), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass) })) } function m() { const e = t.params.pagination; if (d()) return; const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length; let a = t.pagination.el; a = o(a); let r = ""; if ("bullets" === e.type) { let a = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length; t.params.freeMode && t.params.freeMode.enabled && a > s && (a = s); for (let s = 0; s < a; s += 1)e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>` } "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), t.pagination.bullets = [], a.forEach((s => { "custom" !== e.type && (s.innerHTML = r || ""), "bullets" === e.type && t.pagination.bullets.push(...s.querySelectorAll(te(e.bulletClass))) })), "custom" !== e.type && i("paginationRender", a[0]) } function h() { t.params.pagination = ee(t, t.originalParams.pagination, t.params.pagination, { el: "swiper-pagination" }); const e = t.params.pagination; if (!e.el) return; let s; "string" == typeof e.el && t.isElement && (s = t.el.shadowRoot.querySelector(e.el)), s || "string" != typeof e.el || (s = [...document.querySelectorAll(e.el)]), s || (s = e.el), s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = [...t.el.querySelectorAll(e.el)], s.length > 1 && (s = s.filter((e => y(e, ".swiper")[0] === t.el))[0])), Array.isArray(s) && 1 === s.length && (s = s[0]), Object.assign(t.pagination, { el: s }), s = o(s), s.forEach((s => { "bullets" === e.type && e.clickable && s.classList.add(e.clickableClass), s.classList.add(e.modifierClass + e.type), s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (s.classList.add(`${e.modifierClass}${e.type}-dynamic`), l = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass), e.clickable && s.addEventListener("click", p), t.enabled || s.classList.add(e.lockClass) }))) } function f() { const e = t.params.pagination; if (d()) return; let s = t.pagination.el; s && (s = o(s), s.forEach((s => { s.classList.remove(e.hiddenClass), s.classList.remove(e.modifierClass + e.type), s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && s.removeEventListener("click", p) }))), t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(...e.bulletActiveClass.split(" ")))) } a("changeDirection", (() => { if (!t.pagination || !t.pagination.el) return; const e = t.params.pagination; let { el: s } = t.pagination; s = o(s), s.forEach((s => { s.classList.remove(e.horizontalClass, e.verticalClass), s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass) })) })), a("init", (() => { !1 === t.params.pagination.enabled ? g() : (h(), m(), u()) })), a("activeIndexChange", (() => { void 0 === t.snapIndex && u() })), a("snapIndexChange", (() => { u() })), a("snapGridLengthChange", (() => { m(), u() })), a("destroy", (() => { f() })), a("enable disable", (() => { let { el: e } = t.pagination; e && (e = o(e), e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass)))) })), a("lock unlock", (() => { u() })), a("click", ((e, s) => { const a = s.target; let { el: r } = t.pagination; if (Array.isArray(r) || (r = [r].filter((e => !!e))), t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !a.classList.contains(t.params.pagination.bulletClass)) { if (t.navigation && (t.navigation.nextEl && a === t.navigation.nextEl || t.navigation.prevEl && a === t.navigation.prevEl)) return; const e = r[0].classList.contains(t.params.pagination.hiddenClass); i(!0 === e ? "paginationShow" : "paginationHide"), r.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass))) } })); const g = () => { t.el.classList.add(t.params.pagination.paginationDisabledClass); let { el: e } = t.pagination; e && (e = o(e), e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))), f() }; Object.assign(t.pagination, { enable: () => { t.el.classList.remove(t.params.pagination.paginationDisabledClass); let { el: e } = t.pagination; e && (e = o(e), e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))), h(), m(), u() }, disable: g, render: m, update: u, init: h, destroy: f }) }, function (e) { let { swiper: t, extendParams: s, on: i, emit: r } = e; const l = a(); let o, d, c, p, u = !1, m = null, h = null; function f() { if (!t.params.scrollbar.el || !t.scrollbar.el) return; const { scrollbar: e, rtlTranslate: s } = t, { dragEl: a, el: i } = e, r = t.params.scrollbar, n = t.params.loop ? t.progressLoop : t.progress; let l = d, o = (c - d) * n; s ? (o = -o, o > 0 ? (l = d - o, o = 0) : -o + d > c && (l = c + o)) : o < 0 ? (l = d + o, o = 0) : o + d > c && (l = c - o), t.isHorizontal() ? (a.style.transform = `translate3d(${o}px, 0, 0)`, a.style.width = `${l}px`) : (a.style.transform = `translate3d(0px, ${o}px, 0)`, a.style.height = `${l}px`), r.hide && (clearTimeout(m), i.style.opacity = 1, m = setTimeout((() => { i.style.opacity = 0, i.style.transitionDuration = "400ms" }), 1e3)) } function w() { if (!t.params.scrollbar.el || !t.scrollbar.el) return; const { scrollbar: e } = t, { dragEl: s, el: a } = e; s.style.width = "", s.style.height = "", c = t.isHorizontal() ? a.offsetWidth : a.offsetHeight, p = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), d = "auto" === t.params.scrollbar.dragSize ? c * p : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? s.style.width = `${d}px` : s.style.height = `${d}px`, a.style.display = p >= 1 ? "none" : "", t.params.scrollbar.hide && (a.style.opacity = 0), t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass) } function b(e) { return t.isHorizontal() ? e.clientX : e.clientY } function y(e) { const { scrollbar: s, rtlTranslate: a } = t, { el: i } = s; let r; r = (b(e) - v(i)[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : d / 2)) / (c - d), r = Math.max(Math.min(r, 1), 0), a && (r = 1 - r); const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r; t.updateProgress(n), t.setTranslate(n), t.updateActiveIndex(), t.updateSlidesClasses() } function E(e) { const s = t.params.scrollbar, { scrollbar: a, wrapperEl: i } = t, { el: n, dragEl: l } = a; u = !0, o = e.target === l ? b(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), i.style.transitionDuration = "100ms", l.style.transitionDuration = "100ms", y(e), clearTimeout(h), n.style.transitionDuration = "0ms", s.hide && (n.style.opacity = 1), t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"), r("scrollbarDragStart", e) } function x(e) { const { scrollbar: s, wrapperEl: a } = t, { el: i, dragEl: n } = s; u && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, y(e), a.style.transitionDuration = "0ms", i.style.transitionDuration = "0ms", n.style.transitionDuration = "0ms", r("scrollbarDragMove", e)) } function S(e) { const s = t.params.scrollbar, { scrollbar: a, wrapperEl: i } = t, { el: l } = a; u && (u = !1, t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "", i.style.transitionDuration = ""), s.hide && (clearTimeout(h), h = n((() => { l.style.opacity = 0, l.style.transitionDuration = "400ms" }), 1e3)), r("scrollbarDragEnd", e), s.snapOnRelease && t.slideToClosest()) } function T(e) { const { scrollbar: s, params: a } = t, i = s.el; if (!i) return; const r = i, n = !!a.passiveListeners && { passive: !1, capture: !1 }, o = !!a.passiveListeners && { passive: !0, capture: !1 }; if (!r) return; const d = "on" === e ? "addEventListener" : "removeEventListener"; r[d]("pointerdown", E, n), l[d]("pointermove", x, n), l[d]("pointerup", S, o) } function M() { const { scrollbar: e, el: s } = t; t.params.scrollbar = ee(t, t.originalParams.scrollbar, t.params.scrollbar, { el: "swiper-scrollbar" }); const a = t.params.scrollbar; if (!a.el) return; let i, r; "string" == typeof a.el && t.isElement && (i = t.el.shadowRoot.querySelector(a.el)), i || "string" != typeof a.el ? i || (i = a.el) : i = l.querySelectorAll(a.el), t.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.querySelectorAll(a.el).length && (i = s.querySelector(a.el)), i.length > 0 && (i = i[0]), i.classList.add(t.isHorizontal() ? a.horizontalClass : a.verticalClass), i && (r = i.querySelector(`.${t.params.scrollbar.dragClass}`), r || (r = g("div", t.params.scrollbar.dragClass), i.append(r))), Object.assign(e, { el: i, dragEl: r }), a.draggable && t.params.scrollbar.el && t.scrollbar.el && T("on"), i && i.classList[t.enabled ? "remove" : "add"](t.params.scrollbar.lockClass) } function C() { const e = t.params.scrollbar, s = t.scrollbar.el; s && s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && T("off") } s({ scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag", scrollbarDisabledClass: "swiper-scrollbar-disabled", horizontalClass: "swiper-scrollbar-horizontal", verticalClass: "swiper-scrollbar-vertical" } }), t.scrollbar = { el: null, dragEl: null }, i("init", (() => { !1 === t.params.scrollbar.enabled ? P() : (M(), w(), f()) })), i("update resize observerUpdate lock unlock", (() => { w() })), i("setTranslate", (() => { f() })), i("setTransition", ((e, s) => { !function (e) { t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`) }(s) })), i("enable disable", (() => { const { el: e } = t.scrollbar; e && e.classList[t.enabled ? "remove" : "add"](t.params.scrollbar.lockClass) })), i("destroy", (() => { C() })); const P = () => { t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.el && t.scrollbar.el.classList.add(t.params.scrollbar.scrollbarDisabledClass), C() }; Object.assign(t.scrollbar, { enable: () => { t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.el && t.scrollbar.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass), M(), w(), f() }, disable: P, updateSize: w, setTranslate: f, init: M, destroy: C }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ parallax: { enabled: !1 } }); const i = (e, s) => { const { rtl: a } = t, i = a ? -1 : 1, r = e.getAttribute("data-swiper-parallax") || "0"; let n = e.getAttribute("data-swiper-parallax-x"), l = e.getAttribute("data-swiper-parallax-y"); const o = e.getAttribute("data-swiper-parallax-scale"), d = e.getAttribute("data-swiper-parallax-opacity"), c = e.getAttribute("data-swiper-parallax-rotate"); if (n || l ? (n = n || "0", l = l || "0") : t.isHorizontal() ? (n = r, l = "0") : (l = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * i + "%" : n * s * i + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px", null != d) { const t = d - (d - 1) * (1 - Math.abs(s)); e.style.opacity = t } let p = `translate3d(${n}, ${l}, 0px)`; if (null != o) { p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})` } if (c && null != c) { p += ` rotate(${c * s * -1}deg)` } e.style.transform = p }, r = () => { const { el: e, slides: s, progress: a, snapGrid: r } = t; f(e, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((e => { i(e, a) })), s.forEach(((e, s) => { let n = e.progress; t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (n += Math.ceil(s / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), e.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach((e => { i(e, n) })) })) }; a("beforeInit", (() => { t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0) })), a("init", (() => { t.params.parallax.enabled && r() })), a("setTranslate", (() => { t.params.parallax.enabled && r() })), a("setTransition", ((e, s) => { t.params.parallax.enabled && function (e) { void 0 === e && (e = t.params.speed); const { el: s } = t; s.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((t => { let s = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || e; 0 === e && (s = 0), t.style.transitionDuration = `${s}ms` })) }(s) })) }, function (e) { let { swiper: t, extendParams: s, on: a, emit: i } = e; const n = r(); s({ zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }), t.zoom = { enabled: !1 }; let l, d, c = 1, p = !1; const u = [], m = { originX: 0, originY: 0, slideEl: void 0, slideWidth: void 0, slideHeight: void 0, imageEl: void 0, imageWrapEl: void 0, maxRatio: 3 }, h = { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, g = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 }; let w = 1; function b() { if (u.length < 2) return 1; const e = u[0].pageX, t = u[0].pageY, s = u[1].pageX, a = u[1].pageY; return Math.sqrt((s - e) ** 2 + (a - t) ** 2) } function E(e) { const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`; return !!e.target.matches(s) || t.slides.filter((t => t.contains(e.target))).length > 0 } function x(e) { if ("mouse" === e.pointerType && u.splice(0, u.length), !E(e)) return; const s = t.params.zoom; if (l = !1, d = !1, u.push(e), !(u.length < 2)) { if (l = !0, m.scaleStart = b(), !m.slideEl) { m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`), m.slideEl || (m.slideEl = t.slides[t.activeIndex]); let a = m.slideEl.querySelector(`.${s.containerClass}`); if (a && (a = a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = a, m.imageWrapEl = a ? y(m.imageEl, `.${s.containerClass}`)[0] : void 0, !m.imageWrapEl) return void (m.imageEl = void 0); m.maxRatio = m.imageWrapEl.getAttribute("data-swiper-zoom") || s.maxRatio } if (m.imageEl) { const [e, t] = function () { if (u.length < 2) return { x: null, y: null }; const e = m.imageEl.getBoundingClientRect(); return [(u[0].pageX + (u[1].pageX - u[0].pageX) / 2 - e.x) / c, (u[0].pageY + (u[1].pageY - u[0].pageY) / 2 - e.y) / c] }(); m.originX = e, m.originY = t, m.imageEl.style.transitionDuration = "0ms" } p = !0 } } function S(e) { if (!E(e)) return; const s = t.params.zoom, a = t.zoom, i = u.findIndex((t => t.pointerId === e.pointerId)); i >= 0 && (u[i] = e), u.length < 2 || (d = !0, m.scaleMove = b(), m.imageEl && (a.scale = m.scaleMove / m.scaleStart * c, a.scale > m.maxRatio && (a.scale = m.maxRatio - 1 + (a.scale - m.maxRatio + 1) ** .5), a.scale < s.minRatio && (a.scale = s.minRatio + 1 - (s.minRatio - a.scale + 1) ** .5), m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`)) } function T(e) { if (!E(e)) return; if ("mouse" === e.pointerType && "pointerout" === e.type) return; const s = t.params.zoom, a = t.zoom, i = u.findIndex((t => t.pointerId === e.pointerId)); i >= 0 && u.splice(i, 1), l && d && (l = !1, d = !1, m.imageEl && (a.scale = Math.max(Math.min(a.scale, m.maxRatio), s.minRatio), m.imageEl.style.transitionDuration = `${t.params.speed}ms`, m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`, c = a.scale, p = !1, a.scale > 1 && m.slideEl ? m.slideEl.classList.add(`${s.zoomedSlideClass}`) : a.scale <= 1 && m.slideEl && m.slideEl.classList.remove(`${s.zoomedSlideClass}`), 1 === a.scale && (m.originX = 0, m.originY = 0, m.slideEl = void 0))) } function M(e) { if (!E(e) || !function (e) { const s = `.${t.params.zoom.containerClass}`; return !!e.target.matches(s) || [...t.el.querySelectorAll(s)].filter((t => t.contains(e.target))).length > 0 }(e)) return; const s = t.zoom; if (!m.imageEl) return; if (!h.isTouched || !m.slideEl) return; h.isMoved || (h.width = m.imageEl.offsetWidth, h.height = m.imageEl.offsetHeight, h.startX = o(m.imageWrapEl, "x") || 0, h.startY = o(m.imageWrapEl, "y") || 0, m.slideWidth = m.slideEl.offsetWidth, m.slideHeight = m.slideEl.offsetHeight, m.imageWrapEl.style.transitionDuration = "0ms"); const a = h.width * s.scale, i = h.height * s.scale; if (a < m.slideWidth && i < m.slideHeight) return; h.minX = Math.min(m.slideWidth / 2 - a / 2, 0), h.maxX = -h.minX, h.minY = Math.min(m.slideHeight / 2 - i / 2, 0), h.maxY = -h.minY, h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX, h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY; if (Math.max(Math.abs(h.touchesCurrent.x - h.touchesStart.x), Math.abs(h.touchesCurrent.y - h.touchesStart.y)) > 5 && (t.allowClick = !1), !h.isMoved && !p) { if (t.isHorizontal() && (Math.floor(h.minX) === Math.floor(h.startX) && h.touchesCurrent.x < h.touchesStart.x || Math.floor(h.maxX) === Math.floor(h.startX) && h.touchesCurrent.x > h.touchesStart.x)) return void (h.isTouched = !1); if (!t.isHorizontal() && (Math.floor(h.minY) === Math.floor(h.startY) && h.touchesCurrent.y < h.touchesStart.y || Math.floor(h.maxY) === Math.floor(h.startY) && h.touchesCurrent.y > h.touchesStart.y)) return void (h.isTouched = !1) } e.cancelable && e.preventDefault(), e.stopPropagation(), h.isMoved = !0; const r = (s.scale - c) / (m.maxRatio - t.params.zoom.minRatio), { originX: n, originY: l } = m; h.currentX = h.touchesCurrent.x - h.touchesStart.x + h.startX + r * (h.width - 2 * n), h.currentY = h.touchesCurrent.y - h.touchesStart.y + h.startY + r * (h.height - 2 * l), h.currentX < h.minX && (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** .8), h.currentX > h.maxX && (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** .8), h.currentY < h.minY && (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** .8), h.currentY > h.maxY && (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** .8), g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x), g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y), g.prevTime || (g.prevTime = Date.now()), g.x = (h.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2, g.y = (h.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2, Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0), Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0), g.prevPositionX = h.touchesCurrent.x, g.prevPositionY = h.touchesCurrent.y, g.prevTime = Date.now(), m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)` } function C() { const e = t.zoom; m.slideEl && t.activeIndex !== t.slides.indexOf(m.slideEl) && (m.imageEl && (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), m.imageWrapEl && (m.imageWrapEl.style.transform = "translate3d(0,0,0)"), m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`), e.scale = 1, c = 1, m.slideEl = void 0, m.imageEl = void 0, m.imageWrapEl = void 0, m.originX = 0, m.originY = 0) } function P(e) { const s = t.zoom, a = t.params.zoom; if (!m.slideEl) { e && e.target && (m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`)), m.slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex]); let s = m.slideEl.querySelector(`.${a.containerClass}`); s && (s = s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = s, m.imageWrapEl = s ? y(m.imageEl, `.${a.containerClass}`)[0] : void 0 } if (!m.imageEl || !m.imageWrapEl) return; let i, r, l, o, d, p, u, g, w, b, E, x, S, T, M, C, P, L; t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), m.slideEl.classList.add(`${a.zoomedSlideClass}`), void 0 === h.touchesStart.x && e ? (i = e.pageX, r = e.pageY) : (i = h.touchesStart.x, r = h.touchesStart.y); const z = "number" == typeof e ? e : null; 1 === c && z && (i = void 0, r = void 0), s.scale = z || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, c = z || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, !e || 1 === c && z ? (u = 0, g = 0) : (P = m.slideEl.offsetWidth, L = m.slideEl.offsetHeight, l = v(m.slideEl).left + n.scrollX, o = v(m.slideEl).top + n.scrollY, d = l + P / 2 - i, p = o + L / 2 - r, w = m.imageEl.offsetWidth, b = m.imageEl.offsetHeight, E = w * s.scale, x = b * s.scale, S = Math.min(P / 2 - E / 2, 0), T = Math.min(L / 2 - x / 2, 0), M = -S, C = -T, u = d * s.scale, g = p * s.scale, u < S && (u = S), u > M && (u = M), g < T && (g = T), g > C && (g = C)), z && 1 === s.scale && (m.originX = 0, m.originY = 0), m.imageWrapEl.style.transitionDuration = "300ms", m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`, m.imageEl.style.transitionDuration = "300ms", m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})` } function L() { const e = t.zoom, s = t.params.zoom; if (!m.slideEl) { t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex]; let e = m.slideEl.querySelector(`.${s.containerClass}`); e && (e = e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = e, m.imageWrapEl = e ? y(m.imageEl, `.${s.containerClass}`)[0] : void 0 } m.imageEl && m.imageWrapEl && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, c = 1, m.imageWrapEl.style.transitionDuration = "300ms", m.imageWrapEl.style.transform = "translate3d(0,0,0)", m.imageEl.style.transitionDuration = "300ms", m.imageEl.style.transform = "translate3d(0,0,0) scale(1)", m.slideEl.classList.remove(`${s.zoomedSlideClass}`), m.slideEl = void 0, m.originX = 0, m.originY = 0) } function z(e) { const s = t.zoom; s.scale && 1 !== s.scale ? L() : P(e) } function A() { return { passiveListener: !!t.params.passiveListeners && { passive: !0, capture: !1 }, activeListenerWithCapture: !t.params.passiveListeners || { passive: !1, capture: !0 } } } function $() { const e = t.zoom; if (e.enabled) return; e.enabled = !0; const { passiveListener: s, activeListenerWithCapture: a } = A(); t.wrapperEl.addEventListener("pointerdown", x, s), t.wrapperEl.addEventListener("pointermove", S, a), ["pointerup", "pointercancel", "pointerout"].forEach((e => { t.wrapperEl.addEventListener(e, T, s) })), t.wrapperEl.addEventListener("pointermove", M, a) } function I() { const e = t.zoom; if (!e.enabled) return; e.enabled = !1; const { passiveListener: s, activeListenerWithCapture: a } = A(); t.wrapperEl.removeEventListener("pointerdown", x, s), t.wrapperEl.removeEventListener("pointermove", S, a), ["pointerup", "pointercancel", "pointerout"].forEach((e => { t.wrapperEl.removeEventListener(e, T, s) })), t.wrapperEl.removeEventListener("pointermove", M, a) } Object.defineProperty(t.zoom, "scale", { get: () => w, set(e) { if (w !== e) { const t = m.imageEl, s = m.slideEl; i("zoomChange", e, t, s) } w = e } }), a("init", (() => { t.params.zoom.enabled && $() })), a("destroy", (() => { I() })), a("touchStart", ((e, s) => { t.zoom.enabled && function (e) { const s = t.device; if (!m.imageEl) return; if (h.isTouched) return; s.android && e.cancelable && e.preventDefault(), h.isTouched = !0; const a = u.length > 0 ? u[0] : e; h.touchesStart.x = a.pageX, h.touchesStart.y = a.pageY }(s) })), a("touchEnd", ((e, s) => { t.zoom.enabled && function () { const e = t.zoom; if (!m.imageEl) return; if (!h.isTouched || !h.isMoved) return h.isTouched = !1, void (h.isMoved = !1); h.isTouched = !1, h.isMoved = !1; let s = 300, a = 300; const i = g.x * s, r = h.currentX + i, n = g.y * a, l = h.currentY + n; 0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)), 0 !== g.y && (a = Math.abs((l - h.currentY) / g.y)); const o = Math.max(s, a); h.currentX = r, h.currentY = l; const d = h.width * e.scale, c = h.height * e.scale; h.minX = Math.min(m.slideWidth / 2 - d / 2, 0), h.maxX = -h.minX, h.minY = Math.min(m.slideHeight / 2 - c / 2, 0), h.maxY = -h.minY, h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX), h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY), m.imageWrapEl.style.transitionDuration = `${o}ms`, m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)` }() })), a("doubleTap", ((e, s) => { !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && z(s) })), a("transitionEnd", (() => { t.zoom.enabled && t.params.zoom.enabled && C() })), a("slideChange", (() => { t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C() })), Object.assign(t.zoom, { enable: $, disable: I, in: P, out: L, toggle: z }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; function i(e, t) { const s = function () { let e, t, s; return (a, i) => { for (t = -1, e = a.length; e - t > 1;)s = e + t >> 1, a[s] <= i ? t = s : e = s; return e } }(); let a, i; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) { return e ? (i = s(this.x, e), a = i - 1, (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0 }, this } function r() { t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline) } s({ controller: { control: void 0, inverse: !1, by: "slide" } }), t.controller = { control: void 0 }, a("beforeInit", (() => { if ("undefined" != typeof window && ("string" == typeof t.params.controller.control || t.params.controller.control instanceof HTMLElement)) { const e = document.querySelector(t.params.controller.control); if (e && e.swiper) t.controller.control = e.swiper; else if (e) { const s = a => { t.controller.control = a.detail[0], t.update(), e.removeEventListener("init", s) }; e.addEventListener("init", s) } } else t.controller.control = t.params.controller.control })), a("update", (() => { r() })), a("resize", (() => { r() })), a("observerUpdate", (() => { r() })), a("setTranslate", ((e, s, a) => { t.controller.control && !t.controller.control.destroyed && t.controller.setTranslate(s, a) })), a("setTransition", ((e, s, a) => { t.controller.control && !t.controller.control.destroyed && t.controller.setTransition(s, a) })), Object.assign(t.controller, { setTranslate: function (e, s) { const a = t.controller.control; let r, n; const l = t.constructor; function o(e) { if (e.destroyed) return; const s = t.rtlTranslate ? -t.translate : t.translate; "slide" === t.params.controller.by && (!function (e) { t.controller.spline = t.params.loop ? new i(t.slidesGrid, e.slidesGrid) : new i(t.snapGrid, e.snapGrid) }(e), n = -t.controller.spline.interpolate(-s)), n && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), !Number.isNaN(r) && Number.isFinite(r) || (r = 1), n = (s - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, t), e.updateActiveIndex(), e.updateSlidesClasses() } if (Array.isArray(a)) for (let e = 0; e < a.length; e += 1)a[e] !== s && a[e] instanceof l && o(a[e]); else a instanceof l && s !== a && o(a) }, setTransition: function (e, s) { const a = t.constructor, i = t.controller.control; let r; function l(s) { s.destroyed || (s.setTransition(e, t), 0 !== e && (s.transitionStart(), s.params.autoHeight && n((() => { s.updateAutoHeight() })), E(s.wrapperEl, (() => { i && s.transitionEnd() })))) } if (Array.isArray(i)) for (r = 0; r < i.length; r += 1)i[r] !== s && i[r] instanceof a && l(i[r]); else i instanceof a && s !== i && l(i) } }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", slideLabelMessage: "{{index}} / {{slidesLength}}", containerMessage: null, containerRoleDescriptionMessage: null, itemRoleDescriptionMessage: null, slideRole: "group", id: null } }), t.a11y = { clicked: !1 }; let i = null; function r(e) { const t = i; 0 !== t.length && (t.innerHTML = "", t.innerHTML = e) } const n = e => (Array.isArray(e) || (e = [e].filter((e => !!e))), e); function l(e) { (e = n(e)).forEach((e => { e.setAttribute("tabIndex", "0") })) } function o(e) { (e = n(e)).forEach((e => { e.setAttribute("tabIndex", "-1") })) } function d(e, t) { (e = n(e)).forEach((e => { e.setAttribute("role", t) })) } function c(e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-roledescription", t) })) } function p(e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-label", t) })) } function u(e) { (e = n(e)).forEach((e => { e.setAttribute("aria-disabled", !0) })) } function m(e) { (e = n(e)).forEach((e => { e.setAttribute("aria-disabled", !1) })) } function h(e) { if (13 !== e.keyCode && 32 !== e.keyCode) return; const s = t.params.a11y, a = e.target; t.pagination && t.pagination.el && (a === t.pagination.el || t.pagination.el.contains(e.target)) && !e.target.matches(te(t.params.pagination.bulletClass)) || (t.navigation && t.navigation.nextEl && a === t.navigation.nextEl && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)), t.navigation && t.navigation.prevEl && a === t.navigation.prevEl && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)), t.pagination && a.matches(te(t.params.pagination.bulletClass)) && a.click()) } function f() { return t.pagination && t.pagination.bullets && t.pagination.bullets.length } function v() { return f() && t.params.pagination.clickable } const w = (e, t, s) => { l(e), "BUTTON" !== e.tagName && (d(e, "button"), e.addEventListener("keydown", h)), p(e, s), function (e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-controls", t) })) }(e, t) }, y = () => { t.a11y.clicked = !0 }, E = () => { requestAnimationFrame((() => { requestAnimationFrame((() => { t.destroyed || (t.a11y.clicked = !1) })) })) }, x = e => { if (t.a11y.clicked) return; const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`); if (!s || !t.slides.includes(s)) return; const a = t.slides.indexOf(s) === t.activeIndex, i = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s); a || i || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(s), 0)) }, S = () => { const e = t.params.a11y; e.itemRoleDescriptionMessage && c(t.slides, e.itemRoleDescriptionMessage), e.slideRole && d(t.slides, e.slideRole); const s = t.slides.length; e.slideLabelMessage && t.slides.forEach(((a, i) => { const r = t.params.loop ? parseInt(a.getAttribute("data-swiper-slide-index"), 10) : i; p(a, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, s)) })) }, T = () => { const e = t.params.a11y; t.isElement ? t.el.shadowEl.append(i) : t.el.append(i); const s = t.el; e.containerRoleDescriptionMessage && c(s, e.containerRoleDescriptionMessage), e.containerMessage && p(s, e.containerMessage); const a = t.wrapperEl, r = e.id || a.getAttribute("id") || `swiper-wrapper-${l = 16, void 0 === l && (l = 16), "x".repeat(l).replace(/x/g, (() => Math.round(16 * Math.random()).toString(16)))}`; var l; const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite"; var d; d = r, n(a).forEach((e => { e.setAttribute("id", d) })), function (e, t) { (e = n(e)).forEach((e => { e.setAttribute("aria-live", t) })) }(a, o), S(); let { nextEl: u, prevEl: m } = t.navigation ? t.navigation : {}; if (u = n(u), m = n(m), u && u.forEach((t => w(t, r, e.nextSlideMessage))), m && m.forEach((t => w(t, r, e.prevSlideMessage))), v()) { (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach((e => { e.addEventListener("keydown", h) })) } t.el.addEventListener("focus", x, !0), t.el.addEventListener("pointerdown", y, !0), t.el.addEventListener("pointerup", E, !0) }; a("beforeInit", (() => { i = g("span", t.params.a11y.notificationClass), i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true") })), a("afterInit", (() => { t.params.a11y.enabled && T() })), a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", (() => { t.params.a11y.enabled && S() })), a("fromEdge toEdge afterInit lock unlock", (() => { t.params.a11y.enabled && function () { if (t.params.loop || t.params.rewind || !t.navigation) return; const { nextEl: e, prevEl: s } = t.navigation; s && (t.isBeginning ? (u(s), o(s)) : (m(s), l(s))), e && (t.isEnd ? (u(e), o(e)) : (m(e), l(e))) }() })), a("paginationUpdate", (() => { t.params.a11y.enabled && function () { const e = t.params.a11y; f() && t.pagination.bullets.forEach((s => { t.params.pagination.clickable && (l(s), t.params.pagination.renderBullet || (d(s, "button"), p(s, e.paginationBulletMessage.replace(/\{\{index\}\}/, b(s) + 1)))), s.matches(te(t.params.pagination.bulletActiveClass)) ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current") })) }() })), a("destroy", (() => { t.params.a11y.enabled && function () { i && i.remove(); let { nextEl: e, prevEl: s } = t.navigation ? t.navigation : {}; e = n(e), s = n(s), e && e.forEach((e => e.removeEventListener("keydown", h))), s && s.forEach((e => e.removeEventListener("keydown", h))), v() && (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach((e => { e.removeEventListener("keydown", h) })); t.el.removeEventListener("focus", x, !0), t.el.removeEventListener("pointerdown", y, !0), t.el.removeEventListener("pointerup", E, !0) }() })) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ history: { enabled: !1, root: "", replaceState: !1, key: "slides", keepQuery: !1 } }); let i = !1, n = {}; const l = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""), o = e => { const t = r(); let s; s = e ? new URL(e) : t.location; const a = s.pathname.slice(1).split("/").filter((e => "" !== e)), i = a.length; return { key: a[i - 2], value: a[i - 1] } }, d = (e, s) => { const a = r(); if (!i || !t.params.history.enabled) return; let n; n = t.params.url ? new URL(t.params.url) : a.location; const o = t.slides[s]; let d = l(o.getAttribute("data-history")); if (t.params.history.root.length > 0) { let s = t.params.history.root; "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), d = `${s}/${e ? `${e}/` : ""}${d}` } else n.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`); t.params.history.keepQuery && (d += n.search); const c = a.history.state; c && c.value === d || (t.params.history.replaceState ? a.history.replaceState({ value: d }, null, d) : a.history.pushState({ value: d }, null, d)) }, c = (e, s, a) => { if (s) for (let i = 0, r = t.slides.length; i < r; i += 1) { const r = t.slides[i]; if (l(r.getAttribute("data-history")) === s) { const s = t.getSlideIndex(r); t.slideTo(s, e, a) } } else t.slideTo(0, e, a) }, p = () => { n = o(t.params.url), c(t.params.speed, n.value, !1) }; a("init", (() => { t.params.history.enabled && (() => { const e = r(); if (t.params.history) { if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void (t.params.hashNavigation.enabled = !0); i = !0, n = o(t.params.url), n.key || n.value ? (c(0, n.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", p)) : t.params.history.replaceState || e.addEventListener("popstate", p) } })() })), a("destroy", (() => { t.params.history.enabled && (() => { const e = r(); t.params.history.replaceState || e.removeEventListener("popstate", p) })() })), a("transitionEnd _freeModeNoMomentumRelease", (() => { i && d(t.params.history.key, t.activeIndex) })), a("slideChange", (() => { i && t.params.cssMode && d(t.params.history.key, t.activeIndex) })) }, function (e) { let { swiper: t, extendParams: s, emit: i, on: n } = e, l = !1; const o = a(), d = r(); s({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1, getSlideIndex(e, s) { if (t.virtual && t.params.virtual.enabled) { const e = t.slides.filter((e => e.getAttribute("data-hash") === s))[0]; if (!e) return 0; return parseInt(e.getAttribute("data-swiper-slide-index"), 10) } return t.getSlideIndex(f(t.slidesEl, `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0]) } } }); const c = () => { i("hashChange"); const e = o.location.hash.replace("#", ""), s = t.virtual && t.params.virtual.enabled ? t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`) : t.slides[t.activeIndex]; if (e !== (s ? s.getAttribute("data-hash") : "")) { const s = t.params.hashNavigation.getSlideIndex(t, e); if (void 0 === s || Number.isNaN(s)) return; t.slideTo(s) } }, p = () => { if (!l || !t.params.hashNavigation.enabled) return; const e = t.virtual && t.params.virtual.enabled ? t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`) : t.slides[t.activeIndex], s = e ? e.getAttribute("data-hash") || e.getAttribute("data-history") : ""; t.params.hashNavigation.replaceState && d.history && d.history.replaceState ? (d.history.replaceState(null, null, `#${s}` || ""), i("hashSet")) : (o.location.hash = s || "", i("hashSet")) }; n("init", (() => { t.params.hashNavigation.enabled && (() => { if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return; l = !0; const e = o.location.hash.replace("#", ""); if (e) { const s = 0, a = t.params.hashNavigation.getSlideIndex(t, e); t.slideTo(a || 0, s, t.params.runCallbacksOnInit, !0) } t.params.hashNavigation.watchState && d.addEventListener("hashchange", c) })() })), n("destroy", (() => { t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d.removeEventListener("hashchange", c) })), n("transitionEnd _freeModeNoMomentumRelease", (() => { l && p() })), n("slideChange", (() => { l && t.params.cssMode && p() })) }, function (e) { let t, s, { swiper: i, extendParams: r, on: n, emit: l, params: o } = e; i.autoplay = { running: !1, paused: !1, timeLeft: 0 }, r({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } }); let d, c, p, u, m, h, f, g = o && o.autoplay ? o.autoplay.delay : 3e3, v = o && o.autoplay ? o.autoplay.delay : 3e3, w = (new Date).getTime; function b(e) { i && !i.destroyed && i.wrapperEl && e.target === i.wrapperEl && (i.wrapperEl.removeEventListener("transitionend", b), M()) } const y = () => { if (i.destroyed || !i.autoplay.running) return; i.autoplay.paused ? c = !0 : c && (v = d, c = !1); const e = i.autoplay.paused ? d : w + v - (new Date).getTime(); i.autoplay.timeLeft = e, l("autoplayTimeLeft", e, e / g), s = requestAnimationFrame((() => { y() })) }, E = e => { if (i.destroyed || !i.autoplay.running) return; cancelAnimationFrame(s), y(); let a = void 0 === e ? i.params.autoplay.delay : e; g = i.params.autoplay.delay, v = i.params.autoplay.delay; const r = (() => { let e; if (e = i.virtual && i.params.virtual.enabled ? i.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] : i.slides[i.activeIndex], !e) return; return parseInt(e.getAttribute("data-swiper-autoplay"), 10) })(); !Number.isNaN(r) && r > 0 && void 0 === e && (a = r, g = r, v = r), d = a; const n = i.params.speed, o = () => { i && !i.destroyed && (i.params.autoplay.reverseDirection ? !i.isBeginning || i.params.loop || i.params.rewind ? (i.slidePrev(n, !0, !0), l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(i.slides.length - 1, n, !0, !0), l("autoplay")) : !i.isEnd || i.params.loop || i.params.rewind ? (i.slideNext(n, !0, !0), l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(0, n, !0, !0), l("autoplay")), i.params.cssMode && (w = (new Date).getTime(), requestAnimationFrame((() => { E() })))) }; return a > 0 ? (clearTimeout(t), t = setTimeout((() => { o() }), a)) : requestAnimationFrame((() => { o() })), a }, x = () => { i.autoplay.running = !0, E(), l("autoplayStart") }, S = () => { i.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(s), l("autoplayStop") }, T = (e, s) => { if (i.destroyed || !i.autoplay.running) return; clearTimeout(t), e || (f = !0); const a = () => { l("autoplayPause"), i.params.autoplay.waitForTransition ? i.wrapperEl.addEventListener("transitionend", b) : M() }; if (i.autoplay.paused = !0, s) return h && (d = i.params.autoplay.delay), h = !1, void a(); const r = d || i.params.autoplay.delay; d = r - ((new Date).getTime() - w), i.isEnd && d < 0 && !i.params.loop || (d < 0 && (d = 0), a()) }, M = () => { i.isEnd && d < 0 && !i.params.loop || i.destroyed || !i.autoplay.running || (w = (new Date).getTime(), f ? (f = !1, E(d)) : E(), i.autoplay.paused = !1, l("autoplayResume")) }, C = () => { if (i.destroyed || !i.autoplay.running) return; const e = a(); "hidden" === e.visibilityState && (f = !0, T(!0)), "visible" === e.visibilityState && M() }, P = e => { "mouse" === e.pointerType && (f = !0, T(!0)) }, L = e => { "mouse" === e.pointerType && i.autoplay.paused && M() }; n("init", (() => { i.params.autoplay.enabled && (i.params.autoplay.pauseOnMouseEnter && (i.el.addEventListener("pointerenter", P), i.el.addEventListener("pointerleave", L)), a().addEventListener("visibilitychange", C), w = (new Date).getTime(), x()) })), n("destroy", (() => { i.el.removeEventListener("pointerenter", P), i.el.removeEventListener("pointerleave", L), a().removeEventListener("visibilitychange", C), i.autoplay.running && S() })), n("beforeTransitionStart", ((e, t, s) => { !i.destroyed && i.autoplay.running && (s || !i.params.autoplay.disableOnInteraction ? T(!0, !0) : S()) })), n("sliderFirstMove", (() => { !i.destroyed && i.autoplay.running && (i.params.autoplay.disableOnInteraction ? S() : (p = !0, u = !1, f = !1, m = setTimeout((() => { f = !0, u = !0, T(!0) }), 200))) })), n("touchEnd", (() => { if (!i.destroyed && i.autoplay.running && p) { if (clearTimeout(m), clearTimeout(t), i.params.autoplay.disableOnInteraction) return u = !1, void (p = !1); u && i.params.cssMode && M(), u = !1, p = !1 } })), n("slideChange", (() => { !i.destroyed && i.autoplay.running && (h = !0) })), Object.assign(i.autoplay, { start: x, stop: S, pause: T, resume: M }) }, function (e) { let { swiper: t, extendParams: s, on: i } = e; s({ thumbs: { swiper: null, multipleActiveThumbs: !0, autoScrollOffset: 0, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-thumbs" } }); let r = !1, n = !1; function l() { const e = t.thumbs.swiper; if (!e || e.destroyed) return; const s = e.clickedIndex, a = e.clickedSlide; if (a && a.classList.contains(t.params.thumbs.slideThumbActiveClass)) return; if (null == s) return; let i; i = e.params.loop ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : s, t.params.loop ? t.slideToLoop(i) : t.slideTo(i) } function o() { const { thumbs: e } = t.params; if (r) return !1; r = !0; const s = t.constructor; if (e.swiper instanceof s) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), Object.assign(t.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), t.thumbs.swiper.update(); else if (d(e.swiper)) { const a = Object.assign({}, e.swiper); Object.assign(a, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), t.thumbs.swiper = new s(a), n = !0 } return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", l), !0 } function c(e) { const s = t.thumbs.swiper; if (!s || s.destroyed) return; const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView; let i = 1; const r = t.params.thumbs.slideThumbActiveClass; if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (i = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (i = 1), i = Math.floor(i), s.slides.forEach((e => e.classList.remove(r))), s.params.loop || s.params.virtual && s.params.virtual.enabled) for (let e = 0; e < i; e += 1)f(s.slidesEl, `[data-swiper-slide-index="${t.realIndex + e}"]`).forEach((e => { e.classList.add(r) })); else for (let e = 0; e < i; e += 1)s.slides[t.realIndex + e] && s.slides[t.realIndex + e].classList.add(r); const n = t.params.thumbs.autoScrollOffset, l = n && !s.params.loop; if (t.realIndex !== s.realIndex || l) { const i = s.activeIndex; let r, o; if (s.params.loop) { const e = s.slides.filter((e => e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`))[0]; r = s.slides.indexOf(e), o = t.activeIndex > t.previousIndex ? "next" : "prev" } else r = t.realIndex, o = r > t.previousIndex ? "next" : "prev"; l && (r += "next" === o ? n : -1 * n), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(r) < 0 && (s.params.centeredSlides ? r = r > i ? r - Math.floor(a / 2) + 1 : r + Math.floor(a / 2) - 1 : r > i && s.params.slidesPerGroup, s.slideTo(r, e ? 0 : void 0)) } } t.thumbs = { swiper: null }, i("beforeInit", (() => { const { thumbs: e } = t.params; if (e && e.swiper) if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) { const s = a(), i = () => { const a = "string" == typeof e.swiper ? s.querySelector(e.swiper) : e.swiper; if (a && a.swiper) e.swiper = a.swiper, o(), c(!0); else if (a) { const s = i => { e.swiper = i.detail[0], a.removeEventListener("init", s), o(), c(!0), e.swiper.update(), t.update() }; a.addEventListener("init", s) } return a }, r = () => { if (t.destroyed) return; i() || requestAnimationFrame(r) }; requestAnimationFrame(r) } else o(), c(!0) })), i("slideChange update resize observerUpdate", (() => { c() })), i("setTransition", ((e, s) => { const a = t.thumbs.swiper; a && !a.destroyed && a.setTransition(s) })), i("beforeDestroy", (() => { const e = t.thumbs.swiper; e && !e.destroyed && n && e.destroy() })), Object.assign(t.thumbs, { init: o, update: c }) }, function (e) { let { swiper: t, extendParams: s, emit: a, once: i } = e; s({ freeMode: { enabled: !1, momentum: !0, momentumRatio: 1, momentumBounce: !0, momentumBounceRatio: 1, momentumVelocityRatio: 1, sticky: !1, minimumVelocity: .02 } }), Object.assign(t, { freeMode: { onTouchStart: function () { if (t.params.cssMode) return; const e = t.getTranslate(); t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({ currentPos: t.rtl ? t.translate : -t.translate }) }, onTouchMove: function () { if (t.params.cssMode) return; const { touchEventsData: e, touches: s } = t; 0 === e.velocities.length && e.velocities.push({ position: s[t.isHorizontal() ? "startX" : "startY"], time: e.touchStartTime }), e.velocities.push({ position: s[t.isHorizontal() ? "currentX" : "currentY"], time: l() }) }, onTouchEnd: function (e) { let { currentPos: s } = e; if (t.params.cssMode) return; const { params: r, wrapperEl: n, rtlTranslate: o, snapGrid: d, touchEventsData: c } = t, p = l() - c.touchStartTime; if (s < -t.minTranslate()) t.slideTo(t.activeIndex); else if (s > -t.maxTranslate()) t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1); else { if (r.freeMode.momentum) { if (c.velocities.length > 1) { const e = c.velocities.pop(), s = c.velocities.pop(), a = e.position - s.position, i = e.time - s.time; t.velocity = a / i, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (i > 150 || l() - e.time > 300) && (t.velocity = 0) } else t.velocity = 0; t.velocity *= r.freeMode.momentumVelocityRatio, c.velocities.length = 0; let e = 1e3 * r.freeMode.momentumRatio; const s = t.velocity * e; let p = t.translate + s; o && (p = -p); let u, m = !1; const h = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio; let f; if (p < t.maxTranslate()) r.freeMode.momentumBounce ? (p + t.maxTranslate() < -h && (p = t.maxTranslate() - h), u = t.maxTranslate(), m = !0, c.allowMomentumBounce = !0) : p = t.maxTranslate(), r.loop && r.centeredSlides && (f = !0); else if (p > t.minTranslate()) r.freeMode.momentumBounce ? (p - t.minTranslate() > h && (p = t.minTranslate() + h), u = t.minTranslate(), m = !0, c.allowMomentumBounce = !0) : p = t.minTranslate(), r.loop && r.centeredSlides && (f = !0); else if (r.freeMode.sticky) { let e; for (let t = 0; t < d.length; t += 1)if (d[t] > -p) { e = t; break } p = Math.abs(d[e] - p) < Math.abs(d[e - 1] - p) || "next" === t.swipeDirection ? d[e] : d[e - 1], p = -p } if (f && i("transitionEnd", (() => { t.loopFix() })), 0 !== t.velocity) { if (e = o ? Math.abs((-p - t.translate) / t.velocity) : Math.abs((p - t.translate) / t.velocity), r.freeMode.sticky) { const s = Math.abs((o ? -p : p) - t.translate), a = t.slidesSizesGrid[t.activeIndex]; e = s < a ? r.speed : s < 2 * a ? 1.5 * r.speed : 2.5 * r.speed } } else if (r.freeMode.sticky) return void t.slideToClosest(); r.freeMode.momentumBounce && m ? (t.updateProgress(u), t.setTransition(e), t.setTranslate(p), t.transitionStart(!0, t.swipeDirection), t.animating = !0, E(n, (() => { t && !t.destroyed && c.allowMomentumBounce && (a("momentumBounce"), t.setTransition(r.speed), setTimeout((() => { t.setTranslate(u), E(n, (() => { t && !t.destroyed && t.transitionEnd() })) }), 0)) }))) : t.velocity ? (a("_freeModeNoMomentumRelease"), t.updateProgress(p), t.setTransition(e), t.setTranslate(p), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, E(n, (() => { t && !t.destroyed && t.transitionEnd() })))) : t.updateProgress(p), t.updateActiveIndex(), t.updateSlidesClasses() } else { if (r.freeMode.sticky) return void t.slideToClosest(); r.freeMode && a("_freeModeNoMomentumRelease") } (!r.freeMode.momentum || p >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses()) } } } }) }, function (e) { let t, s, a, { swiper: i, extendParams: r } = e; r({ grid: { rows: 1, fill: "column" } }); const n = () => { let e = i.params.spaceBetween; return "string" == typeof e && e.indexOf("%") >= 0 ? e = parseFloat(e.replace("%", "")) / 100 * i.size : "string" == typeof e && (e = parseFloat(e)), e }; i.grid = { initSlides: e => { const { slidesPerView: r } = i.params, { rows: n, fill: l } = i.params.grid; a = Math.floor(e / n), t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n, "auto" !== r && "row" === l && (t = Math.max(t, r * n)), s = t / n }, updateSlide: (e, r, l, o) => { const { slidesPerGroup: d } = i.params, c = n(), { rows: p, fill: u } = i.params.grid; let m, h, f; if ("row" === u && d > 1) { const s = Math.floor(e / (d * p)), a = e - p * d * s, i = 0 === s ? d : Math.min(Math.ceil((l - s * p * d) / p), d); f = Math.floor(a / i), h = a - f * i + s * d, m = h + f * t / p, r.style.order = m } else "column" === u ? (h = Math.floor(e / p), f = e - h * p, (h > a || h === a && f === p - 1) && (f += 1, f >= p && (f = 0, h += 1))) : (f = Math.floor(e / s), h = e - f * s); r.row = f, r.column = h, r.style[o("margin-top")] = 0 !== f ? c && `${c}px` : "" }, updateWrapperSize: (e, s, a) => { const { centeredSlides: r, roundLengths: l } = i.params, o = n(), { rows: d } = i.params.grid; if (i.virtualSize = (e + o) * t, i.virtualSize = Math.ceil(i.virtualSize / d) - o, i.wrapperEl.style[a("width")] = `${i.virtualSize + o}px`, r) { const e = []; for (let t = 0; t < s.length; t += 1) { let a = s[t]; l && (a = Math.floor(a)), s[t] < i.virtualSize + s[0] && e.push(a) } s.splice(0, s.length), s.push(...e) } } } }, function (e) { let { swiper: t } = e; Object.assign(t, { appendSlide: se.bind(t), prependSlide: ae.bind(t), addSlide: ie.bind(t), removeSlide: re.bind(t), removeAllSlides: ne.bind(t) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ fadeEffect: { crossFade: !1 } }), le({ effect: "fade", swiper: t, on: a, setTranslate: () => { const { slides: e } = t; t.params.fadeEffect; for (let s = 0; s < e.length; s += 1) { const e = t.slides[s]; let a = -e.swiperSlideOffset; t.params.virtualTranslate || (a -= t.translate); let i = 0; t.isHorizontal() || (i = a, a = 0); const r = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0), n = oe(0, e); n.style.opacity = r, n.style.transform = `translate3d(${a}px, ${i}px, 0px)` } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms` })), de({ swiper: t, duration: e, transformElements: s, allSlides: !0 }) }, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } }); const i = (e, t, s) => { let a = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"), i = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom"); a || (a = g("div", "swiper-slide-shadow-" + (s ? "left" : "top")), e.append(a)), i || (i = g("div", "swiper-slide-shadow-" + (s ? "right" : "bottom")), e.append(i)), a && (a.style.opacity = Math.max(-t, 0)), i && (i.style.opacity = Math.max(t, 0)) }; le({ effect: "cube", swiper: t, on: a, setTranslate: () => { const { el: e, wrapperEl: s, slides: a, width: r, height: n, rtlTranslate: l, size: o, browser: d } = t, c = t.params.cubeEffect, p = t.isHorizontal(), u = t.virtual && t.params.virtual.enabled; let m, h = 0; c.shadow && (p ? (m = t.slidesEl.querySelector(".swiper-cube-shadow"), m || (m = g("div", "swiper-cube-shadow"), t.slidesEl.append(m)), m.style.height = `${r}px`) : (m = e.querySelector(".swiper-cube-shadow"), m || (m = g("div", "swiper-cube-shadow"), e.append(m)))); for (let e = 0; e < a.length; e += 1) { const t = a[e]; let s = e; u && (s = parseInt(t.getAttribute("data-swiper-slide-index"), 10)); let r = 90 * s, n = Math.floor(r / 360); l && (r = -r, n = Math.floor(-r / 360)); const d = Math.max(Math.min(t.progress, 1), -1); let m = 0, f = 0, g = 0; s % 4 == 0 ? (m = 4 * -n * o, g = 0) : (s - 1) % 4 == 0 ? (m = 0, g = 4 * -n * o) : (s - 2) % 4 == 0 ? (m = o + 4 * n * o, g = o) : (s - 3) % 4 == 0 && (m = -o, g = 3 * o + 4 * o * n), l && (m = -m), p || (f = m, m = 0); const v = `rotateX(${p ? 0 : -r}deg) rotateY(${p ? r : 0}deg) translate3d(${m}px, ${f}px, ${g}px)`; d <= 1 && d > -1 && (h = 90 * s + 90 * d, l && (h = 90 * -s - 90 * d)), t.style.transform = v, c.slideShadows && i(t, d, p) } if (s.style.transformOrigin = `50% 50% -${o / 2}px`, s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`, c.shadow) if (p) m.style.transform = `translate3d(0px, ${r / 2 + c.shadowOffset}px, ${-r / 2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`; else { const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90), t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2), s = c.shadowScale, a = c.shadowScale / t, i = c.shadowOffset; m.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${n / 2 + i}px, ${-n / 2 / a}px) rotateX(-90deg)` } const f = (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0; s.style.transform = `translate3d(0px,0,${f}px) rotateX(${t.isHorizontal() ? 0 : h}deg) rotateY(${t.isHorizontal() ? -h : 0}deg)`, s.style.setProperty("--swiper-cube-translate-z", `${f}px`) }, setTransition: e => { const { el: s, slides: a } = t; if (a.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), t.params.cubeEffect.shadow && !t.isHorizontal()) { const t = s.querySelector(".swiper-cube-shadow"); t && (t.style.transitionDuration = `${e}ms`) } }, recreateShadows: () => { const e = t.isHorizontal(); t.slides.forEach((t => { const s = Math.max(Math.min(t.progress, 1), -1); i(t, s, e) })) }, getEffectParams: () => t.params.cubeEffect, perspective: () => !0, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ flipEffect: { slideShadows: !0, limitRotation: !0 } }); const i = (e, s, a) => { let i = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"), r = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom"); i || (i = ce(0, e, t.isHorizontal() ? "left" : "top")), r || (r = ce(0, e, t.isHorizontal() ? "right" : "bottom")), i && (i.style.opacity = Math.max(-s, 0)), r && (r.style.opacity = Math.max(s, 0)) }; le({ effect: "flip", swiper: t, on: a, setTranslate: () => { const { slides: e, rtlTranslate: s } = t, a = t.params.flipEffect; for (let r = 0; r < e.length; r += 1) { const n = e[r]; let l = n.progress; t.params.flipEffect.limitRotation && (l = Math.max(Math.min(n.progress, 1), -1)); const o = n.swiperSlideOffset; let d = -180 * l, c = 0, p = t.params.cssMode ? -o - t.translate : -o, u = 0; t.isHorizontal() ? s && (d = -d) : (u = p, p = 0, c = -d, d = 0), n.style.zIndex = -Math.abs(Math.round(l)) + e.length, a.slideShadows && i(n, l); const m = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`; oe(0, n).style.transform = m } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), de({ swiper: t, duration: e, transformElements: s }) }, recreateShadows: () => { t.params.flipEffect; t.slides.forEach((e => { let s = e.progress; t.params.flipEffect.limitRotation && (s = Math.max(Math.min(e.progress, 1), -1)), i(e, s) })) }, getEffectParams: () => t.params.flipEffect, perspective: () => !0, overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: !0 } }), le({ effect: "coverflow", swiper: t, on: a, setTranslate: () => { const { width: e, height: s, slides: a, slidesSizesGrid: i } = t, r = t.params.coverflowEffect, n = t.isHorizontal(), l = t.translate, o = n ? e / 2 - l : s / 2 - l, d = n ? r.rotate : -r.rotate, c = r.depth; for (let e = 0, t = a.length; e < t; e += 1) { const t = a[e], s = i[e], l = (o - t.swiperSlideOffset - s / 2) / s, p = "function" == typeof r.modifier ? r.modifier(l) : l * r.modifier; let u = n ? d * p : 0, m = n ? 0 : d * p, h = -c * Math.abs(p), f = r.stretch; "string" == typeof f && -1 !== f.indexOf("%") && (f = parseFloat(r.stretch) / 100 * s); let g = n ? 0 : f * p, v = n ? f * p : 0, w = 1 - (1 - r.scale) * Math.abs(p); Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(u) < .001 && (u = 0), Math.abs(m) < .001 && (m = 0), Math.abs(w) < .001 && (w = 0); const b = `translate3d(${v}px,${g}px,${h}px)  rotateX(${m}deg) rotateY(${u}deg) scale(${w})`; if (oe(0, t).style.transform = b, t.style.zIndex = 1 - Math.abs(Math.round(p)), r.slideShadows) { let e = n ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"), s = n ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom"); e || (e = ce(0, t, n ? "left" : "top")), s || (s = ce(0, t, n ? "right" : "bottom")), e && (e.style.opacity = p > 0 ? p : 0), s && (s.style.opacity = -p > 0 ? -p : 0) } } }, setTransition: e => { t.slides.map((e => h(e))).forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => { t.style.transitionDuration = `${e}ms` })) })) }, perspective: () => !0, overwriteParams: () => ({ watchSlidesProgress: !0 }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ creativeEffect: { limitProgress: 1, shadowPerProgress: !1, progressMultiplier: 1, perspective: !0, prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 }, next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 } } }); const i = e => "string" == typeof e ? e : `${e}px`; le({ effect: "creative", swiper: t, on: a, setTranslate: () => { const { slides: e, wrapperEl: s, slidesSizesGrid: a } = t, r = t.params.creativeEffect, { progressMultiplier: n } = r, l = t.params.centeredSlides; if (l) { const e = a[0] / 2 - t.params.slidesOffsetBefore || 0; s.style.transform = `translateX(calc(50% - ${e}px))` } for (let s = 0; s < e.length; s += 1) { const a = e[s], o = a.progress, d = Math.min(Math.max(a.progress, -r.limitProgress), r.limitProgress); let c = d; l || (c = Math.min(Math.max(a.originalProgress, -r.limitProgress), r.limitProgress)); const p = a.swiperSlideOffset, u = [t.params.cssMode ? -p - t.translate : -p, 0, 0], m = [0, 0, 0]; let h = !1; t.isHorizontal() || (u[1] = u[0], u[0] = 0); let f = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 }; d < 0 ? (f = r.next, h = !0) : d > 0 && (f = r.prev, h = !0), u.forEach(((e, t) => { u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d * n)}))` })), m.forEach(((e, t) => { m[t] = f.rotate[t] * Math.abs(d * n) })), a.style.zIndex = -Math.abs(Math.round(o)) + e.length; const g = u.join(", "), v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`, w = c < 0 ? `scale(${1 + (1 - f.scale) * c * n})` : `scale(${1 - (1 - f.scale) * c * n})`, b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n, y = `translate3d(${g}) ${v} ${w}`; if (h && f.shadow || !h) { let e = a.querySelector(".swiper-slide-shadow"); if (!e && f.shadow && (e = ce(0, a)), e) { const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d; e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1) } } const E = oe(0, a); E.style.transform = y, E.style.opacity = b, f.origin && (E.style.transformOrigin = f.origin) } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), de({ swiper: t, duration: e, transformElements: s, allSlides: !0 }) }, perspective: () => t.params.creativeEffect.perspective, overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode }) }) }, function (e) { let { swiper: t, extendParams: s, on: a } = e; s({ cardsEffect: { slideShadows: !0, rotate: !0, perSlideRotate: 2, perSlideOffset: 8 } }), le({ effect: "cards", swiper: t, on: a, setTranslate: () => { const { slides: e, activeIndex: s, rtlTranslate: a } = t, i = t.params.cardsEffect, { startTranslate: r, isTouched: n } = t.touchEventsData, l = a ? -t.translate : t.translate; for (let o = 0; o < e.length; o += 1) { const d = e[o], c = d.progress, p = Math.min(Math.max(c, -4), 4); let u = d.swiperSlideOffset; t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (u -= e[0].swiperSlideOffset); let m = t.params.cssMode ? -u - t.translate : -u, h = 0; const f = -100 * Math.abs(p); let g = 1, v = -i.perSlideRotate * p, w = i.perSlideOffset - .75 * Math.abs(p); const b = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o, y = (b === s || b === s - 1) && p > 0 && p < 1 && (n || t.params.cssMode) && l < r, E = (b === s || b === s + 1) && p < 0 && p > -1 && (n || t.params.cssMode) && l > r; if (y || E) { const e = (1 - Math.abs((Math.abs(p) - .5) / .5)) ** .5; v += -28 * p * e, g += -.5 * e, w += 96 * e, h = -25 * e * Math.abs(p) + "%" } if (m = p < 0 ? `calc(${m}px ${a ? "-" : "+"} (${w * Math.abs(p)}%))` : p > 0 ? `calc(${m}px ${a ? "-" : "+"} (-${w * Math.abs(p)}%))` : `${m}px`, !t.isHorizontal()) { const e = h; h = m, m = e } const x = p < 0 ? "" + (1 + (1 - g) * p) : "" + (1 - (1 - g) * p), S = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${i.rotate ? a ? -v : v : 0}deg)\n        scale(${x})\n      `; if (i.slideShadows) { let e = d.querySelector(".swiper-slide-shadow"); e || (e = ce(0, d)), e && (e.style.opacity = Math.min(Math.max((Math.abs(p) - .5) / .5, 0), 1)) } d.style.zIndex = -Math.abs(Math.round(c)) + e.length; oe(0, d).style.transform = S } }, setTransition: e => { const s = t.slides.map((e => h(e))); s.forEach((t => { t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t => { t.style.transitionDuration = `${e}ms` })) })), de({ swiper: t, duration: e, transformElements: s }) }, perspective: () => !0, overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode }) }) }]; return J.use(pe), J }));
//# sourceMappingURL=swiper-bundle.min.js.map
/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (e, t) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) { if (!e.document) throw new Error("jQuery requires a window with a document"); return t(e) } : t(e) }("undefined" != typeof window ? window : this, function (e, t) { "use strict"; var n = [], r = e.document, i = Object.getPrototypeOf, o = n.slice, a = n.concat, s = n.push, u = n.indexOf, l = {}, c = l.toString, f = l.hasOwnProperty, p = f.toString, d = p.call(Object), h = {}, g = function e(t) { return "function" == typeof t && "number" != typeof t.nodeType }, y = function e(t) { return null != t && t === t.window }, v = { type: !0, src: !0, noModule: !0 }; function m(e, t, n) { var i, o = (t = t || r).createElement("script"); if (o.text = e, n) for (i in v) n[i] && (o[i] = n[i]); t.head.appendChild(o).parentNode.removeChild(o) } function x(e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[c.call(e)] || "object" : typeof e } var b = "3.3.1", w = function (e, t) { return new w.fn.init(e, t) }, T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; w.fn = w.prototype = { jquery: "3.3.1", constructor: w, length: 0, toArray: function () { return o.call(this) }, get: function (e) { return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e] }, pushStack: function (e) { var t = w.merge(this.constructor(), e); return t.prevObject = this, t }, each: function (e) { return w.each(this, e) }, map: function (e) { return this.pushStack(w.map(this, function (t, n) { return e.call(t, n, t) })) }, slice: function () { return this.pushStack(o.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (e) { var t = this.length, n = +e + (e < 0 ? t : 0); return this.pushStack(n >= 0 && n < t ? [this[n]] : []) }, end: function () { return this.prevObject || this.constructor() }, push: s, sort: n.sort, splice: n.splice }, w.extend = w.fn.extend = function () { var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1; for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)if (null != (e = arguments[s])) for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r)); return a }, w.extend({ expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) { throw new Error(e) }, noop: function () { }, isPlainObject: function (e) { var t, n; return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof (n = f.call(t, "constructor") && t.constructor) && p.call(n) === d) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, globalEval: function (e) { m(e) }, each: function (e, t) { var n, r = 0; if (C(e)) { for (n = e.length; r < n; r++)if (!1 === t.call(e[r], r, e[r])) break } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break; return e }, trim: function (e) { return null == e ? "" : (e + "").replace(T, "") }, makeArray: function (e, t) { var n = t || []; return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n }, inArray: function (e, t, n) { return null == t ? -1 : u.call(t, e, n) }, merge: function (e, t) { for (var n = +t.length, r = 0, i = e.length; r < n; r++)e[i++] = t[r]; return e.length = i, e }, grep: function (e, t, n) { for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++)(r = !t(e[o], o)) !== s && i.push(e[o]); return i }, map: function (e, t, n) { var r, i, o = 0, s = []; if (C(e)) for (r = e.length; o < r; o++)null != (i = t(e[o], o, n)) && s.push(i); else for (o in e) null != (i = t(e[o], o, n)) && s.push(i); return a.apply([], s) }, guid: 1, support: h }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) { l["[object " + t + "]"] = t.toLowerCase() }); function C(e) { var t = !!e && "length" in e && e.length, n = x(e); return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e) } var E = function (e) { var t, n, r, i, o, a, s, u, l, c, f, p, d, h, g, y, v, m, x, b = "sizzle" + 1 * new Date, w = e.document, T = 0, C = 0, E = ae(), k = ae(), S = ae(), D = function (e, t) { return e === t && (f = !0), 0 }, N = {}.hasOwnProperty, A = [], j = A.pop, q = A.push, L = A.push, H = A.slice, O = function (e, t) { for (var n = 0, r = e.length; n < r; n++)if (e[n] === t) return n; return -1 }, P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]", W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)", $ = new RegExp(M + "+", "g"), B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), F = new RegExp("^" + M + "*," + M + "*"), _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"), X = new RegExp(W), U = new RegExp("^" + R + "$"), V = { ID: new RegExp("^#(" + R + ")"), CLASS: new RegExp("^\\.(" + R + ")"), TAG: new RegExp("^(" + R + "|[*])"), ATTR: new RegExp("^" + I), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + P + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") }, G = /^(?:input|select|textarea|button)$/i, Y = /^h\d$/i, Q = /^[^{]+\{\s*\[native \w/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, K = /[+~]/, Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"), ee = function (e, t, n) { var r = "0x" + t - 65536; return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320) }, te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ne = function (e, t) { return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e }, re = function () { p() }, ie = me(function (e) { return !0 === e.disabled && ("form" in e || "label" in e) }, { dir: "parentNode", next: "legend" }); try { L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType } catch (e) { L = { apply: A.length ? function (e, t) { q.apply(e, H.call(t)) } : function (e, t) { var n = e.length, r = 0; while (e[n++] = t[r++]); e.length = n - 1 } } } function oe(e, t, r, i) { var o, s, l, c, f, h, v, m = t && t.ownerDocument, T = t ? t.nodeType : 9; if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r; if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) { if (11 !== T && (f = J.exec(e))) if (o = f[1]) { if (9 === T) { if (!(l = t.getElementById(o))) return r; if (l.id === o) return r.push(l), r } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r } else { if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r; if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r } if (n.qsa && !S[e + " "] && (!y || !y.test(e))) { if (1 !== T) m = t, v = e; else if ("object" !== t.nodeName.toLowerCase()) { (c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), s = (h = a(e)).length; while (s--) h[s] = "#" + c + " " + ve(h[s]); v = h.join(","), m = K.test(e) && ge(t.parentNode) || t } if (v) try { return L.apply(r, m.querySelectorAll(v)), r } catch (e) { } finally { c === b && t.removeAttribute("id") } } } return u(e.replace(B, "$1"), t, r, i) } function ae() { var e = []; function t(n, i) { return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i } return t } function se(e) { return e[b] = !0, e } function ue(e) { var t = d.createElement("fieldset"); try { return !!e(t) } catch (e) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } } function le(e, t) { var n = e.split("|"), i = n.length; while (i--) r.attrHandle[n[i]] = t } function ce(e, t) { var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex; if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function fe(e) { return function (t) { return "input" === t.nodeName.toLowerCase() && t.type === e } } function pe(e) { return function (t) { var n = t.nodeName.toLowerCase(); return ("input" === n || "button" === n) && t.type === e } } function de(e) { return function (t) { return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e } } function he(e) { return se(function (t) { return t = +t, se(function (n, r) { var i, o = e([], n.length, t), a = o.length; while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i])) }) }) } function ge(e) { return e && "undefined" != typeof e.getElementsByTagName && e } n = oe.support = {}, o = oe.isXML = function (e) { var t = e && (e.ownerDocument || e).documentElement; return !!t && "HTML" !== t.nodeName }, p = oe.setDocument = function (e) { var t, i, a = e ? e.ownerDocument || e : w; return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, h = d.documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function (e) { return e.className = "i", !e.getAttribute("className") }), n.getElementsByTagName = ue(function (e) { return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length }), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function (e) { return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length }), n.getById ? (r.filter.ID = function (e) { var t = e.replace(Z, ee); return function (e) { return e.getAttribute("id") === t } }, r.find.ID = function (e, t) { if ("undefined" != typeof t.getElementById && g) { var n = t.getElementById(e); return n ? [n] : [] } }) : (r.filter.ID = function (e) { var t = e.replace(Z, ee); return function (e) { var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id"); return n && n.value === t } }, r.find.ID = function (e, t) { if ("undefined" != typeof t.getElementById && g) { var n, r, i, o = t.getElementById(e); if (o) { if ((n = o.getAttributeNode("id")) && n.value === e) return [o]; i = t.getElementsByName(e), r = 0; while (o = i[r++]) if ((n = o.getAttributeNode("id")) && n.value === e) return [o] } return [] } }), r.find.TAG = n.getElementsByTagName ? function (e, t) { return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0 } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, r.find.CLASS = n.getElementsByClassName && function (e, t) { if ("undefined" != typeof t.getElementsByClassName && g) return t.getElementsByClassName(e) }, v = [], y = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function (e) { h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]") }), ue(function (e) { e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>"; var t = d.createElement("input"); t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:") })), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function (e) { n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), v.push("!=", W) }), y = y.length && new RegExp(y.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, D = t ? function (e, t) { if (e === t) return f = !0, 0; var r = !e.compareDocumentPosition - !t.compareDocumentPosition; return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1) } : function (e, t) { if (e === t) return f = !0, 0; var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t]; if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0; if (i === o) return ce(e, t); n = e; while (n = n.parentNode) a.unshift(n); n = t; while (n = n.parentNode) s.unshift(n); while (a[r] === s[r]) r++; return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0 }, d) : d }, oe.matches = function (e, t) { return oe(e, null, null, t) }, oe.matchesSelector = function (e, t) { if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!y || !y.test(t))) try { var r = m.call(e, t); if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r } catch (e) { } return oe(t, d, null, [e]).length > 0 }, oe.contains = function (e, t) { return (e.ownerDocument || e) !== d && p(e), x(e, t) }, oe.attr = function (e, t) { (e.ownerDocument || e) !== d && p(e); var i = r.attrHandle[t.toLowerCase()], o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0; return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null }, oe.escape = function (e) { return (e + "").replace(te, ne) }, oe.error = function (e) { throw new Error("Syntax error, unrecognized expression: " + e) }, oe.uniqueSort = function (e) { var t, r = [], i = 0, o = 0; if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) { while (t = e[o++]) t === e[o] && (i = r.push(o)); while (i--) e.splice(r[i], 1) } return c = null, e }, i = oe.getText = function (e) { var t, n = "", r = 0, o = e.nodeType; if (o) { if (1 === o || 9 === o || 11 === o) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling)n += i(e) } else if (3 === o || 4 === o) return e.nodeValue } else while (t = e[r++]) n += i(t); return n }, (r = oe.selectors = { cacheLength: 50, createPseudo: se, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e }, PSEUDO: function (e) { var t, n = !e[6] && e[2]; return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3)) } }, filter: { TAG: function (e) { var t = e.replace(Z, ee).toLowerCase(); return "*" === e ? function () { return !0 } : function (e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function (e) { var t = E[e + " "]; return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function (e) { return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "") }) }, ATTR: function (e, t, n) { return function (r) { var i = oe.attr(r, e); return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-")) } }, CHILD: function (e, t, n, r, i) { var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t; return 1 === r && 0 === i ? function (e) { return !!e.parentNode } : function (t, n, u) { var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling", y = t.parentNode, v = s && t.nodeName.toLowerCase(), m = !u && !s, x = !1; if (y) { if (o) { while (g) { p = t; while (p = p[g]) if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1; h = g = "only" === e && !h && "nextSibling" } return !0 } if (h = [a ? y.firstChild : y.lastChild], a && m) { x = (d = (l = (c = (f = (p = y)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && y.childNodes[d]; while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) if (1 === p.nodeType && ++x && p === t) { c[e] = [T, d, x]; break } } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x) while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) && ++x && (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p === t)) break; return (x -= i) === r || x % r == 0 && x / r >= 0 } } }, PSEUDO: function (e, t) { var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e); return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function (e, n) { var r, o = i(e, t), a = o.length; while (a--) e[r = O(e, o[a])] = !(n[r] = o[a]) }) : function (e) { return i(e, 0, n) }) : i } }, pseudos: { not: se(function (e) { var t = [], n = [], r = s(e.replace(B, "$1")); return r[b] ? se(function (e, t, n, i) { var o, a = r(e, null, i, []), s = e.length; while (s--) (o = a[s]) && (e[s] = !(t[s] = o)) }) : function (e, i, o) { return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop() } }), has: se(function (e) { return function (t) { return oe(e, t).length > 0 } }), contains: se(function (e) { return e = e.replace(Z, ee), function (t) { return (t.textContent || t.innerText || i(t)).indexOf(e) > -1 } }), lang: se(function (e) { return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(), function (t) { var n; do { if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-") } while ((t = t.parentNode) && 1 === t.nodeType); return !1 } }), target: function (t) { var n = e.location && e.location.hash; return n && n.slice(1) === t.id }, root: function (e) { return e === h }, focus: function (e) { return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: de(!1), disabled: de(!0), checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6) return !1; return !0 }, parent: function (e) { return !r.pseudos.empty(e) }, header: function (e) { return Y.test(e.nodeName) }, input: function (e) { return G.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase()) }, first: he(function () { return [0] }), last: he(function (e, t) { return [t - 1] }), eq: he(function (e, t, n) { return [n < 0 ? n + t : n] }), even: he(function (e, t) { for (var n = 0; n < t; n += 2)e.push(n); return e }), odd: he(function (e, t) { for (var n = 1; n < t; n += 2)e.push(n); return e }), lt: he(function (e, t, n) { for (var r = n < 0 ? n + t : n; --r >= 0;)e.push(r); return e }), gt: he(function (e, t, n) { for (var r = n < 0 ? n + t : n; ++r < t;)e.push(r); return e }) } }).pseudos.nth = r.pseudos.eq; for (t in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) r.pseudos[t] = fe(t); for (t in { submit: !0, reset: !0 }) r.pseudos[t] = pe(t); function ye() { } ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, a = oe.tokenize = function (e, t) { var n, i, o, a, s, u, l, c = k[e + " "]; if (c) return t ? 0 : c.slice(0); s = e, u = [], l = r.preFilter; while (s) { n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({ value: n, type: i[0].replace(B, " ") }), s = s.slice(n.length)); for (a in r.filter) !(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({ value: n, type: a, matches: i }), s = s.slice(n.length)); if (!n) break } return t ? s.length : s ? oe.error(e) : k(e, u).slice(0) }; function ve(e) { for (var t = 0, n = e.length, r = ""; t < n; t++)r += e[t].value; return r } function me(e, t, n) { var r = t.dir, i = t.next, o = i || r, a = n && "parentNode" === o, s = C++; return t.first ? function (t, n, i) { while (t = t[r]) if (1 === t.nodeType || a) return e(t, n, i); return !1 } : function (t, n, u) { var l, c, f, p = [T, s]; if (u) { while (t = t[r]) if ((1 === t.nodeType || a) && e(t, n, u)) return !0 } else while (t = t[r]) if (1 === t.nodeType || a) if (f = t[b] || (t[b] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t; else { if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2]; if (c[o] = p, p[2] = e(t, n, u)) return !0 } return !1 } } function xe(e) { return e.length > 1 ? function (t, n, r) { var i = e.length; while (i--) if (!e[i](t, n, r)) return !1; return !0 } : e[0] } function be(e, t, n) { for (var r = 0, i = t.length; r < i; r++)oe(e, t[r], n); return n } function we(e, t, n, r, i) { for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s))); return a } function Te(e, t, n, r, i, o) { return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), se(function (o, a, s, u) { var l, c, f, p = [], d = [], h = a.length, g = o || be(t || "*", s.nodeType ? [s] : s, []), y = !e || !o && t ? g : we(g, p, e, s, u), v = n ? i || (o ? e : h || r) ? [] : a : y; if (n && n(y, v, s, u), r) { l = we(v, d), r(l, [], s, u), c = l.length; while (c--) (f = l[c]) && (v[d[c]] = !(y[d[c]] = f)) } if (o) { if (i || e) { if (i) { l = [], c = v.length; while (c--) (f = v[c]) && l.push(y[c] = f); i(null, v = [], l, u) } c = v.length; while (c--) (f = v[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f)) } } else v = we(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : L.apply(a, v) }) } function Ce(e) { for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function (e) { return e === t }, s, !0), f = me(function (e) { return O(t, e) > -1 }, s, !0), p = [function (e, n, r) { var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r)); return t = null, i }]; u < o; u++)if (n = r.relative[e[u].type]) p = [me(xe(p), n)]; else { if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) { for (i = ++u; i < o; i++)if (r.relative[e[i].type]) break; return Te(u > 1 && xe(p), u > 1 && ve(e.slice(0, u - 1).concat({ value: " " === e[u - 2].type ? "*" : "" })).replace(B, "$1"), n, u < i && Ce(e.slice(u, i)), i < o && Ce(e = e.slice(i)), i < o && ve(e)) } p.push(n) } return xe(p) } function Ee(e, t) { var n = t.length > 0, i = e.length > 0, o = function (o, a, s, u, c) { var f, h, y, v = 0, m = "0", x = o && [], b = [], w = l, C = o || i && r.find.TAG("*", c), E = T += null == w ? 1 : Math.random() || .1, k = C.length; for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) { if (i && f) { h = 0, a || f.ownerDocument === d || (p(f), s = !g); while (y = e[h++]) if (y(f, a || d, s)) { u.push(f); break } c && (T = E) } n && ((f = !y && f) && v--, o && x.push(f)) } if (v += m, n && m !== v) { h = 0; while (y = t[h++]) y(x, b, a, s); if (o) { if (v > 0) while (m--) x[m] || b[m] || (b[m] = j.call(u)); b = we(b) } L.apply(u, b), c && !o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u) } return c && (T = E, l = w), x }; return n ? se(o) : o } return s = oe.compile = function (e, t) { var n, r = [], i = [], o = S[e + " "]; if (!o) { t || (t = a(e)), n = t.length; while (n--) (o = Ce(t[n]))[b] ? r.push(o) : i.push(o); (o = S(e, Ee(i, r))).selector = e } return o }, u = oe.select = function (e, t, n, i) { var o, u, l, c, f, p = "function" == typeof e && e, d = !i && a(e = p.selector || e); if (n = n || [], 1 === d.length) { if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) { if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n; p && (t = t.parentNode), e = e.slice(u.shift().value.length) } o = V.needsContext.test(e) ? 0 : u.length; while (o--) { if (l = u[o], r.relative[c = l.type]) break; if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) { if (u.splice(o, 1), !(e = i.length && ve(u))) return L.apply(n, i), n; break } } } return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n }, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function (e) { return 1 & e.compareDocumentPosition(d.createElement("fieldset")) }), ue(function (e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || le("type|href|height|width", function (e, t, n) { if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2) }), n.attributes && ue(function (e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || le("value", function (e, t, n) { if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue }), ue(function (e) { return null == e.getAttribute("disabled") }) || le(P, function (e, t, n) { var r; if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }), oe }(e); w.find = E, w.expr = E.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = E.uniqueSort, w.text = E.getText, w.isXMLDoc = E.isXML, w.contains = E.contains, w.escapeSelector = E.escape; var k = function (e, t, n) { var r = [], i = void 0 !== n; while ((e = e[t]) && 9 !== e.nodeType) if (1 === e.nodeType) { if (i && w(e).is(n)) break; r.push(e) } return r }, S = function (e, t) { for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e); return n }, D = w.expr.match.needsContext; function N(e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() } var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; function j(e, t, n) { return g(t) ? w.grep(e, function (e, r) { return !!t.call(e, r, e) !== n }) : t.nodeType ? w.grep(e, function (e) { return e === t !== n }) : "string" != typeof t ? w.grep(e, function (e) { return u.call(t, e) > -1 !== n }) : w.filter(t, e, n) } w.filter = function (e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) { return 1 === e.nodeType })) }, w.fn.extend({ find: function (e) { var t, n, r = this.length, i = this; if ("string" != typeof e) return this.pushStack(w(e).filter(function () { for (t = 0; t < r; t++)if (w.contains(i[t], this)) return !0 })); for (n = this.pushStack([]), t = 0; t < r; t++)w.find(e, i[t], n); return r > 1 ? w.uniqueSort(n) : n }, filter: function (e) { return this.pushStack(j(this, e || [], !1)) }, not: function (e) { return this.pushStack(j(this, e || [], !0)) }, is: function (e) { return !!j(this, "string" == typeof e && D.test(e) ? w(e) : e || [], !1).length } }); var q, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/; (w.fn.init = function (e, t, n) { var i, o; if (!e) return this; if (n = n || q, "string" == typeof e) { if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e); if (i[1]) { if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), A.test(i[1]) && w.isPlainObject(t)) for (i in t) g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]); return this } return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this } return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this) }).prototype = w.fn, q = w(r); var H = /^(?:parents|prev(?:Until|All))/, O = { children: !0, contents: !0, next: !0, prev: !0 }; w.fn.extend({ has: function (e) { var t = w(e, this), n = t.length; return this.filter(function () { for (var e = 0; e < n; e++)if (w.contains(this, t[e])) return !0 }) }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = "string" != typeof e && w(e); if (!D.test(e)) for (; r < i; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) { o.push(n); break } return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o) }, index: function (e) { return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t)))) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }); function P(e, t) { while ((e = e[t]) && 1 !== e.nodeType); return e } w.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return k(e, "parentNode") }, parentsUntil: function (e, t, n) { return k(e, "parentNode", n) }, next: function (e) { return P(e, "nextSibling") }, prev: function (e) { return P(e, "previousSibling") }, nextAll: function (e) { return k(e, "nextSibling") }, prevAll: function (e) { return k(e, "previousSibling") }, nextUntil: function (e, t, n) { return k(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return k(e, "previousSibling", n) }, siblings: function (e) { return S((e.parentNode || {}).firstChild, e) }, children: function (e) { return S(e.firstChild) }, contents: function (e) { return N(e, "iframe") ? e.contentDocument : (N(e, "template") && (e = e.content || e), w.merge([], e.childNodes)) } }, function (e, t) { w.fn[e] = function (n, r) { var i = w.map(this, t, n); return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (O[e] || w.uniqueSort(i), H.test(e) && i.reverse()), this.pushStack(i) } }); var M = /[^\x20\t\r\n\f]+/g; function R(e) { var t = {}; return w.each(e.match(M) || [], function (e, n) { t[n] = !0 }), t } w.Callbacks = function (e) { e = "string" == typeof e ? R(e) : w.extend({}, e); var t, n, r, i, o = [], a = [], s = -1, u = function () { for (i = i || e.once, r = t = !0; a.length; s = -1) { n = a.shift(); while (++s < o.length) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1) } e.memory || (n = !1), t = !1, i && (o = n ? [] : "") }, l = { add: function () { return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) { w.each(n, function (n, r) { g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r) }) }(arguments), n && !t && u()), this }, remove: function () { return w.each(arguments, function (e, t) { var n; while ((n = w.inArray(t, o, n)) > -1) o.splice(n, 1), n <= s && s-- }), this }, has: function (e) { return e ? w.inArray(e, o) > -1 : o.length > 0 }, empty: function () { return o && (o = []), this }, disable: function () { return i = a = [], o = n = "", this }, disabled: function () { return !o }, lock: function () { return i = a = [], n || t || (o = n = ""), this }, locked: function () { return !!i }, fireWith: function (e, n) { return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this }, fire: function () { return l.fireWith(this, arguments), this }, fired: function () { return !!r } }; return l }; function I(e) { return e } function W(e) { throw e } function $(e, t, n, r) { var i; try { e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r)) } catch (e) { n.apply(void 0, [e]) } } w.extend({ Deferred: function (t) { var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]], r = "pending", i = { state: function () { return r }, always: function () { return o.done(arguments).fail(arguments), this }, "catch": function (e) { return i.then(null, e) }, pipe: function () { var e = arguments; return w.Deferred(function (t) { w.each(n, function (n, r) { var i = g(e[r[4]]) && e[r[4]]; o[r[1]](function () { var e = i && i.apply(this, arguments); e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments) }) }), e = null }).promise() }, then: function (t, r, i) { var o = 0; function a(t, n, r, i) { return function () { var s = this, u = arguments, l = function () { var e, l; if (!(t < o)) { if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution"); l = e && ("object" == typeof e || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, I, i), a(o, n, W, i)) : (o++, l.call(e, a(o, n, I, i), a(o, n, W, i), a(o, n, I, n.notifyWith))) : (r !== I && (s = void 0, u = [e]), (i || n.resolveWith)(s, u)) } }, c = i ? l : function () { try { l() } catch (e) { w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== W && (s = void 0, u = [e]), n.rejectWith(s, u)) } }; t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), e.setTimeout(c)) } } return w.Deferred(function (e) { n[0][3].add(a(0, e, g(i) ? i : I, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : I)), n[2][3].add(a(0, e, g(r) ? r : W)) }).promise() }, promise: function (e) { return null != e ? w.extend(e, i) : i } }, o = {}; return w.each(n, function (e, t) { var a = t[2], s = t[5]; i[t[1]] = a.add, s && a.add(function () { r = s }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function () { return o[t[0] + "With"](this === o ? void 0 : this, arguments), this }, o[t[0] + "With"] = a.fireWith }), i.promise(o), t && t.call(o, o), o }, when: function (e) { var t = arguments.length, n = t, r = Array(n), i = o.call(arguments), a = w.Deferred(), s = function (e) { return function (n) { r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i) } }; if (t <= 1 && ($(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then(); while (n--) $(i[n], s(n), a.reject); return a.promise() } }); var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/; w.Deferred.exceptionHook = function (t, n) { e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n) }, w.readyException = function (t) { e.setTimeout(function () { throw t }) }; var F = w.Deferred(); w.fn.ready = function (e) { return F.then(e)["catch"](function (e) { w.readyException(e) }), this }, w.extend({ isReady: !1, readyWait: 1, ready: function (e) { (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || F.resolveWith(r, [w])) } }), w.ready.then = F.then; function _() { r.removeEventListener("DOMContentLoaded", _), e.removeEventListener("load", _), w.ready() } "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", _), e.addEventListener("load", _)); var z = function (e, t, n, r, i, o, a) { var s = 0, u = e.length, l = null == n; if ("object" === x(n)) { i = !0; for (s in n) z(e, t, s, n[s], !0, o, a) } else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) { return l.call(w(e), n) })), t)) for (; s < u; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n))); return i ? e : l ? t.call(e) : u ? t(e[0], n) : o }, X = /^-ms-/, U = /-([a-z])/g; function V(e, t) { return t.toUpperCase() } function G(e) { return e.replace(X, "ms-").replace(U, V) } var Y = function (e) { return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType }; function Q() { this.expando = w.expando + Q.uid++ } Q.uid = 1, Q.prototype = { cache: function (e) { var t = e[this.expando]; return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t }, set: function (e, t, n) { var r, i = this.cache(e); if ("string" == typeof t) i[G(t)] = n; else for (r in t) i[G(r)] = t[r]; return i }, get: function (e, t) { return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)] }, access: function (e, t, n) { return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t) }, remove: function (e, t) { var n, r = e[this.expando]; if (void 0 !== r) { if (void 0 !== t) { n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(M) || []).length; while (n--) delete r[t[n]] } (void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]) } }, hasData: function (e) { var t = e[this.expando]; return void 0 !== t && !w.isEmptyObject(t) } }; var J = new Q, K = new Q, Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ee = /[A-Z]/g; function te(e) { return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Z.test(e) ? JSON.parse(e) : e) } function ne(e, t, n) { var r; if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) { try { n = te(n) } catch (e) { } K.set(e, t, n) } else n = void 0; return n } w.extend({ hasData: function (e) { return K.hasData(e) || J.hasData(e) }, data: function (e, t, n) { return K.access(e, t, n) }, removeData: function (e, t) { K.remove(e, t) }, _data: function (e, t, n) { return J.access(e, t, n) }, _removeData: function (e, t) { J.remove(e, t) } }), w.fn.extend({ data: function (e, t) { var n, r, i, o = this[0], a = o && o.attributes; if (void 0 === e) { if (this.length && (i = K.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) { n = a.length; while (n--) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = G(r.slice(5)), ne(o, r, i[r])); J.set(o, "hasDataAttrs", !0) } return i } return "object" == typeof e ? this.each(function () { K.set(this, e) }) : z(this, function (t) { var n; if (o && void 0 === t) { if (void 0 !== (n = K.get(o, e))) return n; if (void 0 !== (n = ne(o, e))) return n } else this.each(function () { K.set(this, e, t) }) }, null, t, arguments.length > 1, null, !0) }, removeData: function (e) { return this.each(function () { K.remove(this, e) }) } }), w.extend({ queue: function (e, t, n) { var r; if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || Array.isArray(n) ? r = J.access(e, t, w.makeArray(n)) : r.push(n)), r || [] }, dequeue: function (e, t) { t = t || "fx"; var n = w.queue(e, t), r = n.length, i = n.shift(), o = w._queueHooks(e, t), a = function () { w.dequeue(e, t) }; "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return J.get(e, n) || J.access(e, n, { empty: w.Callbacks("once memory").add(function () { J.remove(e, [t + "queue", n]) }) }) } }), w.fn.extend({ queue: function (e, t) { var n = 2; return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () { var n = w.queue(this, e, t); w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e) }) }, dequeue: function (e) { return this.each(function () { w.dequeue(this, e) }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, t) { var n, r = 1, i = w.Deferred(), o = this, a = this.length, s = function () { --r || i.resolveWith(o, [o]) }; "string" != typeof e && (t = e, e = void 0), e = e || "fx"; while (a--) (n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s)); return s(), i.promise(t) } }); var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"), oe = ["Top", "Right", "Bottom", "Left"], ae = function (e, t) { return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display") }, se = function (e, t, n, r) { var i, o, a = {}; for (o in t) a[o] = e.style[o], e.style[o] = t[o]; i = n.apply(e, r || []); for (o in t) e.style[o] = a[o]; return i }; function ue(e, t, n, r) { var i, o, a = 20, s = r ? function () { return r.cur() } : function () { return w.css(e, t, "") }, u = s(), l = n && n[3] || (w.cssNumber[t] ? "" : "px"), c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t)); if (c && c[3] !== l) { u /= 2, l = l || c[3], c = +u || 1; while (a--) w.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o; c *= 2, w.style(e, t, c + l), n = n || [] } return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i } var le = {}; function ce(e) { var t, n = e.ownerDocument, r = e.nodeName, i = le[r]; return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i) } function fe(e, t) { for (var n, r, i = [], o = 0, a = e.length; o < a; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = J.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && ae(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", J.set(r, "display", n))); for (o = 0; o < a; o++)null != i[o] && (e[o].style.display = i[o]); return e } w.fn.extend({ show: function () { return fe(this, !0) }, hide: function () { return fe(this) }, toggle: function (e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () { ae(this) ? w(this).show() : w(this).hide() }) } }); var pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, he = /^$|^module$|\/(?:java|ecma)script/i, ge = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] }; ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td; function ye(e, t) { var n; return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && N(e, t) ? w.merge([e], n) : n } function ve(e, t) { for (var n = 0, r = e.length; n < r; n++)J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval")) } var me = /<|&#?\w+;/; function xe(e, t, n, r, i) { for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)if ((o = e[d]) || 0 === o) if ("object" === x(o)) w.merge(p, o.nodeType ? [o] : o); else if (me.test(o)) { a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0]; while (c--) a = a.lastChild; w.merge(p, a.childNodes), (a = f.firstChild).textContent = "" } else p.push(t.createTextNode(o)); f.textContent = "", d = 0; while (o = p[d++]) if (r && w.inArray(o, r) > -1) i && i.push(o); else if (l = w.contains(o.ownerDocument, o), a = ye(f.appendChild(o), "script"), l && ve(a), n) { c = 0; while (o = a[c++]) he.test(o.type || "") && n.push(o) } return f } !function () { var e = r.createDocumentFragment().appendChild(r.createElement("div")), t = r.createElement("input"); t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue }(); var be = r.documentElement, we = /^key/, Te = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ce = /^([^.]*)(?:\.(.+)|)/; function Ee() { return !0 } function ke() { return !1 } function Se() { try { return r.activeElement } catch (e) { } } function De(e, t, n, r, i, o) { var a, s; if ("object" == typeof t) { "string" != typeof n && (r = r || n, n = void 0); for (s in t) De(e, s, n, r, t[s], o); return e } if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke; else if (!i) return e; return 1 === o && (a = i, (i = function (e) { return w().off(e), a.apply(this, arguments) }).guid = a.guid || (a.guid = w.guid++)), e.each(function () { w.event.add(this, t, i, r, n) }) } w.event = { global: {}, add: function (e, t, n, r, i) { var o, a, s, u, l, c, f, p, d, h, g, y = J.get(e); if (y) { n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(be, i), n.guid || (n.guid = w.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function (t) { return "undefined" != typeof w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0 }), l = (t = (t || "").match(M) || [""]).length; while (l--) d = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, c = w.extend({ type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && w.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), w.event.global[d] = !0) } }, remove: function (e, t, n, r, i) { var o, a, s, u, l, c, f, p, d, h, g, y = J.hasData(e) && J.get(e); if (y && (u = y.events)) { l = (t = (t || "").match(M) || [""]).length; while (l--) if (s = Ce.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) { f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c)); a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || w.removeEvent(e, d, y.handle), delete u[d]) } else for (d in u) w.event.remove(e, d + t[l], n, r, !0); w.isEmptyObject(u) && J.remove(e, "handle events") } }, dispatch: function (e) { var t = w.event.fix(e), n, r, i, o, a, s, u = new Array(arguments.length), l = (J.get(this, "events") || {})[t.type] || [], c = w.event.special[t.type] || {}; for (u[0] = t, n = 1; n < arguments.length; n++)u[n] = arguments[n]; if (t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) { s = w.event.handlers.call(this, t, l), n = 0; while ((o = s[n++]) && !t.isPropagationStopped()) { t.currentTarget = o.elem, r = 0; while ((a = o.handlers[r++]) && !t.isImmediatePropagationStopped()) t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, void 0 !== (i = ((w.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, t), t.result } }, handlers: function (e, t) { var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target; if (u && l.nodeType && !("click" === e.type && e.button >= 1)) for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) { for (o = [], a = {}, n = 0; n < u; n++)void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), a[i] && o.push(r); o.length && s.push({ elem: l, handlers: o }) } return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s }, addProp: function (e, t) { Object.defineProperty(w.Event.prototype, e, { enumerable: !0, configurable: !0, get: g(t) ? function () { if (this.originalEvent) return t(this.originalEvent) } : function () { if (this.originalEvent) return this.originalEvent[e] }, set: function (t) { Object.defineProperty(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) } }) }, fix: function (e) { return e[w.expando] ? e : new w.Event(e) }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== Se() && this.focus) return this.focus(), !1 }, delegateType: "focusin" }, blur: { trigger: function () { if (this === Se() && this.blur) return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function () { if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1 }, _default: function (e) { return N(e.target, "a") } }, beforeunload: { postDispatch: function (e) { void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result) } } } }, w.removeEvent = function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n) }, w.Event = function (e, t) { if (!(this instanceof w.Event)) return new w.Event(e, t); e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0 }, w.Event.prototype = { constructor: w.Event, isDefaultPrevented: ke, isPropagationStopped: ke, isImmediatePropagationStopped: ke, isSimulated: !1, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault() }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation() }, stopImmediatePropagation: function () { var e = this.originalEvent; this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation() } }, w.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function (e) { var t = e.button; return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Te.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which } }, w.event.addProp), w.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) { w.event.special[e] = { delegateType: t, bindType: t, handle: function (e) { var n, r = this, i = e.relatedTarget, o = e.handleObj; return i && (i === r || w.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n } } }), w.fn.extend({ on: function (e, t, n, r) { return De(this, e, t, n, r) }, one: function (e, t, n, r) { return De(this, e, t, n, r, 1) }, off: function (e, t, n) { var r, i; if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this; if ("object" == typeof e) { for (i in e) this.off(i, t, e[i]); return this } return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function () { w.event.remove(this, e, n, t) }) } }); var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, Ae = /<script|<style|<link/i, je = /checked\s*(?:[^=]|=\s*.checked.)/i, qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; function Le(e, t) { return N(e, "table") && N(11 !== t.nodeType ? t : t.firstChild, "tr") ? w(e).children("tbody")[0] || e : e } function He(e) { return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e } function Oe(e) { return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e } function Pe(e, t) { var n, r, i, o, a, s, u, l; if (1 === t.nodeType) { if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), l = o.events)) { delete a.handle, a.events = {}; for (i in l) for (n = 0, r = l[i].length; n < r; n++)w.event.add(t, i, l[i][n]) } K.hasData(e) && (s = K.access(e), u = w.extend({}, s), K.set(t, u)) } } function Me(e, t) { var n = t.nodeName.toLowerCase(); "input" === n && pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue) } function Re(e, t, n, r) { t = a.apply([], t); var i, o, s, u, l, c, f = 0, p = e.length, d = p - 1, y = t[0], v = g(y); if (v || p > 1 && "string" == typeof y && !h.checkClone && je.test(y)) return e.each(function (i) { var o = e.eq(i); v && (t[0] = y.call(this, i, o.html())), Re(o, t, n, r) }); if (p && (i = xe(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) { for (u = (s = w.map(ye(i, "script"), He)).length; f < p; f++)l = i, f !== d && (l = w.clone(l, !0, !0), u && w.merge(s, ye(l, "script"))), n.call(e[f], l, f); if (u) for (c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0; f < u; f++)l = s[f], he.test(l.type || "") && !J.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(l.src) : m(l.textContent.replace(qe, ""), c, l)) } return e } function Ie(e, t, n) { for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++)n || 1 !== r.nodeType || w.cleanData(ye(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ye(r, "script")), r.parentNode.removeChild(r)); return e } w.extend({ htmlPrefilter: function (e) { return e.replace(Ne, "<$1></$2>") }, clone: function (e, t, n) { var r, i, o, a, s = e.cloneNode(!0), u = w.contains(e.ownerDocument, e); if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e))) for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++)Me(o[r], a[r]); if (t) if (n) for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++)Pe(o[r], a[r]); else Pe(e, s); return (a = ye(s, "script")).length > 0 && ve(a, !u && ye(e, "script")), s }, cleanData: function (e) { for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++)if (Y(n)) { if (t = n[J.expando]) { if (t.events) for (r in t.events) i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle); n[J.expando] = void 0 } n[K.expando] && (n[K.expando] = void 0) } } }), w.fn.extend({ detach: function (e) { return Ie(this, e, !0) }, remove: function (e) { return Ie(this, e) }, text: function (e) { return z(this, function (e) { return void 0 === e ? w.text(this) : this.empty().each(function () { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e) }) }, null, e, arguments.length) }, append: function () { return Re(this, arguments, function (e) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e) }) }, prepend: function () { return Re(this, arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Le(this, e); t.insertBefore(e, t.firstChild) } }) }, before: function () { return Re(this, arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return Re(this, arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, empty: function () { for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (w.cleanData(ye(e, !1)), e.textContent = ""); return this }, clone: function (e, t) { return e = null != e && e, t = null == t ? e : t, this.map(function () { return w.clone(this, e, t) }) }, html: function (e) { return z(this, function (e) { var t = this[0] || {}, n = 0, r = this.length; if (void 0 === e && 1 === t.nodeType) return t.innerHTML; if ("string" == typeof e && !Ae.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) { e = w.htmlPrefilter(e); try { for (; n < r; n++)1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)), t.innerHTML = e); t = 0 } catch (e) { } } t && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function () { var e = []; return Re(this, arguments, function (t) { var n = this.parentNode; w.inArray(this, e) < 0 && (w.cleanData(ye(this)), n && n.replaceChild(t, this)) }, e) } }), w.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) { w.fn[e] = function (e) { for (var n, r = [], i = w(e), o = i.length - 1, a = 0; a <= o; a++)n = a === o ? this : this.clone(!0), w(i[a])[t](n), s.apply(r, n.get()); return this.pushStack(r) } }); var We = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"), $e = function (t) { var n = t.ownerDocument.defaultView; return n && n.opener || (n = e), n.getComputedStyle(t) }, Be = new RegExp(oe.join("|"), "i"); !function () { function t() { if (c) { l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", be.appendChild(l).appendChild(c); var t = e.getComputedStyle(c); i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", be.removeChild(l), c = null } } function n(e) { return Math.round(parseFloat(e)) } var i, o, a, s, u, l = r.createElement("div"), c = r.createElement("div"); c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(h, { boxSizingReliable: function () { return t(), o }, pixelBoxStyles: function () { return t(), s }, pixelPosition: function () { return t(), i }, reliableMarginLeft: function () { return t(), u }, scrollboxSize: function () { return t(), a } })) }(); function Fe(e, t, n) { var r, i, o, a, s = e.style; return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (a = w.style(e, t)), !h.pixelBoxStyles() && We.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a } function _e(e, t) { return { get: function () { if (!e()) return (this.get = t).apply(this, arguments); delete this.get } } } var ze = /^(none|table(?!-c[ea]).+)/, Xe = /^--/, Ue = { position: "absolute", visibility: "hidden", display: "block" }, Ve = { letterSpacing: "0", fontWeight: "400" }, Ge = ["Webkit", "Moz", "ms"], Ye = r.createElement("div").style; function Qe(e) { if (e in Ye) return e; var t = e[0].toUpperCase() + e.slice(1), n = Ge.length; while (n--) if ((e = Ge[n] + t) in Ye) return e } function Je(e) { var t = w.cssProps[e]; return t || (t = w.cssProps[e] = Qe(e) || e), t } function Ke(e, t, n) { var r = ie.exec(t); return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t } function Ze(e, t, n, r, i, o) { var a = "width" === t ? 1 : 0, s = 0, u = 0; if (n === (r ? "border" : "content")) return 0; for (; a < 4; a += 2)"margin" === n && (u += w.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[a] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[a] + "Width", !0, i) : s += w.css(e, "border" + oe[a] + "Width", !0, i)); return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u } function et(e, t, n) { var r = $e(e), i = Fe(e, t, r), o = "border-box" === w.css(e, "boxSizing", !1, r), a = o; if (We.test(i)) { if (!n) return i; i = "auto" } return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), a, r, i) + "px" } w.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = Fe(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function (e, t, n, r) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var i, o, a, s = G(t), u = Xe.test(t), l = e.style; if (u || (t = Je(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t]; "string" == (o = typeof n) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n)) } }, css: function (e, t, n, r) { var i, o, a, s = G(t); return Xe.test(t) || (t = Je(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Fe(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i } }), w.each(["height", "width"], function (e, t) { w.cssHooks[t] = { get: function (e, n, r) { if (n) return !ze.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : se(e, Ue, function () { return et(e, t, r) }) }, set: function (e, n, r) { var i, o = $e(e), a = "border-box" === w.css(e, "boxSizing", !1, o), s = r && Ze(e, t, r, a, o); return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ke(e, n, s) } } }), w.cssHooks.marginLeft = _e(h.reliableMarginLeft, function (e, t) { if (t) return (parseFloat(Fe(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, { marginLeft: 0 }, function () { return e.getBoundingClientRect().left })) + "px" }), w.each({ margin: "", padding: "", border: "Width" }, function (e, t) { w.cssHooks[e + t] = { expand: function (n) { for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)i[e + oe[r] + t] = o[r] || o[r - 2] || o[0]; return i } }, "margin" !== e && (w.cssHooks[e + t].set = Ke) }), w.fn.extend({ css: function (e, t) { return z(this, function (e, t, n) { var r, i, o = {}, a = 0; if (Array.isArray(t)) { for (r = $e(e), i = t.length; a < i; a++)o[t[a]] = w.css(e, t[a], !1, r); return o } return void 0 !== n ? w.style(e, t, n) : w.css(e, t) }, e, t, arguments.length > 1) } }); function tt(e, t, n, r, i) { return new tt.prototype.init(e, t, n, r, i) } w.Tween = tt, tt.prototype = { constructor: tt, init: function (e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px") }, cur: function () { var e = tt.propHooks[this.prop]; return e && e.get ? e.get(this) : tt.propHooks._default.get(this) }, run: function (e) { var t, n = tt.propHooks[this.prop]; return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this } }, tt.prototype.init.prototype = tt.prototype, tt.propHooks = { _default: { get: function (e) { var t; return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 }, set: function (e) { w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit) } } }, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = { set: function (e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, w.easing = { linear: function (e) { return e }, swing: function (e) { return .5 - Math.cos(e * Math.PI) / 2 }, _default: "swing" }, w.fx = tt.prototype.init, w.fx.step = {}; var nt, rt, it = /^(?:toggle|show|hide)$/, ot = /queueHooks$/; function at() { rt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(at) : e.setTimeout(at, w.fx.interval), w.fx.tick()) } function st() { return e.setTimeout(function () { nt = void 0 }), nt = Date.now() } function ut(e, t) { var n, r = 0, i = { height: e }; for (t = t ? 1 : 0; r < 4; r += 2 - t)i["margin" + (n = oe[r])] = i["padding" + n] = e; return t && (i.opacity = i.width = e), i } function lt(e, t, n) { for (var r, i = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, a = i.length; o < a; o++)if (r = i[o].call(n, t, e)) return r } function ct(e, t, n) { var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t, p = this, d = {}, h = e.style, g = e.nodeType && ae(e), y = J.get(e, "fxshow"); n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () { a.unqueued || s() }), a.unqueued++, p.always(function () { p.always(function () { a.unqueued--, w.queue(e, "fx").length || a.empty.fire() }) })); for (r in t) if (i = t[r], it.test(i)) { if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) { if ("show" !== i || !y || void 0 === y[r]) continue; g = !0 } d[r] = y && y[r] || w.style(e, r) } if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d)) { f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = J.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = w.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function () { h.display = l }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () { h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2] })), u = !1; for (r in d) u || (y ? "hidden" in y && (g = y.hidden) : y = J.access(e, "fxshow", { display: l }), o && (y.hidden = !g), g && fe([e], !0), p.done(function () { g || fe([e]), J.remove(e, "fxshow"); for (r in d) w.style(e, r, d[r]) })), u = lt(g ? y[r] : 0, r, p), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0)) } } function ft(e, t) { var n, r, i, o, a; for (n in e) if (r = G(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = w.cssHooks[r]) && "expand" in a) { o = a.expand(o), delete e[r]; for (n in o) n in e || (e[n] = o[n], t[n] = i) } else t[r] = i } function pt(e, t, n) { var r, i, o = 0, a = pt.prefilters.length, s = w.Deferred().always(function () { delete u.elem }), u = function () { if (i) return !1; for (var t = nt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++)l.tweens[o].run(r); return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1) }, l = s.promise({ elem: e, props: w.extend({}, t), opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, n), originalProperties: t, originalOptions: n, startTime: nt || st(), duration: n.duration, tweens: [], createTween: function (t, n) { var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing); return l.tweens.push(r), r }, stop: function (t) { var n = 0, r = t ? l.tweens.length : 0; if (i) return this; for (i = !0; n < r; n++)l.tweens[n].run(1); return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this } }), c = l.props; for (ft(c, l.opts.specialEasing); o < a; o++)if (r = pt.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r; return w.map(c, lt, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l } w.Animation = w.extend(pt, { tweeners: { "*": [function (e, t) { var n = this.createTween(e, t); return ue(n.elem, e, ie.exec(t), n), n }] }, tweener: function (e, t) { g(e) ? (t = e, e = ["*"]) : e = e.match(M); for (var n, r = 0, i = e.length; r < i; r++)n = e[r], pt.tweeners[n] = pt.tweeners[n] || [], pt.tweeners[n].unshift(t) }, prefilters: [ct], prefilter: function (e, t) { t ? pt.prefilters.unshift(e) : pt.prefilters.push(e) } }), w.speed = function (e, t, n) { var r = e && "object" == typeof e ? w.extend({}, e) : { complete: n || !n && t || g(e) && e, duration: e, easing: n && t || t && !g(t) && t }; return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () { g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue) }, r }, w.fn.extend({ fadeTo: function (e, t, n, r) { return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function (e, t, n, r) { var i = w.isEmptyObject(e), o = w.speed(t, n, r), a = function () { var t = pt(this, w.extend({}, e), o); (i || J.get(this, "finish")) && t.stop(!0) }; return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a) }, stop: function (e, t, n) { var r = function (e) { var t = e.stop; delete e.stop, t(n) }; return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () { var t = !0, i = null != e && e + "queueHooks", o = w.timers, a = J.get(this); if (i) a[i] && a[i].stop && r(a[i]); else for (i in a) a[i] && a[i].stop && ot.test(i) && r(a[i]); for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1)); !t && n || w.dequeue(this, e) }) }, finish: function (e) { return !1 !== e && (e = e || "fx"), this.each(function () { var t, n = J.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = w.timers, a = r ? r.length : 0; for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1)); for (t = 0; t < a; t++)r[t] && r[t].finish && r[t].finish.call(this); delete n.finish }) } }), w.each(["toggle", "show", "hide"], function (e, t) { var n = w.fn[t]; w.fn[t] = function (e, r, i) { return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i) } }), w.each({ slideDown: ut("show"), slideUp: ut("hide"), slideToggle: ut("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) { w.fn[e] = function (e, n, r) { return this.animate(t, e, n, r) } }), w.timers = [], w.fx.tick = function () { var e, t = 0, n = w.timers; for (nt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1); n.length || w.fx.stop(), nt = void 0 }, w.fx.timer = function (e) { w.timers.push(e), w.fx.start() }, w.fx.interval = 13, w.fx.start = function () { rt || (rt = !0, at()) }, w.fx.stop = function () { rt = null }, w.fx.speeds = { slow: 600, fast: 200, _default: 400 }, w.fn.delay = function (t, n) { return t = w.fx ? w.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) { var i = e.setTimeout(n, t); r.stop = function () { e.clearTimeout(i) } }) }, function () { var e = r.createElement("input"), t = r.createElement("select").appendChild(r.createElement("option")); e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value }(); var dt, ht = w.expr.attrHandle; w.fn.extend({ attr: function (e, t) { return z(this, w.attr, e, t, arguments.length > 1) }, removeAttr: function (e) { return this.each(function () { w.removeAttr(this, e) }) } }), w.extend({ attr: function (e, t, n) { var r, i, o = e.nodeType; if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r) }, attrHooks: { type: { set: function (e, t) { if (!h.radioValue && "radio" === t && N(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, removeAttr: function (e, t) { var n, r = 0, i = t && t.match(M); if (i && 1 === e.nodeType) while (n = i[r++]) e.removeAttribute(n) } }), dt = { set: function (e, t, n) { return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n } }, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) { var n = ht[t] || w.find.attr; ht[t] = function (e, t, r) { var i, o, a = t.toLowerCase(); return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i } }); var gt = /^(?:input|select|textarea|button)$/i, yt = /^(?:a|area)$/i; w.fn.extend({ prop: function (e, t) { return z(this, w.prop, e, t, arguments.length > 1) }, removeProp: function (e) { return this.each(function () { delete this[w.propFix[e] || e] }) } }), w.extend({ prop: function (e, t, n) { var r, i, o = e.nodeType; if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t] }, propHooks: { tabIndex: { get: function (e) { var t = w.find.attr(e, "tabindex"); return t ? parseInt(t, 10) : gt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1 } } }, propFix: { "for": "htmlFor", "class": "className" } }), h.optSelected || (w.propHooks.selected = { get: function (e) { var t = e.parentNode; return t && t.parentNode && t.parentNode.selectedIndex, null }, set: function (e) { var t = e.parentNode; t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex) } }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { w.propFix[this.toLowerCase()] = this }); function vt(e) { return (e.match(M) || []).join(" ") } function mt(e) { return e.getAttribute && e.getAttribute("class") || "" } function xt(e) { return Array.isArray(e) ? e : "string" == typeof e ? e.match(M) || [] : [] } w.fn.extend({ addClass: function (e) { var t, n, r, i, o, a, s, u = 0; if (g(e)) return this.each(function (t) { w(this).addClass(e.call(this, t, mt(this))) }); if ((t = xt(e)).length) while (n = this[u++]) if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") { a = 0; while (o = t[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " "); i !== (s = vt(r)) && n.setAttribute("class", s) } return this }, removeClass: function (e) { var t, n, r, i, o, a, s, u = 0; if (g(e)) return this.each(function (t) { w(this).removeClass(e.call(this, t, mt(this))) }); if (!arguments.length) return this.attr("class", ""); if ((t = xt(e)).length) while (n = this[u++]) if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") { a = 0; while (o = t[a++]) while (r.indexOf(" " + o + " ") > -1) r = r.replace(" " + o + " ", " "); i !== (s = vt(r)) && n.setAttribute("class", s) } return this }, toggleClass: function (e, t) { var n = typeof e, r = "string" === n || Array.isArray(e); return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function (n) { w(this).toggleClass(e.call(this, n, mt(this), t), t) }) : this.each(function () { var t, i, o, a; if (r) { i = 0, o = w(this), a = xt(e); while (t = a[i++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t) } else void 0 !== e && "boolean" !== n || ((t = mt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || "")) }) }, hasClass: function (e) { var t, n, r = 0; t = " " + e + " "; while (n = this[r++]) if (1 === n.nodeType && (" " + vt(mt(n)) + " ").indexOf(t) > -1) return !0; return !1 } }); var bt = /\r/g; w.fn.extend({ val: function (e) { var t, n, r, i = this[0]; { if (arguments.length) return r = g(e), this.each(function (n) { var i; 1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function (e) { return null == e ? "" : e + "" })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i)) }); if (i) return (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(bt, "") : null == n ? "" : n } } }), w.extend({ valHooks: { option: { get: function (e) { var t = w.find.attr(e, "value"); return null != t ? t : vt(w.text(e)) } }, select: { get: function (e) { var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length; for (r = o < 0 ? u : a ? o : 0; r < u; r++)if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) { if (t = w(n).val(), a) return t; s.push(t) } return s }, set: function (e, t) { var n, r, i = e.options, o = w.makeArray(t), a = i.length; while (a--) ((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0); return n || (e.selectedIndex = -1), o } } } }), w.each(["radio", "checkbox"], function () { w.valHooks[this] = { set: function (e, t) { if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1 } }, h.checkOn || (w.valHooks[this].get = function (e) { return null === e.getAttribute("value") ? "on" : e.value }) }), h.focusin = "onfocusin" in e; var wt = /^(?:focusinfocus|focusoutblur)$/, Tt = function (e) { e.stopPropagation() }; w.extend(w.event, { trigger: function (t, n, i, o) { var a, s, u, l, c, p, d, h, v = [i || r], m = f.call(t, "type") ? t.type : t, x = f.call(t, "namespace") ? t.namespace.split(".") : []; if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !wt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[w.expando] ? t : new w.Event(m, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) { if (!o && !d.noBubble && !y(i)) { for (l = d.delegateType || m, wt.test(l + m) || (s = s.parentNode); s; s = s.parentNode)v.push(s), u = s; u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e) } a = 0; while ((s = v[a++]) && !t.isPropagationStopped()) h = s, t.type = a > 1 ? l : d.bindType || m, (p = (J.get(s, "events") || {})[t.type] && J.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && Y(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault()); return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !Y(i) || c && g(i[m]) && !y(i) && ((u = i[c]) && (i[c] = null), w.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, Tt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, Tt), w.event.triggered = void 0, u && (i[c] = u)), t.result } }, simulate: function (e, t, n) { var r = w.extend(new w.Event, n, { type: e, isSimulated: !0 }); w.event.trigger(r, null, t) } }), w.fn.extend({ trigger: function (e, t) { return this.each(function () { w.event.trigger(e, t, this) }) }, triggerHandler: function (e, t) { var n = this[0]; if (n) return w.event.trigger(e, t, n, !0) } }), h.focusin || w.each({ focus: "focusin", blur: "focusout" }, function (e, t) { var n = function (e) { w.event.simulate(t, e.target, w.event.fix(e)) }; w.event.special[t] = { setup: function () { var r = this.ownerDocument || this, i = J.access(r, t); i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1) }, teardown: function () { var r = this.ownerDocument || this, i = J.access(r, t) - 1; i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t)) } } }); var Ct = e.location, Et = Date.now(), kt = /\?/; w.parseXML = function (t) { var n; if (!t || "string" != typeof t) return null; try { n = (new e.DOMParser).parseFromString(t, "text/xml") } catch (e) { n = void 0 } return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n }; var St = /\[\]$/, Dt = /\r?\n/g, Nt = /^(?:submit|button|image|reset|file)$/i, At = /^(?:input|select|textarea|keygen)/i; function jt(e, t, n, r) { var i; if (Array.isArray(t)) w.each(t, function (t, i) { n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r) }); else if (n || "object" !== x(t)) r(e, t); else for (i in t) jt(e + "[" + i + "]", t[i], n, r) } w.param = function (e, t) { var n, r = [], i = function (e, t) { var n = g(t) ? t() : t; r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n) }; if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () { i(this.name, this.value) }); else for (n in e) jt(n, e[n], t, i); return r.join("&") }, w.fn.extend({ serialize: function () { return w.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = w.prop(this, "elements"); return e ? w.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !w(this).is(":disabled") && At.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e)) }).map(function (e, t) { var n = w(this).val(); return null == n ? null : Array.isArray(n) ? w.map(n, function (e) { return { name: t.name, value: e.replace(Dt, "\r\n") } }) : { name: t.name, value: n.replace(Dt, "\r\n") } }).get() } }); var qt = /%20/g, Lt = /#.*$/, Ht = /([?&])_=[^&]*/, Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm, Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Mt = /^(?:GET|HEAD)$/, Rt = /^\/\//, It = {}, Wt = {}, $t = "*/".concat("*"), Bt = r.createElement("a"); Bt.href = Ct.href; function Ft(e) { return function (t, n) { "string" != typeof t && (n = t, t = "*"); var r, i = 0, o = t.toLowerCase().match(M) || []; if (g(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) } } function _t(e, t, n, r) { var i = {}, o = e === Wt; function a(s) { var u; return i[s] = !0, w.each(e[s] || [], function (e, s) { var l = s(t, n, r); return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1) }), u } return a(t.dataTypes[0]) || !i["*"] && a("*") } function zt(e, t) { var n, r, i = w.ajaxSettings.flatOptions || {}; for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]); return r && w.extend(!0, e, r), e } function Xt(e, t, n) { var r, i, o, a, s = e.contents, u = e.dataTypes; while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type")); if (r) for (i in s) if (s[i] && s[i].test(r)) { u.unshift(i); break } if (u[0] in n) o = u[0]; else { for (i in n) { if (!u[0] || e.converters[i + " " + u[0]]) { o = i; break } a || (a = i) } o = o || a } if (o) return o !== u[0] && u.unshift(o), n[o] } function Ut(e, t, n, r) { var i, o, a, s, u, l = {}, c = e.dataTypes.slice(); if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a]; o = c.shift(); while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) { if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) { !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1])); break } if (!0 !== a) if (a && e["throws"]) t = a(t); else try { t = a(t) } catch (e) { return { state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o } } } return { state: "success", data: t } } w.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ct.href, type: "GET", isLocal: Pt.test(Ct.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": $t, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": w.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (e, t) { return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e) }, ajaxPrefilter: Ft(It), ajaxTransport: Ft(Wt), ajax: function (t, n) { "object" == typeof t && (n = t, t = void 0), n = n || {}; var i, o, a, s, u, l, c, f, p, d, h = w.ajaxSetup({}, n), g = h.context || h, y = h.context && (g.nodeType || g.jquery) ? w(g) : w.event, v = w.Deferred(), m = w.Callbacks("once memory"), x = h.statusCode || {}, b = {}, T = {}, C = "canceled", E = { readyState: 0, getResponseHeader: function (e) { var t; if (c) { if (!s) { s = {}; while (t = Ot.exec(a)) s[t[1].toLowerCase()] = t[2] } t = s[e.toLowerCase()] } return null == t ? null : t }, getAllResponseHeaders: function () { return c ? a : null }, setRequestHeader: function (e, t) { return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this }, overrideMimeType: function (e) { return null == c && (h.mimeType = e), this }, statusCode: function (e) { var t; if (e) if (c) E.always(e[E.status]); else for (t in e) x[t] = [x[t], e[t]]; return this }, abort: function (e) { var t = e || C; return i && i.abort(t), k(0, t), this } }; if (v.promise(E), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) { l = r.createElement("a"); try { l.href = h.url, l.href = l.href, h.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host } catch (e) { h.crossDomain = !0 } } if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), _t(It, h, n, E), c) return E; (f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ht, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et++ + d), h.url = o + d), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : h.accepts["*"]); for (p in h.headers) E.setRequestHeader(p, h.headers[p]); if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort(); if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = _t(Wt, h, n, E)) { if (E.readyState = 1, f && y.trigger("ajaxSend", [E, h]), c) return E; h.async && h.timeout > 0 && (u = e.setTimeout(function () { E.abort("timeout") }, h.timeout)); try { c = !1, i.send(b, k) } catch (e) { if (c) throw e; k(-1, e) } } else k(-1, "No Transport"); function k(t, n, r, s) { var l, p, d, b, T, C = n; c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = Xt(h, E, r)), b = Ut(h, b, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (w.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, p = b.data, l = !(d = b.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? v.resolveWith(g, [p, C, E]) : v.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (y.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop"))) } return E }, getJSON: function (e, t, n) { return w.get(e, t, n, "json") }, getScript: function (e, t) { return w.get(e, void 0, t, "script") } }), w.each(["get", "post"], function (e, t) { w[t] = function (e, n, r, i) { return g(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({ url: e, type: t, dataType: i, data: n, success: r }, w.isPlainObject(e) && e)) } }), w._evalUrl = function (e) { return w.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 }) }, w.fn.extend({ wrapAll: function (e) { var t; return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstElementChild) e = e.firstElementChild; return e }).append(this)), this }, wrapInner: function (e) { return g(e) ? this.each(function (t) { w(this).wrapInner(e.call(this, t)) }) : this.each(function () { var t = w(this), n = t.contents(); n.length ? n.wrapAll(e) : t.append(e) }) }, wrap: function (e) { var t = g(e); return this.each(function (n) { w(this).wrapAll(t ? e.call(this, n) : e) }) }, unwrap: function (e) { return this.parent(e).not("body").each(function () { w(this).replaceWith(this.childNodes) }), this } }), w.expr.pseudos.hidden = function (e) { return !w.expr.pseudos.visible(e) }, w.expr.pseudos.visible = function (e) { return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) }, w.ajaxSettings.xhr = function () { try { return new e.XMLHttpRequest } catch (e) { } }; var Vt = { 0: 200, 1223: 204 }, Gt = w.ajaxSettings.xhr(); h.cors = !!Gt && "withCredentials" in Gt, h.ajax = Gt = !!Gt, w.ajaxTransport(function (t) { var n, r; if (h.cors || Gt && !t.crossDomain) return { send: function (i, o) { var a, s = t.xhr(); if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) s[a] = t.xhrFields[a]; t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"); for (a in i) s.setRequestHeader(a, i[a]); n = function (e) { return function () { n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders())) } }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () { 4 === s.readyState && e.setTimeout(function () { n && r() }) }, n = n("abort"); try { s.send(t.hasContent && t.data || null) } catch (e) { if (n) throw e } }, abort: function () { n && n() } } }), w.ajaxPrefilter(function (e) { e.crossDomain && (e.contents.script = !1) }), w.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function (e) { return w.globalEval(e), e } } }), w.ajaxPrefilter("script", function (e) { void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET") }), w.ajaxTransport("script", function (e) { if (e.crossDomain) { var t, n; return { send: function (i, o) { t = w("<script>").prop({ charset: e.scriptCharset, src: e.url }).on("load error", n = function (e) { t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type) }), r.head.appendChild(t[0]) }, abort: function () { n && n() } } } }); var Yt = [], Qt = /(=)\?(?=&|$)|\?\?/; w.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var e = Yt.pop() || w.expando + "_" + Et++; return this[e] = !0, e } }), w.ajaxPrefilter("json jsonp", function (t, n, r) { var i, o, a, s = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data"); if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Qt, "$1" + i) : !1 !== t.jsonp && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () { return a || w.error(i + " was not called"), a[0] }, t.dataTypes[0] = "json", o = e[i], e[i] = function () { a = arguments }, r.always(function () { void 0 === o ? w(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Yt.push(i)), a && g(o) && o(a[0]), a = o = void 0 }), "script" }), h.createHTMLDocument = function () { var e = r.implementation.createHTMLDocument("").body; return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length }(), w.parseHTML = function (e, t, n) { if ("string" != typeof e) return []; "boolean" == typeof t && (n = t, t = !1); var i, o, a; return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = A.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = xe([e], t, a), a && a.length && w(a).remove(), w.merge([], o.childNodes)) }, w.fn.load = function (e, t, n) { var r, i, o, a = this, s = e.indexOf(" "); return s > -1 && (r = vt(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && w.ajax({ url: e, type: i || "GET", dataType: "html", data: t }).done(function (e) { o = arguments, a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e) }).always(n && function (e, t) { a.each(function () { n.apply(this, o || [e.responseText, t, e]) }) }), this }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) { w.fn[t] = function (e) { return this.on(t, e) } }), w.expr.pseudos.animated = function (e) { return w.grep(w.timers, function (t) { return e === t.elem }).length }, w.offset = { setOffset: function (e, t, n) { var r, i, o, a, s, u, l, c = w.css(e, "position"), f = w(e), p = {}; "static" === c && (e.style.position = "relative"), s = f.offset(), o = w.css(e, "top"), u = w.css(e, "left"), (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p) } }, w.fn.extend({ offset: function (e) { if (arguments.length) return void 0 === e ? this : this.each(function (t) { w.offset.setOffset(this, e, t) }); var t, n, r = this[0]; if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset }) : { top: 0, left: 0 } }, position: function () { if (this[0]) { var e, t, n, r = this[0], i = { top: 0, left: 0 }; if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect(); else { t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; while (e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position")) e = e.parentNode; e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0)) } return { top: t.top - i.top - w.css(r, "marginTop", !0), left: t.left - i.left - w.css(r, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent; while (e && "static" === w.css(e, "position")) e = e.offsetParent; return e || be }) } }), w.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) { var n = "pageYOffset" === t; w.fn[e] = function (r) { return z(this, function (e, r, i) { var o; if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r]; o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i }, e, r, arguments.length) } }), w.each(["top", "left"], function (e, t) { w.cssHooks[t] = _e(h.pixelPosition, function (e, n) { if (n) return n = Fe(e, t), We.test(n) ? w(e).position()[t] + "px" : n }) }), w.each({ Height: "height", Width: "width" }, function (e, t) { w.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) { w.fn[r] = function (i, o) { var a = arguments.length && (n || "boolean" != typeof i), s = n || (!0 === i || !0 === o ? "margin" : "border"); return z(this, function (t, n, i) { var o; return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s) }, t, a ? i : void 0, a) } }) }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) { w.fn[t] = function (e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), w.fn.extend({ hover: function (e, t) { return this.mouseenter(e).mouseleave(t || e) } }), w.fn.extend({ bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) } }), w.proxy = function (e, t) { var n, r, i; if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), i = function () { return e.apply(t || this, r.concat(o.call(arguments))) }, i.guid = e.guid = e.guid || w.guid++, i }, w.holdReady = function (e) { e ? w.readyWait++ : w.ready(!0) }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = N, w.isFunction = g, w.isWindow = y, w.camelCase = G, w.type = x, w.now = Date.now, w.isNumeric = function (e) { var t = w.type(e); return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e)) }, "function" == typeof define && define.amd && define("jquery", [], function () { return w }); var Jt = e.jQuery, Kt = e.$; return w.noConflict = function (t) { return e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Jt), w }, t || (e.jQuery = e.$ = w), w });
/*

 arcticModal — jQuery plugin
 Version: 0.3
 Author: Sergey Predvoditelev (sergey.predvoditelev@gmail.com)
 Company: Arctic Laboratory (http://arcticlab.ru/)

 Docs & Examples: http://arcticlab.ru/arcticmodal/

 */
(function ($) {


   var default_options = {

      type: 'html', // ajax или html
      content: '',
      url: '',
      ajax: {},
      ajax_request: null,

      closeOnEsc: true,
      closeOnOverlayClick: true,

      clone: false,

      overlay: {
         block: undefined,
         tpl: '<div class="arcticmodal-overlay"></div>',
         css: {
            backgroundColor: '#000',
            opacity: .6
         }
      },

      container: {
         block: undefined,
         tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
      },

      wrap: undefined,
      body: undefined,

      errors: {
         tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
         autoclose_delay: 2000,
         ajax_unsuccessful_load: 'Error'
      },

      openEffect: {
         type: 'fade',
         speed: 400
      },
      closeEffect: {
         type: 'fade',
         speed: 400
      },

      beforeOpen: $.noop,
      afterOpen: $.noop,
      beforeClose: $.noop,
      afterClose: $.noop,
      afterLoading: $.noop,
      afterLoadingOnShow: $.noop,
      errorLoading: $.noop

   };


   var modalID = 0;
   var modals = $([]);


   var utils = {


      // Определяет произошло ли событие e вне блока block
      isEventOut: function (blocks, e) {
         var r = true;
         $(blocks).each(function () {
            if ($(e.target).get(0) == $(this).get(0)) r = false;
            if ($(e.target).closest('HTML', $(this).get(0)).length == 0) r = false;
         });
         return r;
      }


   };


   var modal = {


      // Возвращает элемент, которым был вызван плагин
      getParentEl: function (el) {
         var r = $(el);
         if (r.data('arcticmodal')) return r;
         r = $(el).closest('.arcticmodal-container').data('arcticmodalParentEl');
         if (r) return r;
         return false;
      },


      // Переход
      transition: function (el, action, options, callback) {
         callback = callback == undefined ? $.noop : callback;
         switch (options.type) {
            case 'fade':
               action == 'show' ? el.fadeIn(options.speed, callback) : el.fadeOut(options.speed, callback);
               break;
            case 'none':
               action == 'show' ? el.show() : el.hide();
               callback();
               break;
         }
      },


      // Подготвка содержимого окна
      prepare_body: function (D, $this) {

         // Обработчик закрытия
         $('.arcticmodal-close', D.body).unbind('click.arcticmodal').bind('click.arcticmodal', function () {
            $this.arcticmodal('close');
            return false;
         });

      },


      // Инициализация элемента
      init_el: function ($this, options) {
         var D = $this.data('arcticmodal');
         if (D) return;

         D = options;
         modalID++;
         D.modalID = modalID;

         // Overlay
         D.overlay.block = $(D.overlay.tpl);
         D.overlay.block.css(D.overlay.css);

         // Container
         D.container.block = $(D.container.tpl);

         // BODY
         D.body = $('.arcticmodal-container_i2', D.container.block);
         if (options.clone) {
            D.body.html($this.clone(true));
         } else {
            $this.before('<div id="arcticmodalReserve' + D.modalID + '" style="display: none" />');
            D.body.html($this);
         }

         // Подготовка содержимого
         modal.prepare_body(D, $this);

         // Закрытие при клике на overlay
         if (D.closeOnOverlayClick)
            D.overlay.block.add(D.container.block).click(function (e) {
               if (utils.isEventOut($('>*', D.body), e))
                  $this.arcticmodal('close');
            });

         // Запомним настройки
         D.container.block.data('arcticmodalParentEl', $this);
         $this.data('arcticmodal', D);
         modals = $.merge(modals, $this);

         // Показать
         $.proxy(actions.show, $this)();
         if (D.type == 'html') return $this;

         // Ajax-загрузка
         if (D.ajax.beforeSend != undefined) {
            var fn_beforeSend = D.ajax.beforeSend;
            delete D.ajax.beforeSend;
         }
         if (D.ajax.success != undefined) {
            var fn_success = D.ajax.success;
            delete D.ajax.success;
         }
         if (D.ajax.error != undefined) {
            var fn_error = D.ajax.error;
            delete D.ajax.error;
         }
         var o = $.extend(true, {
            url: D.url,
            beforeSend: function () {
               if (fn_beforeSend == undefined) {
                  D.body.html('<div class="arcticmodal-loading" />');
               } else {
                  fn_beforeSend(D, $this);
               }
            },
            success: function (responce) {

               // Событие после загрузки до показа содержимого
               $this.trigger('afterLoading');
               D.afterLoading(D, $this, responce);

               if (fn_success == undefined) {
                  D.body.html(responce);
               } else {
                  fn_success(D, $this, responce);
               }
               modal.prepare_body(D, $this);

               // Событие после загрузки после отображения содержимого
               $this.trigger('afterLoadingOnShow');
               D.afterLoadingOnShow(D, $this, responce);

            },
            error: function () {

               // Событие при ошибке загрузки
               $this.trigger('errorLoading');
               D.errorLoading(D, $this);

               if (fn_error == undefined) {
                  D.body.html(D.errors.tpl);
                  $('.arcticmodal-error', D.body).html(D.errors.ajax_unsuccessful_load);
                  $('.arcticmodal-close', D.body).click(function () {
                     $this.arcticmodal('close');
                     return false;
                  });
                  if (D.errors.autoclose_delay)
                     setTimeout(function () {
                        $this.arcticmodal('close');
                     }, D.errors.autoclose_delay);
               } else {
                  fn_error(D, $this);
               }
            }
         }, D.ajax);
         D.ajax_request = $.ajax(o);

         // Запомнить настройки
         $this.data('arcticmodal', D);

      },


      // Инициализация
      init: function (options) {
         options = $.extend(true, {}, default_options, options);
         if ($.isFunction(this)) {
            if (options == undefined) {
               $.error('jquery.arcticmodal: Uncorrect parameters');
               return;
            }
            if (options.type == '') {
               $.error('jquery.arcticmodal: Don\'t set parameter "type"');
               return;
            }
            switch (options.type) {
               case 'html':
                  if (options.content == '') {
                     $.error('jquery.arcticmodal: Don\'t set parameter "content"');
                     return
                  }
                  var c = options.content;
                  options.content = '';

                  return modal.init_el($(c), options);
                  break;
               case 'ajax':
                  if (options.url == '') {
                     $.error('jquery.arcticmodal: Don\'t set parameter "url"');
                     return;
                  }
                  return modal.init_el($('<div />'), options);
                  break;
            }
         } else {
            return this.each(function () {
               modal.init_el($(this), $.extend(true, {}, options));
            });
         }
      }


   };


   var actions = {


      // Показать
      show: function () {
         var $this = modal.getParentEl(this);
         if ($this === false) {
            $.error('jquery.arcticmodal: Uncorrect call');
            return;
         }
         var D = $this.data('arcticmodal');

         // Добавить overlay и container
         D.overlay.block.hide();
         D.container.block.hide();
         $('BODY').append(D.overlay.block);
         $('BODY').append(D.container.block);

         // Событие
         D.beforeOpen(D, $this);
         $this.trigger('beforeOpen');

         // Wrap
         if (D.wrap.css('overflow') != 'hidden') {
            D.wrap.data('arcticmodalOverflow', D.wrap.css('overflow'));
            var w1 = D.wrap.outerWidth(true);
            D.wrap.css('overflow', 'hidden');
            var w2 = D.wrap.outerWidth(true);
            if (w2 != w1)
               D.wrap.css('marginRight', (w2 - w1) + 'px');
         }

         // Скрыть предыдущие оверлеи
         modals.not($this).each(function () {
            var d = $(this).data('arcticmodal');
            d.overlay.block.hide();
         });

         // Показать
         modal.transition(D.overlay.block, 'show', modals.length > 1 ? { type: 'none' } : D.openEffect);
         modal.transition(D.container.block, 'show', modals.length > 1 ? { type: 'none' } : D.openEffect, function () {
            D.afterOpen(D, $this);
            $this.trigger('afterOpen');
         });

         return $this;
      },


      // Закрыть
      close: function () {
         if ($.isFunction(this)) {
            modals.each(function () {
               $(this).arcticmodal('close');
            });
         } else {
            return this.each(function () {
               var $this = modal.getParentEl(this);
               if ($this === false) {
                  $.error('jquery.arcticmodal: Uncorrect call');
                  return;
               }
               var D = $this.data('arcticmodal');

               // Событие перед закрытием
               if (D.beforeClose(D, $this) === false) return;
               $this.trigger('beforeClose');

               // Показать предыдущие оверлеи
               modals.not($this).last().each(function () {
                  var d = $(this).data('arcticmodal');
                  d.overlay.block.show();
               });

               modal.transition(D.overlay.block, 'hide', modals.length > 1 ? { type: 'none' } : D.closeEffect);
               modal.transition(D.container.block, 'hide', modals.length > 1 ? { type: 'none' } : D.closeEffect, function () {

                  // Событие после закрытия
                  D.afterClose(D, $this);
                  $this.trigger('afterClose');

                  // Если не клонировали - вернём на место
                  if (!D.clone)
                     $('#arcticmodalReserve' + D.modalID).replaceWith(D.body.find('>*'));

                  D.overlay.block.remove();
                  D.container.block.remove();
                  $this.data('arcticmodal', null);
                  if (!$('.arcticmodal-container').length) {
                     if (D.wrap.data('arcticmodalOverflow'))
                        D.wrap.css('overflow', D.wrap.data('arcticmodalOverflow'));
                     D.wrap.css('marginRight', 0);
                  }

               });

               if (D.type == 'ajax')
                  D.ajax_request.abort();

               modals = modals.not($this);
            });
         }
      },


      // Установить опции по-умолчанию
      setDefault: function (options) {
         $.extend(true, default_options, options);
      }


   };


   $(function () {
      default_options.wrap = $((document.all && !document.querySelector) ? 'html' : 'body');
   });


   // Закрытие при нажатии Escape
   $(document).bind('keyup.arcticmodal', function (e) {
      var m = modals.last();
      if (!m.length) return;
      var D = m.data('arcticmodal');
      if (D.closeOnEsc && (e.keyCode === 27))
         m.arcticmodal('close');
   });


   $.arcticmodal = $.fn.arcticmodal = function (method) {

      if (actions[method]) {
         return actions[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
         return modal.init.apply(this, arguments);
      } else {
         $.error('jquery.arcticmodal: Method ' + method + ' does not exist');
      }

   };


})(jQuery);
/*!
 * jQuery Validation Plugin v1.14.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2015 JГ¶rn Zaefferer
 * Released under the MIT license
 */
(function (factory) {
   if (typeof define === "function" && define.amd) {
      define(["jquery"], factory);
   } else {
      factory(jQuery);
   }
}(function ($) {

   $.extend($.fn, {
      // http://jqueryvalidation.org/validate/
      validate: function (options) {

         // if nothing is selected, return nothing; can't chain anyway
         if (!this.length) {
            if (options && options.debug && window.console) {
               console.warn("Nothing selected, can't validate, returning nothing.");
            }
            return;
         }

         // check if a validator for this form was already created
         var validator = $.data(this[0], "validator");
         if (validator) {
            return validator;
         }

         // Add novalidate tag if HTML5.
         this.attr("novalidate", "novalidate");

         validator = new $.validator(options, this[0]);
         $.data(this[0], "validator", validator);

         if (validator.settings.onsubmit) {

            this.on("click.validate", ":submit", function (event) {
               if (validator.settings.submitHandler) {
                  validator.submitButton = event.target;
               }

               // allow suppressing validation by adding a cancel class to the submit button
               if ($(this).hasClass("cancel")) {
                  validator.cancelSubmit = true;
               }

               // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
               if ($(this).attr("formnovalidate") !== undefined) {
                  validator.cancelSubmit = true;
               }
            });

            // validate the form on submit
            this.on("submit.validate", function (event) {
               if (validator.settings.debug) {
                  // prevent form submit to be able to see console output
                  event.preventDefault();
               }
               function handle() {
                  var hidden, result;
                  if (validator.settings.submitHandler) {
                     if (validator.submitButton) {
                        // insert a hidden input as a replacement for the missing submit button
                        hidden = $("<input type='hidden'/>")
                           .attr("name", validator.submitButton.name)
                           .val($(validator.submitButton).val())
                           .appendTo(validator.currentForm);
                     }
                     result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                     if (validator.submitButton) {
                        // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                        hidden.remove();
                     }
                     if (result !== undefined) {
                        return result;
                     }
                     return false;
                  }
                  return true;
               }

               // prevent submit for invalid forms or custom submit handlers
               if (validator.cancelSubmit) {
                  validator.cancelSubmit = false;
                  return handle();
               }
               if (validator.form()) {
                  if (validator.pendingRequest) {
                     validator.formSubmitted = true;
                     return false;
                  }
                  return handle();
               } else {
                  validator.focusInvalid();
                  return false;
               }
            });
         }

         return validator;
      },
      // http://jqueryvalidation.org/valid/
      valid: function () {
         var valid, validator, errorList;

         if ($(this[0]).is("form")) {
            valid = this.validate().form();
         } else {
            errorList = [];
            valid = true;
            validator = $(this[0].form).validate();
            this.each(function () {
               valid = validator.element(this) && valid;
               errorList = errorList.concat(validator.errorList);
            });
            validator.errorList = errorList;
         }
         return valid;
      },

      // http://jqueryvalidation.org/rules/
      rules: function (command, argument) {
         var element = this[0],
            settings, staticRules, existingRules, data, param, filtered;

         if (command) {
            settings = $.data(element.form, "validator").settings;
            staticRules = settings.rules;
            existingRules = $.validator.staticRules(element);
            switch (command) {
               case "add":
                  $.extend(existingRules, $.validator.normalizeRule(argument));
                  // remove messages from rules, but allow them to be set separately
                  delete existingRules.messages;
                  staticRules[element.name] = existingRules;
                  if (argument.messages) {
                     settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                  }
                  break;
               case "remove":
                  if (!argument) {
                     delete staticRules[element.name];
                     return existingRules;
                  }
                  filtered = {};
                  $.each(argument.split(/\s/), function (index, method) {
                     filtered[method] = existingRules[method];
                     delete existingRules[method];
                     if (method === "required") {
                        $(element).removeAttr("aria-required");
                     }
                  });
                  return filtered;
            }
         }

         data = $.validator.normalizeRules(
            $.extend(
               {},
               $.validator.classRules(element),
               $.validator.attributeRules(element),
               $.validator.dataRules(element),
               $.validator.staticRules(element)
            ), element);

         // make sure required is at front
         if (data.required) {
            param = data.required;
            delete data.required;
            data = $.extend({ required: param }, data);
            $(element).attr("aria-required", "true");
         }

         // make sure remote is at back
         if (data.remote) {
            param = data.remote;
            delete data.remote;
            data = $.extend(data, { remote: param });
         }

         return data;
      }
   });

   // Custom selectors
   $.extend($.expr[":"], {
      // http://jqueryvalidation.org/blank-selector/
      blank: function (a) {
         return !$.trim("" + $(a).val());
      },
      // http://jqueryvalidation.org/filled-selector/
      filled: function (a) {
         return !!$.trim("" + $(a).val());
      },
      // http://jqueryvalidation.org/unchecked-selector/
      unchecked: function (a) {
         return !$(a).prop("checked");
      }
   });

   // constructor for validator
   $.validator = function (options, form) {
      this.settings = $.extend(true, {}, $.validator.defaults, options);
      this.currentForm = form;
      this.init();
   };

   // http://jqueryvalidation.org/jQuery.validator.format/
   $.validator.format = function (source, params) {
      if (arguments.length === 1) {
         return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.validator.format.apply(this, args);
         };
      }
      if (arguments.length > 2 && params.constructor !== Array) {
         params = $.makeArray(arguments).slice(1);
      }
      if (params.constructor !== Array) {
         params = [params];
      }
      $.each(params, function (i, n) {
         source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
            return n;
         });
      });
      return source;
   };

   $.extend($.validator, {

      defaults: {
         messages: {},
         groups: {},
         rules: {},
         errorClass: "error",
         validClass: "valid",
         errorElement: "label",
         focusCleanup: false,
         focusInvalid: true,
         errorContainer: $([]),
         errorLabelContainer: $([]),
         onsubmit: true,
         ignore: ":hidden",
         ignoreTitle: false,
         onfocusin: function (element) {
            this.lastActive = element;

            // Hide error label and remove error class on focus if enabled
            if (this.settings.focusCleanup) {
               if (this.settings.unhighlight) {
                  this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
               }
               this.hideThese(this.errorsFor(element));
            }
         },
         onfocusout: function (element) {
            if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
               this.element(element);
            }
         },
         onkeyup: function (element, event) {
            // Avoid revalidate the field when pressing one of the following keys
            // Shift       => 16
            // Ctrl        => 17
            // Alt         => 18
            // Caps lock   => 20
            // End         => 35
            // Home        => 36
            // Left arrow  => 37
            // Up arrow    => 38
            // Right arrow => 39
            // Down arrow  => 40
            // Insert      => 45
            // Num lock    => 144
            // AltGr key   => 225
            var excludedKeys = [
               16, 17, 18, 20, 35, 36, 37,
               38, 39, 40, 45, 144, 225
            ];

            if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
               return;
            } else if (element.name in this.submitted || element === this.lastElement) {
               this.element(element);
            }
         },
         onclick: function (element) {
            // click on selects, radiobuttons and checkboxes
            if (element.name in this.submitted) {
               this.element(element);

               // or option elements, check parent select in that case
            } else if (element.parentNode.name in this.submitted) {
               this.element(element.parentNode);
            }
         },
         highlight: function (element, errorClass, validClass) {
            if (element.type === "radio") {
               this.findByName(element.name).addClass(errorClass).removeClass(validClass);
            } else {
               $(element).addClass(errorClass).removeClass(validClass);
            }
         },
         unhighlight: function (element, errorClass, validClass) {
            if (element.type === "radio") {
               this.findByName(element.name).removeClass(errorClass).addClass(validClass);
            } else {
               $(element).removeClass(errorClass).addClass(validClass);
            }
         }
      },

      // http://jqueryvalidation.org/jQuery.validator.setDefaults/
      setDefaults: function (settings) {
         $.extend($.validator.defaults, settings);
      },

      messages: {
         required: "This field is required.",
         remote: "Please fix this field.",
         email: "Please enter a valid email address.",
         url: "Please enter a valid URL.",
         date: "Please enter a valid date.",
         dateISO: "Please enter a valid date ( ISO ).",
         number: "Please enter a valid number.",
         digits: "Please enter only digits.",
         creditcard: "Please enter a valid credit card number.",
         equalTo: "Please enter the same value again.",
         maxlength: $.validator.format("Please enter no more than {0} characters."),
         minlength: $.validator.format("Please enter at least {0} characters."),
         rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
         range: $.validator.format("Please enter a value between {0} and {1}."),
         max: $.validator.format("Please enter a value less than or equal to {0}."),
         min: $.validator.format("Please enter a value greater than or equal to {0}.")
      },

      autoCreateRanges: false,

      prototype: {

         init: function () {
            this.labelContainer = $(this.settings.errorLabelContainer);
            this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
            this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
            this.submitted = {};
            this.valueCache = {};
            this.pendingRequest = 0;
            this.pending = {};
            this.invalid = {};
            this.reset();

            var groups = (this.groups = {}),
               rules;
            $.each(this.settings.groups, function (key, value) {
               if (typeof value === "string") {
                  value = value.split(/\s/);
               }
               $.each(value, function (index, name) {
                  groups[name] = key;
               });
            });
            rules = this.settings.rules;
            $.each(rules, function (key, value) {
               rules[key] = $.validator.normalizeRule(value);
            });

            function delegate(event) {
               var validator = $.data(this.form, "validator"),
                  eventType = "on" + event.type.replace(/^validate/, ""),
                  settings = validator.settings;
               if (settings[eventType] && !$(this).is(settings.ignore)) {
                  settings[eventType].call(validator, this, event);
               }
            }

            $(this.currentForm)
               .on("focusin.validate focusout.validate keyup.validate",
                  ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                  "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                  "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                  "[type='radio'], [type='checkbox']", delegate)
               // Support: Chrome, oldIE
               // "select" is provided as event.target when clicking a option
               .on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

            if (this.settings.invalidHandler) {
               $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
            }

            // Add aria-required to any Static/Data/Class required fields before first validation
            // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
            $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
         },

         // http://jqueryvalidation.org/Validator.form/
         form: function () {
            this.checkForm();
            $.extend(this.submitted, this.errorMap);
            this.invalid = $.extend({}, this.errorMap);
            if (!this.valid()) {
               $(this.currentForm).triggerHandler("invalid-form", [this]);
            }
            this.showErrors();
            return this.valid();
         },

         checkForm: function () {
            this.prepareForm();
            for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
               this.check(elements[i]);
            }
            return this.valid();
         },

         // http://jqueryvalidation.org/Validator.element/
         element: function (element) {
            var cleanElement = this.clean(element),
               checkElement = this.validationTargetFor(cleanElement),
               result = true;

            this.lastElement = checkElement;

            if (checkElement === undefined) {
               delete this.invalid[cleanElement.name];
            } else {
               this.prepareElement(checkElement);
               this.currentElements = $(checkElement);

               result = this.check(checkElement) !== false;
               if (result) {
                  delete this.invalid[checkElement.name];
               } else {
                  this.invalid[checkElement.name] = true;
               }
            }
            // Add aria-invalid status for screen readers
            $(element).attr("aria-invalid", !result);

            if (!this.numberOfInvalids()) {
               // Hide error containers on last error
               this.toHide = this.toHide.add(this.containers);
            }
            this.showErrors();
            return result;
         },

         // http://jqueryvalidation.org/Validator.showErrors/
         showErrors: function (errors) {
            if (errors) {
               // add items to error list and map
               $.extend(this.errorMap, errors);
               this.errorList = [];
               for (var name in errors) {
                  this.errorList.push({
                     message: errors[name],
                     element: this.findByName(name)[0]
                  });
               }
               // remove items from success list
               this.successList = $.grep(this.successList, function (element) {
                  return !(element.name in errors);
               });
            }
            if (this.settings.showErrors) {
               this.settings.showErrors.call(this, this.errorMap, this.errorList);
            } else {
               this.defaultShowErrors();
            }
         },

         // http://jqueryvalidation.org/Validator.resetForm/
         resetForm: function () {
            if ($.fn.resetForm) {
               $(this.currentForm).resetForm();
            }
            this.submitted = {};
            this.lastElement = null;
            this.prepareForm();
            this.hideErrors();
            var i, elements = this.elements()
               .removeData("previousValue")
               .removeAttr("aria-invalid");

            if (this.settings.unhighlight) {
               for (i = 0; elements[i]; i++) {
                  this.settings.unhighlight.call(this, elements[i],
                     this.settings.errorClass, "");
               }
            } else {
               elements.removeClass(this.settings.errorClass);
            }
         },

         numberOfInvalids: function () {
            return this.objectLength(this.invalid);
         },

         objectLength: function (obj) {
            /* jshint unused: false */
            var count = 0,
               i;
            for (i in obj) {
               count++;
            }
            return count;
         },

         hideErrors: function () {
            this.hideThese(this.toHide);
         },

         hideThese: function (errors) {
            errors.not(this.containers).text("");
            this.addWrapper(errors).hide();
         },

         valid: function () {
            return this.size() === 0;
         },

         size: function () {
            return this.errorList.length;
         },

         focusInvalid: function () {
            if (this.settings.focusInvalid) {
               try {
                  $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                     .filter(":visible")
                     .focus()
                     // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                     .trigger("focusin");
               } catch (e) {
                  // ignore IE throwing errors when focusing hidden elements
               }
            }
         },

         findLastActive: function () {
            var lastActive = this.lastActive;
            return lastActive && $.grep(this.errorList, function (n) {
               return n.element.name === lastActive.name;
            }).length === 1 && lastActive;
         },

         elements: function () {
            var validator = this,
               rulesCache = {};

            // select all valid inputs inside the form (no submit or reset buttons)
            return $(this.currentForm)
               .find("input, select, textarea")
               .not(":submit, :reset, :image, :disabled")
               .not(this.settings.ignore)
               .filter(function () {
                  if (!this.name && validator.settings.debug && window.console) {
                     console.error("%o has no name assigned", this);
                  }

                  // select only the first element for each name, and only those with rules specified
                  if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                     return false;
                  }

                  rulesCache[this.name] = true;
                  return true;
               });
         },

         clean: function (selector) {
            return $(selector)[0];
         },

         errors: function () {
            var errorClass = this.settings.errorClass.split(" ").join(".");
            return $(this.settings.errorElement + "." + errorClass, this.errorContext);
         },

         reset: function () {
            this.successList = [];
            this.errorList = [];
            this.errorMap = {};
            this.toShow = $([]);
            this.toHide = $([]);
            this.currentElements = $([]);
         },

         prepareForm: function () {
            this.reset();
            this.toHide = this.errors().add(this.containers);
         },

         prepareElement: function (element) {
            this.reset();
            this.toHide = this.errorsFor(element);
         },

         elementValue: function (element) {
            var val,
               $element = $(element),
               type = element.type;

            if (type === "radio" || type === "checkbox") {
               return this.findByName(element.name).filter(":checked").val();
            } else if (type === "number" && typeof element.validity !== "undefined") {
               return element.validity.badInput ? false : $element.val();
            }

            val = $element.val();
            if (typeof val === "string") {
               return val.replace(/\r/g, "");
            }
            return val;
         },

         check: function (element) {
            element = this.validationTargetFor(this.clean(element));

            var rules = $(element).rules(),
               rulesCount = $.map(rules, function (n, i) {
                  return i;
               }).length,
               dependencyMismatch = false,
               val = this.elementValue(element),
               result, method, rule;

            for (method in rules) {
               rule = { method: method, parameters: rules[method] };
               try {

                  result = $.validator.methods[method].call(this, val, element, rule.parameters);

                  // if a method indicates that the field is optional and therefore valid,
                  // don't mark it as valid when there are no other rules
                  if (result === "dependency-mismatch" && rulesCount === 1) {
                     dependencyMismatch = true;
                     continue;
                  }
                  dependencyMismatch = false;

                  if (result === "pending") {
                     this.toHide = this.toHide.not(this.errorsFor(element));
                     return;
                  }

                  if (!result) {
                     this.formatAndAdd(element, rule);
                     return false;
                  }
               } catch (e) {
                  if (this.settings.debug && window.console) {
                     console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                  }
                  if (e instanceof TypeError) {
                     e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                  }

                  throw e;
               }
            }
            if (dependencyMismatch) {
               return;
            }
            if (this.objectLength(rules)) {
               this.successList.push(element);
            }
            return true;
         },

         // return the custom message for the given element and validation method
         // specified in the element's HTML5 data attribute
         // return the generic message if present and no method specific message is present
         customDataMessage: function (element, method) {
            return $(element).data("msg" + method.charAt(0).toUpperCase() +
               method.substring(1).toLowerCase()) || $(element).data("msg");
         },

         // return the custom message for the given element name and validation method
         customMessage: function (name, method) {
            var m = this.settings.messages[name];
            return m && (m.constructor === String ? m : m[method]);
         },

         // return the first defined argument, allowing empty strings
         findDefined: function () {
            for (var i = 0; i < arguments.length; i++) {
               if (arguments[i] !== undefined) {
                  return arguments[i];
               }
            }
            return undefined;
         },

         defaultMessage: function (element, method) {
            return this.findDefined(
               this.customMessage(element.name, method),
               this.customDataMessage(element, method),
               // title is never undefined, so handle empty string as undefined
               !this.settings.ignoreTitle && element.title || undefined,
               $.validator.messages[method],
               "<strong>Warning: No message defined for " + element.name + "</strong>"
            );
         },

         formatAndAdd: function (element, rule) {
            var message = this.defaultMessage(element, rule.method),
               theregex = /\$?\{(\d+)\}/g;
            if (typeof message === "function") {
               message = message.call(this, rule.parameters, element);
            } else if (theregex.test(message)) {
               message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
            }
            this.errorList.push({
               message: message,
               element: element,
               method: rule.method
            });

            this.errorMap[element.name] = message;
            this.submitted[element.name] = message;
         },

         addWrapper: function (toToggle) {
            if (this.settings.wrapper) {
               toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
            }
            return toToggle;
         },

         defaultShowErrors: function () {
            var i, elements, error;
            for (i = 0; this.errorList[i]; i++) {
               error = this.errorList[i];
               if (this.settings.highlight) {
                  this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
               }
               this.showLabel(error.element, error.message);
            }
            if (this.errorList.length) {
               this.toShow = this.toShow.add(this.containers);
            }
            if (this.settings.success) {
               for (i = 0; this.successList[i]; i++) {
                  this.showLabel(this.successList[i]);
               }
            }
            if (this.settings.unhighlight) {
               for (i = 0, elements = this.validElements(); elements[i]; i++) {
                  this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
               }
            }
            this.toHide = this.toHide.not(this.toShow);
            this.hideErrors();
            this.addWrapper(this.toShow).show();
         },

         validElements: function () {
            return this.currentElements.not(this.invalidElements());
         },

         invalidElements: function () {
            return $(this.errorList).map(function () {
               return this.element;
            });
         },

         showLabel: function (element, message) {
            var place, group, errorID,
               error = this.errorsFor(element),
               elementID = this.idOrName(element),
               describedBy = $(element).attr("aria-describedby");
            if (error.length) {
               // refresh error/success class
               error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
               // replace message on existing label
               error.html(message);
            } else {
               // create error element
               error = $("<" + this.settings.errorElement + ">")
                  .attr("id", elementID + "-error")
                  .addClass(this.settings.errorClass)
                  .html(message || "");

               // Maintain reference to the element to be placed into the DOM
               place = error;
               if (this.settings.wrapper) {
                  // make sure the element is visible, even in IE
                  // actually showing the wrapped element is handled elsewhere
                  place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
               }
               if (this.labelContainer.length) {
                  this.labelContainer.append(place);
               } else if (this.settings.errorPlacement) {
                  this.settings.errorPlacement(place, $(element));
               } else {
                  place.insertAfter(element);
               }

               // Link error back to the element
               if (error.is("label")) {
                  // If the error is a label, then associate using 'for'
                  error.attr("for", elementID);
               } else if (error.parents("label[for='" + elementID + "']").length === 0) {
                  // If the element is not a child of an associated label, then it's necessary
                  // to explicitly apply aria-describedby

                  errorID = error.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1");
                  // Respect existing non-error aria-describedby
                  if (!describedBy) {
                     describedBy = errorID;
                  } else if (!describedBy.match(new RegExp("\\b" + errorID + "\\b"))) {
                     // Add to end of list if not already present
                     describedBy += " " + errorID;
                  }
                  $(element).attr("aria-describedby", describedBy);

                  // If this element is grouped, then assign to all elements in the same group
                  group = this.groups[element.name];
                  if (group) {
                     $.each(this.groups, function (name, testgroup) {
                        if (testgroup === group) {
                           $("[name='" + name + "']", this.currentForm)
                              .attr("aria-describedby", error.attr("id"));
                        }
                     });
                  }
               }
            }
            if (!message && this.settings.success) {
               error.text("");
               if (typeof this.settings.success === "string") {
                  error.addClass(this.settings.success);
               } else {
                  this.settings.success(error, element);
               }
            }
            this.toShow = this.toShow.add(error);
         },

         errorsFor: function (element) {
            var name = this.idOrName(element),
               describer = $(element).attr("aria-describedby"),
               selector = "label[for='" + name + "'], label[for='" + name + "'] *";

            // aria-describedby should directly reference the error element
            if (describer) {
               selector = selector + ", #" + describer.replace(/\s+/g, ", #");
            }
            return this
               .errors()
               .filter(selector);
         },

         idOrName: function (element) {
            return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
         },

         validationTargetFor: function (element) {

            // If radio/checkbox, validate first element in group instead
            if (this.checkable(element)) {
               element = this.findByName(element.name);
            }

            // Always apply ignore filter
            return $(element).not(this.settings.ignore)[0];
         },

         checkable: function (element) {
            return (/radio|checkbox/i).test(element.type);
         },

         findByName: function (name) {
            return $(this.currentForm).find("[name='" + name + "']");
         },

         getLength: function (value, element) {
            switch (element.nodeName.toLowerCase()) {
               case "select":
                  return $("option:selected", element).length;
               case "input":
                  if (this.checkable(element)) {
                     return this.findByName(element.name).filter(":checked").length;
                  }
            }
            return value.length;
         },

         depend: function (param, element) {
            return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
         },

         dependTypes: {
            "boolean": function (param) {
               return param;
            },
            "string": function (param, element) {
               return !!$(param, element.form).length;
            },
            "function": function (param, element) {
               return param(element);
            }
         },

         optional: function (element) {
            var val = this.elementValue(element);
            return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
         },

         startRequest: function (element) {
            if (!this.pending[element.name]) {
               this.pendingRequest++;
               this.pending[element.name] = true;
            }
         },

         stopRequest: function (element, valid) {
            this.pendingRequest--;
            // sometimes synchronization fails, make sure pendingRequest is never < 0
            if (this.pendingRequest < 0) {
               this.pendingRequest = 0;
            }
            delete this.pending[element.name];
            if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
               $(this.currentForm).submit();
               this.formSubmitted = false;
            } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
               $(this.currentForm).triggerHandler("invalid-form", [this]);
               this.formSubmitted = false;
            }
         },

         previousValue: function (element) {
            return $.data(element, "previousValue") || $.data(element, "previousValue", {
               old: null,
               valid: true,
               message: this.defaultMessage(element, "remote")
            });
         },

         // cleans up all forms and elements, removes validator-specific events
         destroy: function () {
            this.resetForm();

            $(this.currentForm)
               .off(".validate")
               .removeData("validator");
         }

      },

      classRuleSettings: {
         required: { required: true },
         email: { email: true },
         url: { url: true },
         date: { date: true },
         dateISO: { dateISO: true },
         number: { number: true },
         digits: { digits: true },
         creditcard: { creditcard: true }
      },

      addClassRules: function (className, rules) {
         if (className.constructor === String) {
            this.classRuleSettings[className] = rules;
         } else {
            $.extend(this.classRuleSettings, className);
         }
      },

      classRules: function (element) {
         var rules = {},
            classes = $(element).attr("class");

         if (classes) {
            $.each(classes.split(" "), function () {
               if (this in $.validator.classRuleSettings) {
                  $.extend(rules, $.validator.classRuleSettings[this]);
               }
            });
         }
         return rules;
      },

      normalizeAttributeRule: function (rules, type, method, value) {

         // convert the value to a number for number inputs, and for text for backwards compability
         // allows type="date" and others to be compared as strings
         if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
            value = Number(value);

            // Support Opera Mini, which returns NaN for undefined minlength
            if (isNaN(value)) {
               value = undefined;
            }
         }

         if (value || value === 0) {
            rules[method] = value;
         } else if (type === method && type !== "range") {

            // exception: the jquery validate 'range' method
            // does not test for the html5 'range' type
            rules[method] = true;
         }
      },

      attributeRules: function (element) {
         var rules = {},
            $element = $(element),
            type = element.getAttribute("type"),
            method, value;

         for (method in $.validator.methods) {

            // support for <input required> in both html5 and older browsers
            if (method === "required") {
               value = element.getAttribute(method);

               // Some browsers return an empty string for the required attribute
               // and non-HTML5 browsers might have required="" markup
               if (value === "") {
                  value = true;
               }

               // force non-HTML5 browsers to return bool
               value = !!value;
            } else {
               value = $element.attr(method);
            }

            this.normalizeAttributeRule(rules, type, method, value);
         }

         // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
         if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
            delete rules.maxlength;
         }

         return rules;
      },

      dataRules: function (element) {
         var rules = {},
            $element = $(element),
            type = element.getAttribute("type"),
            method, value;

         for (method in $.validator.methods) {
            value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
            this.normalizeAttributeRule(rules, type, method, value);
         }
         return rules;
      },

      staticRules: function (element) {
         var rules = {},
            validator = $.data(element.form, "validator");

         if (validator.settings.rules) {
            rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
         }
         return rules;
      },

      normalizeRules: function (rules, element) {
         // handle dependency check
         $.each(rules, function (prop, val) {
            // ignore rule when param is explicitly false, eg. required:false
            if (val === false) {
               delete rules[prop];
               return;
            }
            if (val.param || val.depends) {
               var keepRule = true;
               switch (typeof val.depends) {
                  case "string":
                     keepRule = !!$(val.depends, element.form).length;
                     break;
                  case "function":
                     keepRule = val.depends.call(element, element);
                     break;
               }
               if (keepRule) {
                  rules[prop] = val.param !== undefined ? val.param : true;
               } else {
                  delete rules[prop];
               }
            }
         });

         // evaluate parameters
         $.each(rules, function (rule, parameter) {
            rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
         });

         // clean number parameters
         $.each(["minlength", "maxlength"], function () {
            if (rules[this]) {
               rules[this] = Number(rules[this]);
            }
         });
         $.each(["rangelength", "range"], function () {
            var parts;
            if (rules[this]) {
               if ($.isArray(rules[this])) {
                  rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
               } else if (typeof rules[this] === "string") {
                  parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                  rules[this] = [Number(parts[0]), Number(parts[1])];
               }
            }
         });

         if ($.validator.autoCreateRanges) {
            // auto-create ranges
            if (rules.min != null && rules.max != null) {
               rules.range = [rules.min, rules.max];
               delete rules.min;
               delete rules.max;
            }
            if (rules.minlength != null && rules.maxlength != null) {
               rules.rangelength = [rules.minlength, rules.maxlength];
               delete rules.minlength;
               delete rules.maxlength;
            }
         }

         return rules;
      },

      // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
      normalizeRule: function (data) {
         if (typeof data === "string") {
            var transformed = {};
            $.each(data.split(/\s/), function () {
               transformed[this] = true;
            });
            data = transformed;
         }
         return data;
      },

      // http://jqueryvalidation.org/jQuery.validator.addMethod/
      addMethod: function (name, method, message) {
         $.validator.methods[name] = method;
         $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
         if (method.length < 3) {
            $.validator.addClassRules(name, $.validator.normalizeRule(name));
         }
      },

      methods: {

         // http://jqueryvalidation.org/required-method/
         required: function (value, element, param) {
            // check if dependency is met
            if (!this.depend(param, element)) {
               return "dependency-mismatch";
            }
            if (element.nodeName.toLowerCase() === "select") {
               // could be an array for select-multiple or a string, both are fine this way
               var val = $(element).val();
               return val && val.length > 0;
            }
            if (this.checkable(element)) {
               return this.getLength(value, element) > 0;
            }
            return value.length > 0;
         },

         // http://jqueryvalidation.org/email-method/
         email: function (value, element) {
            // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            // Retrieved 2014-01-14
            // If you have a problem with this implementation, report a bug against the above spec
            // Or use custom methods to implement your own email validation
            return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
         },

         // http://jqueryvalidation.org/url-method/
         url: function (value, element) {

            // Copyright (c) 2010-2013 Diego Perini, MIT licensed
            // https://gist.github.com/dperini/729294
            // see also https://mathiasbynens.be/demo/url-regex
            // modified to allow protocol-relative URLs
            return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
         },

         // http://jqueryvalidation.org/date-method/
         date: function (value, element) {
            return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
         },

         // http://jqueryvalidation.org/dateISO-method/
         dateISO: function (value, element) {
            return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
         },

         // http://jqueryvalidation.org/number-method/
         number: function (value, element) {
            return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
         },

         // http://jqueryvalidation.org/digits-method/
         digits: function (value, element) {
            return this.optional(element) || /^\d+$/.test(value);
         },

         // http://jqueryvalidation.org/creditcard-method/
         // based on http://en.wikipedia.org/wiki/Luhn_algorithm
         creditcard: function (value, element) {
            if (this.optional(element)) {
               return "dependency-mismatch";
            }
            // accept only spaces, digits and dashes
            if (/[^0-9 \-]+/.test(value)) {
               return false;
            }
            var nCheck = 0,
               nDigit = 0,
               bEven = false,
               n, cDigit;

            value = value.replace(/\D/g, "");

            // Basing min and max length on
            // http://developer.ean.com/general_info/Valid_Credit_Card_Types
            if (value.length < 13 || value.length > 19) {
               return false;
            }

            for (n = value.length - 1; n >= 0; n--) {
               cDigit = value.charAt(n);
               nDigit = parseInt(cDigit, 10);
               if (bEven) {
                  if ((nDigit *= 2) > 9) {
                     nDigit -= 9;
                  }
               }
               nCheck += nDigit;
               bEven = !bEven;
            }

            return (nCheck % 10) === 0;
         },

         // http://jqueryvalidation.org/minlength-method/
         minlength: function (value, element, param) {
            var length = $.isArray(value) ? value.length : this.getLength(value, element);
            return this.optional(element) || length >= param;
         },

         // http://jqueryvalidation.org/maxlength-method/
         maxlength: function (value, element, param) {
            var length = $.isArray(value) ? value.length : this.getLength(value, element);
            return this.optional(element) || length <= param;
         },

         // http://jqueryvalidation.org/rangelength-method/
         rangelength: function (value, element, param) {
            var length = $.isArray(value) ? value.length : this.getLength(value, element);
            return this.optional(element) || (length >= param[0] && length <= param[1]);
         },

         // http://jqueryvalidation.org/min-method/
         min: function (value, element, param) {
            return this.optional(element) || value >= param;
         },

         // http://jqueryvalidation.org/max-method/
         max: function (value, element, param) {
            return this.optional(element) || value <= param;
         },

         // http://jqueryvalidation.org/range-method/
         range: function (value, element, param) {
            return this.optional(element) || (value >= param[0] && value <= param[1]);
         },

         // http://jqueryvalidation.org/equalTo-method/
         equalTo: function (value, element, param) {
            // bind to the blur event of the target in order to revalidate whenever the target field is updated
            // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
            var target = $(param);
            if (this.settings.onfocusout) {
               target.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                  $(element).valid();
               });
            }
            return value === target.val();
         },

         // http://jqueryvalidation.org/remote-method/
         remote: function (value, element, param) {
            if (this.optional(element)) {
               return "dependency-mismatch";
            }

            var previous = this.previousValue(element),
               validator, data;

            if (!this.settings.messages[element.name]) {
               this.settings.messages[element.name] = {};
            }
            previous.originalMessage = this.settings.messages[element.name].remote;
            this.settings.messages[element.name].remote = previous.message;

            param = typeof param === "string" && { url: param } || param;

            if (previous.old === value) {
               return previous.valid;
            }

            previous.old = value;
            validator = this;
            this.startRequest(element);
            data = {};
            data[element.name] = value;
            $.ajax($.extend(true, {
               mode: "abort",
               port: "validate" + element.name,
               dataType: "json",
               data: data,
               context: validator.currentForm,
               success: function (response) {
                  var valid = response === true || response === "true",
                     errors, message, submitted;

                  validator.settings.messages[element.name].remote = previous.originalMessage;
                  if (valid) {
                     submitted = validator.formSubmitted;
                     validator.prepareElement(element);
                     validator.formSubmitted = submitted;
                     validator.successList.push(element);
                     delete validator.invalid[element.name];
                     validator.showErrors();
                  } else {
                     errors = {};
                     message = response || validator.defaultMessage(element, "remote");
                     errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                     validator.invalid[element.name] = true;
                     validator.showErrors(errors);
                  }
                  previous.valid = valid;
                  validator.stopRequest(element, valid);
               }
            }, param));
            return "pending";
         }
      }

   });

   // ajax mode: abort
   // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
   // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

   var pendingRequests = {},
      ajax;
   // Use a prefilter if available (1.5+)
   if ($.ajaxPrefilter) {
      $.ajaxPrefilter(function (settings, _, xhr) {
         var port = settings.port;
         if (settings.mode === "abort") {
            if (pendingRequests[port]) {
               pendingRequests[port].abort();
            }
            pendingRequests[port] = xhr;
         }
      });
   } else {
      // Proxy ajax
      ajax = $.ajax;
      $.ajax = function (settings) {
         var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
            port = ("port" in settings ? settings : $.ajaxSettings).port;
         if (mode === "abort") {
            if (pendingRequests[port]) {
               pendingRequests[port].abort();
            }
            pendingRequests[port] = ajax.apply(this, arguments);
            return pendingRequests[port];
         }
         return ajax.apply(this, arguments);
      };
   }

}));