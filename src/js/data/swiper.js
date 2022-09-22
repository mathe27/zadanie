export const swiperData = {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    slidesPerView: 8,
    slidesPerColumn: 2,
    //slidesPerGroup :8,
    grid: {
        rows: 2,
        fill:'row',
    },
    spaceBetween: 0,
    lazy: true,
    breakpoints: {
        // when window width is >= 320px
        // when window width is >= 640px
        150: {
            slidesPerView: 2,
            spaceBetween: 10,
            grid: {
                rows: 1,
                fill:'row',
            },
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
            grid: {
                rows: 1,
                fill:'row',
            },
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 10,
            grid: {
                rows: 2,
                fill:'row',
            },
        }
    },
    

};