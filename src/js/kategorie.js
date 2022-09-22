import { swiperData } from '../data/swiper';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const Mustache = require('mustache');


export const kategoriePanel = (kategorieDane={}, newsyDane={}, _menu={}) => {
    const kategorie = kategorieDane;
    const newsy = newsyDane;
    const swiper = new Swiper('.swiper', swiperData);
    const menu = _menu;

    document.onreadystatechange = function(event) {
        if (document.readyState === "complete") {
               doLoad();
               dragElement(document.getElementById("mydiv"));

        }
    }; 
    
    function init() {
        for (var key in kategorie) {
            if (!kategorie.hasOwnProperty(key)) continue;
        
            var obj = kategorie[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                kategorie[key].punkty= generatePoints(800, 600, 5, 40);
            }
        }

        createCategoryMenu();
    }

    function createCategoryMenu() {
        let template = '<h2><a name="{{slug}}"></a>{{title}}</h2><div id="category-menu"></div><div id="mapa"><div id="mydiv"></div></div>';
        let container = document.getElementById('category-container');

        container.innerHTML = Mustache.render(template,menu[0]);

        const menuContainer = document.getElementById('category-menu');

        function render(view) {
            var res = Mustache.render('<a href="#" data-color="{{color}}" data-cat="{{item_id}}" style="--cat-menu-color:{{color}}">{{title}}</a>', view);
            menuContainer.innerHTML += res;
        }

        render({'item_id':'', title: 'Wszystkie',color:'#777687'});

        for (var key in kategorie) {
            if (!kategorie.hasOwnProperty(key)) continue;
    
            var obj = kategorie[key];
            render({'item_id':key, title: obj.menu.title,color:obj.color});
        }

        rysujPunkty();       
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
        var view = {
            color:color,
            top: top+'px',
            left: left+"px",
        };

        var res = Mustache.render('<div class="punkt" style="top:{{top}};left:{{left}};background-color:{{color}}"> </div>', view);
        document.querySelector('#mapa > div').innerHTML += res;
    }

    function rysujPunkty(cat='') {
        let pkts = {};
        const oldPunkty = document.querySelectorAll('#mapa .punkt');
        
        oldPunkty.forEach((elem) => {
        elem.parentNode.removeChild(elem);
        });
    
        if(cat !== '') {
    
            if( kategorie.hasOwnProperty(cat)) {
                pkts = kategorie[cat].punkty;
                let color = kategorie[cat].color;
    
                pkts.forEach((item) => {
                    punkt(item[1],item[0], color);
                });
            }
        }
        else {
            for(var b in kategorie)
            {
                if (!kategorie.hasOwnProperty(b)) continue;
                pkts = kategorie[b].punkty;
                let color = kategorie[b].color;
                pkts.forEach((item) => {
                    punkt(item[1],item[0], color);
                });
            }
        }
    }

    function zrobSlider(cat='') {
        swiper.removeAllSlides();
        swiper.update();

        function renderSlide(item) {
            let news = render(item);

            swiper.appendSlide( news );
            swiper.update();
        }

        function render(view) {
            var res = Mustache.render('<div class="swiper-slide"><article><div><img src="{{img}}" /></div>  <h3>{{title}}</h3><p>{{content}}</p></article></div>', view);
            
            return res;
            }

        if(cat !== '') {

            if( newsy.hasOwnProperty(cat)) {
            
                for(var i in newsy[cat]) {
                    renderSlide(newsy[cat][i]);
                }
            }
        }
        else {
            for(var b in newsy)
            {
                if (!newsy.hasOwnProperty(b)) continue;
                for(var t in newsy[b]) {
                    renderSlide(newsy[b][t]);
                };
            }
        }
    }

    window.addEventListener("resize", function(){
        swiper.update();
    });

    document.addEventListener('click', function (event) {

        if (!event.target.matches('#category-menu a')) return;

        event.preventDefault();
        let cat = event.target.getAttribute('data-cat');
        doRender(cat);
    }, false);

    function doRender(cat='') {
        let parent = document.getElementById('category-menu');
        let childs  =Array.from(parent.childNodes);
        for(let i in childs)
        {
            childs[i].classList.remove('active');
        }
        document.querySelector('[data-cat="'+cat+'"]').classList.add('active');
        rysujPunkty(cat);
        zrobSlider(cat);
    }

    function doLoad(e) {
        init();
        doRender();
    };
}



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var elmntParent = elmnt.parentNode;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    

    let topPos = (elmnt.offsetTop - elmntParent.offsetTop) -  pos2;
    // przesuwaj tylko do momentu, gdy górne krawedzie elmnt i elmntParent zetkną się
    if(topPos > 0 )
        topPos = 0;

    // to samo dla dolnych
    if((elmntParent.offsetHeight - elmnt.offsetHeight) > topPos ) {
        topPos = elmntParent.offsetHeight - elmnt.offsetHeight;

    }

    elmnt.style.top =  topPos + "px";

    let leftPos = (elmnt.offsetLeft - elmntParent.offsetLeft) -  pos1;
    // przesuwaj tylko do momentu, gdy lewe krawedzie elmnt i elmntParent zetkną się
    if(leftPos > 0 )
        leftPos = 0;

    // to samo dla prawych
    if((elmntParent.offsetWidth - elmnt.offsetWidth) > leftPos)
        leftPos = elmntParent.offsetWidth - elmnt.offsetWidth;

    elmnt.style.left = leftPos + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}