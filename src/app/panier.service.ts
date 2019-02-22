import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, empty, Subject, from } from "rxjs/index";
import { map, tap, catchError } from "rxjs/internal/operators";

import { Plat } from "../models/Plat";
import { Dessert } from "../models/Dessert";
import { Snack } from "../models/Snack";
import { Boisson } from "../models/Boisson";
import { Entree } from "../models/Entree";
import { Nourriture } from "../models/supermodels/Nourriture";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { resolve } from "url";

import { Menu } from "src/models/Menu";

@Injectable({
  providedIn: "root"
})
export class PanierService {
  nourritureArray: Nourriture[] = [];
  menuArray: Menu[] = [];
  isNourriturePanierEmpty : boolean = true;
  isMenuPanierEmpty: boolean = true;
  getNourriturePanier(): Observable<Nourriture[]> {
    return of(this.nourritureArray)
  }
  getMenuPanier(): Observable<Menu[]> {
    return of(this.menuArray)
  }

  heureDeFin = 24;
  today = new Date();
  currentDate = this.formatDate(this.today);
  currentHour = this.today.getHours();
  formatDate(date) {
    let YYYY = date.getFullYear();
    let MM = date.getMonth() + 1;
    let DD = date.getDate();
    if (MM < 10) {
      MM = "0" + MM;
    }
    if (DD < 10) {
      DD = "0" + DD;
    }
    return YYYY + "-" + MM + "-" + DD;
  }

  constructor(
    private http: HttpClient,
    private cantineappdb: AngularFirestore
  ) {}


  addPlatToPanier(plat: Nourriture): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentHour < this.heureDeFin) {
        this.nourritureArray.push(plat);
        this.isNourriturePanierEmpty = false;
        resolve();
      } else {
        reject();
      }
    });
  }
  deletePlatFromPanier(plat: Nourriture) {
    let indexOfPlat = this.nourritureArray.indexOf(plat);
    this.nourritureArray.splice(indexOfPlat);
  }

  addMenuToPanier(menu: Menu, date): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentHour < this.heureDeFin && date === this.currentDate) {
        this.menuArray.push(menu);
        this.isMenuPanierEmpty = false;
        resolve();
      } else {
        reject();
      }
    });
  }

  emptyPanier() {
    this.nourritureArray = [];
    this.menuArray = [];
    this.isMenuPanierEmpty = true;
    this.isNourriturePanierEmpty = true;
    
    console.log(this.isNourriturePanierEmpty,this.isMenuPanierEmpty)
  }

  calculerPrixPanier(): number {
    let prixMenus: number = 0;
    this.menuArray.forEach(menu => {
      prixMenus += menu.price;
    });

    let prixNourritures: number = 0;
    this.nourritureArray.forEach(nourriture => {
      prixNourritures += nourriture.price;
    });
    return prixMenus + prixNourritures;
  }

  consumePanier() {
    let panierRef = {};
    let user = JSON.parse(localStorage.getItem("user"));

    panierRef["idUser"] = user.id;
    panierRef["price"] = this.calculerPrixPanier();
    panierRef["date"] = new Date();

    Object.entries(this.nourritureArray).forEach(([key, value]) => {
      panierRef[value.id] = value.name;
    });
    Object.entries(this.menuArray).forEach(([key, value]) => {
      panierRef[value.id] = value.name;
    });

    let commande = panierRef;
    console.log(commande);
    panierRef = [];

    this.emptyPanier();

    return new Promise((res, rej) => {
      if (commande) {
        this.cantineappdb
          .collection("Commandes")
          .add(commande)
          .then(function() {
            console.log("Commande envoyée!");
            res();
          })
          .catch(function(error) {
            rej();
          });
      } else {
        rej();
      }
    });
  }
}
