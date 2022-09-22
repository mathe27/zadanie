import { _kategorie } from '../data/kategorie';
import  { _newsy } from '../data/newsy';
import  { _menu } from '../data/menu';
import { kategoriePanel } from "./kategorie";
import {zadanieMenu} from "./menu";
import "./../scss/styles.scss";


zadanieMenu(_menu);
kategoriePanel(_kategorie,_newsy, _menu);

window.onload = function(event) {

    document.body.classList.remove('loading');

    
}; 