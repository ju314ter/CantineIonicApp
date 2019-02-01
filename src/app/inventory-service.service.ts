import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/index";
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

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({
  providedIn: "root"
})
export class InventoryServiceService {
  nourritureCollection: AngularFirestoreCollection<Nourriture>;
  nourriture: Observable<Nourriture[]>;

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
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return error;
    };
  }

  pushNourritureToDb<Nourriture>(nourriture) {
    let typeOfNourriture = "Plats";
    switch (nourriture.type) {
      case "Plat": {
        typeOfNourriture = "Plats";
        break;
      }
      case "Entree": {
        typeOfNourriture = "Entrees";
        break;
      }
      case "Snack": {
        typeOfNourriture = "Snacks";
        break;
      }
      case "Boisson": {
        typeOfNourriture = "Boissons";
        break;
      }
      case "Dessert": {
        typeOfNourriture = "Desserts";
        break;
      }
    }

    let nourritureJson = JSON.parse(JSON.stringify(nourriture));
    console.log(nourritureJson);

    return new Promise((res, rej) => {
      this.cantineappdb
        .collection("Inventaire")
        .doc("Nourriture")
        .collection(typeOfNourriture)
        .add({ nourritureJson })
        .then(function() {
          console.log("Document ajouté!");
          res();
        })
        .catch(function(error) {
          rej();
          this.handleError(error);
        });
    });
  }

  getNourritureFromDb() {
    this.nourritureCollection = this.cantineappdb.collection("Nourriture");
    return (this.nourriture = this.nourritureCollection.valueChanges());
  }

  pushMenuToDb<Menu>(menu: Menu): Observable<Menu> {
    const url = "https://food-for-fun-bdd.firebaseio.com/menu.json";
    return this.http.post<Menu>(url, menu, { responseType: "json" }).pipe(
      tap((product: Menu) => console.log("nourriture ajouté")),
      catchError(this.handleError<Menu>("pushNourritureToDb"))
    );
  }

  getMenuFromDb() {}
}
