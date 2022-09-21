import { _kategorie } from './data/kategorie';
import  { _newsy } from './data/newsy';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


const EventEmitter = require('events');
const eventEmitter = new EventEmitter ();
let swiper = {};

eventEmitter.on('greet', () => {
  console.log('Hello world!');
});

eventEmitter.emit('greet');



//document.addEventListener( 'DOMContentLoaded', function() {
    swiper = new Swiper('.swiper', {
        // configure Swiper to use modules
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
        
    
    });
//});

//console.log(_newsy);
// const kategorie = () => {
    function init() {

        function createCategoryMenu() {
            const menuContainer = document.getElementById('category-menu');
            const menuObject = document.createElement('a');
                menuObject.setAttribute('data-cat',  '');
                menuObject.innerHTML = 'Wszystkie'; 
                menuObject.classList.add('active');
                menuContainer.appendChild(menuObject);
            for (var key in _kategorie) {
                if (!_kategorie.hasOwnProperty(key)) continue;
        
                var obj = _kategorie[key];
                const menuObject = document.createElement('a');
                menuObject.setAttribute('data-cat',  key);
                menuObject.innerHTML = obj.menu.title; 
                menuObject.style.borderColor=''+obj.color;
                menuContainer.appendChild(menuObject);
            }

            rysujPunkty();
            
            
        }

        for (var key in _kategorie) {
            if (!_kategorie.hasOwnProperty(key)) continue;
        
            var obj = _kategorie[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                _kategorie[key].punkty= generatePoints(800, 600, 5, 40);
            }
        }

        createCategoryMenu();
    }

    function generatePoints( max_width, max_height, ilosc, margin) {
        function randomPoint(max, margin) {
            max -= 2* margin;
            return (Math.random() * max ) + margin;
        }
        let ret=[];
        for(let a=0; a <= ilosc; a++ )
        {
            ret.push([randomPoint(max_width, margin), randomPoint(max_height, margin)]);
        }
        return ret;
    }

    

    function punkt(top, left, color) {
        let pkt = document.createElement('div');
        pkt.classList.add('punkt');
        pkt.style.top = top+"px";
        pkt.style.left = left+"px";
        pkt.style.backgroundColor = color;
        document.querySelector('#mapa > div').appendChild(pkt);
    }

    function rysujPunkty(cat='') {
        let pkts = {};
        const oldPunkty = document.querySelectorAll('#mapa .punkt');
        
        oldPunkty.forEach((elem) => {
        elem.parentNode.removeChild(elem);
        });
    
        if(cat !== '') {
    
            if( _kategorie.hasOwnProperty(cat)) {
                pkts = _kategorie[cat].punkty;
                let color = _kategorie[cat].color;
    
                pkts.forEach((item) => {
                    //(var a in pkts) {
                    punkt(item[1],item[0], color);
                });
            }
        }
        else {
            for(var b in _kategorie)
            {
                if (!_kategorie.hasOwnProperty(b)) continue;
                pkts = _kategorie[b].punkty;
                let color = _kategorie[b].color;
                pkts.forEach((item) => {
                    punkt(item[1],item[0], color);
                });
            }
        }
    }
    
    




// };

function zrobSlider(cat='') {
    swiper.removeAllSlides();
    swiper.update();
    if(cat !== '') {

        if( _newsy.hasOwnProperty(cat)) {
            let aa = _newsy[cat];
            console.log(aa);
            
            for(var i in _newsy[cat]) {
                const news = document.createElement('div');

                news.classList.add('swiper-slide');

                news.innerHTML = '<article><img src="'+ _newsy[cat][i].img+'" />       <h3>'+_newsy[cat][i].title+'</h3><p>'+_newsy[cat][i].content+'</p></article>';
                //let tmp = document.querySelector('.splide__list').appendChild(news);

                swiper.appendSlide( news );
                swiper.update();
            }
        }
    }
    else {
        for(var b in _newsy)
        {
            if (!_newsy.hasOwnProperty(b)) continue;
            const pkts = _newsy[b];
            console.log(pkts);
            for(var t in pkts) {
                const news = document.createElement('div');

                news.classList.add('swiper-slide');

                news.innerHTML = '<article><img src="'+ pkts[t].img+'" />       <h3>'+pkts[t].title+'</h3><p>'+pkts[t].content+'</p></article>';
                //let tmp = document.querySelector('.splide__list').appendChild(news);
                console.log('jest');
                swiper.appendSlide( news );
                swiper.update();
            };
        }
    }
}

function doRender(cat) {


if(cat !== null || cat !== '') {
    rysujPunkty(cat);
    zrobSlider(cat);
}
else {
    rysujPunkty();
    zrobSlider();
}
}

document.addEventListener('click', function (event) {

	if (!event.target.matches('#category-menu a')) return;

	event.preventDefault();
    let cat = event.target.getAttribute('data-cat');
    event.target.classList.add('active');
    doRender(cat);
}, false);

window.addEventListener('load', function(event) {
    init();
    doRender();
    // for (var key in kategorie) {
    //     if (!kategorie.hasOwnProperty(key)) continue;
    
    //     var obj = kategorie[key];
    //     for (var prop in obj) {
    //         if (!obj.hasOwnProperty(prop)) continue;
    //         kategorie[key].punkty= generatePoints(800, 600, 5, 40);
    //     }
    // }
    // createCategoryMenu();

    
}); 

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style
      .backgroundColor = 'yellow';
  }
  