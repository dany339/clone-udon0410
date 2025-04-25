/* MOBILE MENU */
$("header .nav .nav-icon").click(function () {
  $(this).toggleClass("active");
  $("header .navbar").toggleClass("active");
});

/* TABS FUNCTION */

$(".tabs li").click(function () {
  $(".tab-content").removeClass("active");
  $(".tabs li").removeClass("active");
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
