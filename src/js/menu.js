import  { _menu } from './data/menu';

const header = document.getElementsByTagName('header')[0];
const nav = document.getElementsByTagName('nav')[0];
//const ham = document.getElementById('hamburger');
const section = document.createElement('section');
section.classList.add('container');
nav.appendChild(section);

const menu_container = document.createElement('ul');
menu_container.classList.add('menu-container');
section.appendChild(menu_container);
for(var m in _menu)
{
//menu.forEach((key, item) => {
    const liElem = document.createElement('li');
    menu_container.appendChild(liElem);
    liElem.classList.add('item');
    const anchorElem = document.createElement('a');
    anchorElem.innerHTML = _menu[m].title;
    liElem.appendChild(anchorElem);
};//);
const ham = document.createElement('li');
ham.classList.add('toggle');
ham.innerHTML='<span></span><span></span><span></span>'  ;
menu_container.appendChild(ham);


ham.addEventListener('click', function (event) {

	//if (!event.target.matches('.toggle')) return;
    let active_class = 'active';
    console.log('helllloo');
	event.preventDefault();
    if (menu_container.classList.contains(active_class)) {
        menu_container.classList.remove(active_class);
         ham.classList.remove(active_class);
        // adds the menu (hamburger) icon
        //toggle.querySelector("a").innerHTML = "<i class=’fas fa-bars’></i>";
    } else {
        menu_container.classList.add(active_class);
        ham.classList.add(active_class); 
        // adds the close (x) icon
        //toggle.querySelector("a").innerHTML = "<i class=’fas fa-times’></i>";
    }
    
}, true);