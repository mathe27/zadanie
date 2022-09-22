import { swiperData } from './data/swiper';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

var Mustache = require('mustache');


export const kategoriePanel = (kategorieDane, newsyDane) => {
    const kategorie = kategorieDane;
    const newsy = newsyDane;
    const swiper = new Swiper('.swiper', swiperData);

    document.onreadystatechange = function(event) {
        if (document.readyState === "complete") {
               doLoad();

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
        const menuContainer = document.getElementById('category-menu');
        var view = {};

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
            var res = Mustache.render('<div class="swiper-slide"><article><img src="{{img}}" />       <h3>{{title}}</h3><p>{{content}}</p></article></div>', view);
            
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

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style
      .backgroundColor = 'yellow';
  }


  //dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    //let top = elmnt.offsetTop - pos2;
    //console.log(pos1, pos2);
    //console.log(elmnt.offsetTop - pos2);
    // set the element's new position:
    
    //console.log(top);
   // if(elmnt.offsetTop - pos2 <= 0)
    {
       // top = 0 ;
        elmnt.style.top =  (pos2 * -1) + "px";
    }
        //elmnt.style.top = top + "px";
    //if(elmnt.offsetLeft - pos1 <= 0)
    elmnt.style.left = pos1 + "px";//(elmnt.offsetLeft - pos1) + "px";
    //console.log(elmnt.style.left);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}