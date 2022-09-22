import  { _menu } from './data/menu';
var Mustache = require('mustache');

export const zadanieMenu = () => {

    var template = '<section class="container"><ul class="menu-container">{{#menu-items}}<li class="item"><a href="#{{slug}}">{{title}}</a></li>{{/menu-items}}<li class="toggle" id="main-menu-toggle"><span></span><span></span><span></span></li></ul></section>';

    const nav = document.getElementsByTagName('nav')[0];
    var res = Mustache.render(template, {'menu-items': _menu,});
    
    nav.innerHTML = res;

    const ham = document.getElementById('main-menu-toggle');
    ham.addEventListener('click', function (event) {

        let active_class = 'active';
        let menuContainer = this.closest('.menu-container');
        
        event.preventDefault();
        if (menuContainer.classList.contains(active_class)) {
            menuContainer.classList.remove(active_class);
            ham.classList.remove(active_class);
        } else {
            menuContainer.classList.add(active_class);
            ham.classList.add(active_class); 
        }

    },true);
}