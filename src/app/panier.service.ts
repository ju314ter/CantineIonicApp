import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs/index";
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

  nourritureStore = of(this.nourritureArray)
  menuStore = of(this.menuArray)
 

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
 
  addPlatToPanier(plat: Nourriture){
      this.nourritureArray.push(plat)
  }

  addMenuToPanier(menu: Menu){
      this.menuArray.push(menu)
  }

  emptyPanier(){
    this.nourritureArray = [];
    this.menuArray = [];
  }

  consumePanier(){
    let panierRef = [];
    let user=JSON.parse(localStorage.getItem('user'));

    panierRef.push({idUser: user.id})

    Object.entries(this.nourritureArray).forEach(([key, value])=>{
      panierRef.push({idNourriture: value.id, nameNourriture: value.name})
    })
    Object.entries(this.menuArray).forEach(([key, value])=>{
      panierRef.push({idMenu: value.id, nameMenu: value.name})
    })

    let commande = JSON.parse(JSON.stringify(panierRef));
    
    panierRef= [];

    this.nourritureArray = [];
    this.menuArray = [];
    return new Promise((res, rej) => {
      if(commande.length != 0){
        this.cantineappdb
          .collection("Commandes")
          .add({commande})
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
