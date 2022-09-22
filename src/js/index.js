import { _kategorie } from '../data/kategorie';
import  { _newsy } from '../data/newsy';
import { kategoriePanel } from "./kategorie";
import {zadanieMenu} from "./menu";
import "./../scss/styles.scss";


zadanieMenu();
kategoriePanel(_kategorie,_newsy);
