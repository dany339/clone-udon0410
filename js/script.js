/* MOBILE MENU */
$("header .nav .nav-icon").click(function () {
  $(this).toggleClass("active");
  $("header .navbar").toggleClass("active");
});

/* TOP BUTTON */
const topBtn = document.querySelector(".top_btn");
const html = document.documentElement;
const htmlPos = html.scrollHeight / 3.5;

$(".top_btn").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 400);
  return false;
});

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop >= htmlPos) {
    topBtn.classList.add("active");
  } else {
    topBtn.classList.remove("active");
  }
});

/* TABS FUNCTION */
$(".post-12 .tabs li").click(function () {
  $(".tab-content").removeClass("active");
  $(".post-12 .tabs li").removeClass("active");
  $(this).addClass("active");

  var tabId = $(this).data("tab");
  $("#" + tabId).addClass("active");

  $(".tabs-wrap").removeClass("active");
});

/* MAIN */
if ($(".swiper-container")) {
  const sec1Swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    loop: true,
    /* autoplay: {
      delay: 4000,
    }, */
    spaceBetween: 30,
    pagination: {
      el: ".swiper-container .swiper-pagination",
      clickable: true,
    },
  });
}

if ($(".swiper-container2")) {
  const sec2Swiper = new Swiper(".swiper-container2", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".swiper-container2 .swiper-pagination2",
      clickable: true,
    },
  });
}

/* HISTORY */
if ($(".slick-list")) {
  const slickSwiper = new Swiper(".slick-list", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".slick-list .swiper-pagination2",
      clickable: true,
    },
  });
}
