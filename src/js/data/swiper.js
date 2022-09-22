export const swiperData = {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    slidesPerView: 4,
    grid: {
        rows: 2,
        fill:'row',
    },
    spaceBetween: 0,
    lazy: true,
    breakpoints: {
        // when window width is >= 320px
        // when window width is >= 640px
        768: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 40,
            grid: {
                rows: 2,
                fill:'row',
            },
        }
    },
    

};