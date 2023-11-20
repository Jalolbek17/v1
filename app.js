// ==========================SCROLL, HEADER, BURGER.... other jses==============================//

"use strict";
$(document).ready(function () {
  function t() {
    $(".section").each(function () {
      var t = $('#dot-nav a[href="#' + $(this).attr("id") + '"]').data(
          "number"
        ),
        e = $(this).offset().top,
        n = $(window).height() / 2,
        o = $(window).scrollTop(),
        i = e - n < o,
        r = e + $(this).height() - n > o;
      i && r
        ? $("#dot-nav a").eq(t).addClass("is-selected")
        : $("#dot-nav a").eq(t).removeClass("is-selected");
    });
  }
  function e(t) {
    $("body, html").animate(
      {
        scrollTop: t.offset().top + 70,
      },
      500
    );
  }
  function n() {
    var t = window.innerWidth > 768,
      e = s.offsetTop - s.offsetTop / 4,
      n = window.scrollY > e,
      i = d.classList.contains("open");
    t && n
      ? a.classList.add("active")
      : t && i
      ? o()
      : a.classList.remove("active");
  }
  function o() {
    l.classList.toggle("active"),
      d.classList.toggle("open"),
      document.body.classList.toggle("noScroll");
  }
  function i() {
    this.parentElement.classList.add("is-active", "is-completed");
  }
  function r() {
    this.parentElement.classList.remove("is-active", "is-completed");
  }
  function c() {
    (f.style.height = ""),
      (f.style.height = Math.min(f.scrollHeight, v) + "px");
  }
  t(),
    window.addEventListener("scroll", t),
    $(".scroll-down").on("click", function (t) {
      t.preventDefault(), e($(this.hash));
    }),
    $("#dot-nav a").on("click", function (t) {
      t.preventDefault(), e($(this.hash));
    }),
    $("#overlay a").on("click", function (t) {
      t.preventDefault(), e($(this.hash)), $("#toggle").click();
    });
  var a = document.querySelector("#dot-nav"),
    s = document.querySelector("#about-section"),
    l = document.querySelector("#toggle"),
    d = document.querySelector("#overlay");
  window.addEventListener("scroll", n),
    window.addEventListener("resize", n),
    l.addEventListener("click", o);
  var u = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        u.Android() || u.BlackBerry() || u.iOS() || u.Opera() || u.Windows()
      );
    },
  };
  u.any() ||
    skrollr.init({
      render: function (t) {},
      smoothScrolling: !1,
      forceHeight: !1,
    });
  var h = document.querySelectorAll(".contact-input");
  h.forEach(function (t) {
    return t.addEventListener("focus", i);
  }),
    h.forEach(function (t) {
      return t.addEventListener("blur", r);
    });
  var f = document.querySelector("#message"),
    v = 300;
  f.addEventListener("input", c);
});
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-btn");

modalBtn.addEventListener("click", function () {
  modal.classList.add("close");
});

//============================sqroll animation================================= //

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".timeline-content");
hiddenElements.forEach((el) => observer.observe(el));

// =======================3D PROJECT JS============================//
const tilt = document.querySelectorAll(".tilt");
VanillaTilt.init(tilt, {
  reverse: true,
  max: 30,
  speed: 2000,
  scale: 1.25,
  glare: true,
  reset: true,
  perspective: 900,
  transition: true,
  "max-glare": 0.45,
  "glare-prerender": false,
  gyroscope: true,
  gyroscopeMinAngleX: -45,
  gyroscopeMaxAngleX: 45,
  gyroscopeMinAngleY: -45,
  gyroscopeMaxAngleY: 45,
});

// =======================MY TEAM JS=============================//
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

let mask = document.querySelector(".loader");

window.addEventListener("load", () => {
  mask.classList.add("hide");
  setTimeout(() => {
    mask.remove();
  }, 3000);
});

const bottomButton = document.querySelector(".bottom-button");

window.addEventListener("scroll", () => {
  bottomButton.classList.toggle("active", window.scrollY > 300);
});
