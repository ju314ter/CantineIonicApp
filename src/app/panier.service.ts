import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, empty } from "rxjs/index";
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
import {Pro} from '@ionic/pro';
import {reject} from 'q';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({
  providedIn: "root"
})
export class PanierService {

  nourritureArray: Nourriture[] = [];
  menuArray: Menu[] = [];

  nourritureStore = of(this.nourritureArray);
  menuStore = of(this.menuArray);
  heureDeFin = 12;
  today = new Date();
  currentDate = this.formatDate(this.today);
  currentHour = this.today.getHours();
  constructor(
    private http: HttpClient,
    private cantineappdb: AngularFirestore
  ) {}

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return error;
    };
  }
    formatDate(date) {
        let YYYY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let DD = date.getDate();
        if (MM < 10) {
            MM = '0' + MM;
        }
        if (DD < 10) {
            DD = '0' + DD;
        }
        return YYYY + '-' + MM + '-' + DD;
    }
  addPlatToPanier(plat: Nourriture): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentHour < this.heureDeFin) {
          this.nourritureArray.push(plat);
          resolve();
      } else {
        reject();
      }
    });
  }
  deletePlatFromPanier(plat:Nourriture){
    let indexOfPlat = this.nourritureArray.indexOf(plat);
    this.nourritureArray.splice(indexOfPlat);
  }

  addMenuToPanier(menu: Menu, date): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentHour < this.heureDeFin && date === this.currentDate) {
          this.menuArray.push(menu);
          resolve();
      } else {
        reject();
      }
      });
  }


  emptyPanier(){
    this.nourritureArray = [];
    this.menuArray = [];
  }

  calculerPrixPanier(): number{
    let prixMenus: number = 0;
    this.menuArray.forEach((menu)=>{
      prixMenus+=menu.price
    })

    let prixNourritures: number = 0;
    this.nourritureArray.forEach((nourriture) =>{
      prixNourritures += nourriture.price
    })
    return prixMenus+prixNourritures;
  }

  consumePanier(){
    let panierRef = {};
    let user=JSON.parse(localStorage.getItem('user'));

    panierRef["idUser"]=user.id
    panierRef["price"]= this.calculerPrixPanier();
    panierRef["date"]= new Date();

    Object.entries(this.nourritureArray).forEach(([key, value])=>{
      panierRef[value.id] = value.name;
    })
    Object.entries(this.menuArray).forEach(([key, value])=>{
      panierRef[value.id] = value.name;
    })

    let commande = panierRef;
    console.log(commande)
    panierRef= [];

    this.emptyPanier();

    return new Promise((res, rej) => {
      if(commande){
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
        }
        else{
          rej();
        }  
      });
      
  }
}
