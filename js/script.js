const $navIcon = $(".nav-icon");
const $navBar = $(".navbar");

$navIcon.on("click", function () {
  $navBar.toggleClass("active");
  $navIcon.toggleClass("active");
});

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
