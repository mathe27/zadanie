import { _kategorie } from './data/kategorie';
import  { _newsy } from './data/newsy';
const EventEmitter = require('events');
const eventEmitter = new EventEmitter ();

eventEmitter.on('greet', () => {
  console.log('Hello world!');
});

eventEmitter.emit('greet');

//console.log(_newsy);
// const kategorie = () => {
    function init(_kategorie, _news) {
        const kategorie = _kategorie;
        const newsy = _newsy;
        console.log(newsy);
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
        //document.body.appendChild(menuContainer);
        rysujPunkty();
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

window.addEventListener('load', function(event) {
    init(_kategorie, _newsy);
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