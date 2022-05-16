const swiper = new Swiper(".featured-swiper", {
  rewind: true,
  slidesPerView: 4,
  spaceBetween: 16,
  scrollbar: {
    el: ".featured-scrollbar",
    dragSize: 215,
  },
});

const pdp_swiper = new Swiper(".gallery-swiper", {
  rewind: true,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
});
