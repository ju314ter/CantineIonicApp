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
  nourritureDocument: AngularFirestoreDocument<Nourriture>;
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
    let typeOfNourriture = "";
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

  getNourritureFromDb(type): Promise<any> {
    this.nourritureCollection = this.cantineappdb
      .collection("Inventaire")
      .doc("Nourriture")
      .collection(type);

    return new Promise((resolve, reject) => {
      switch (type) {
        case "Plats": {
          this.nourritureCollection.ref.get().then(data => {
            let platArray: Plat[] = [];
            data.docs.forEach(doc => {
              let plat = new Plat("", 0, false, 0, "", "", [""], false);
              plat.name = doc.data().nourritureJson.name;
              plat.price = doc.data().nourritureJson.price;
              plat.ingredients = doc.data().nourritureJson.ingredients;
              plat.type = doc.data().nourritureJson.type;
              plat.availableQuantity = doc.data().nourritureJson.availableQuantity;
              plat.isAvailableOffMenu = doc.data().nourritureJson.isAvailableOffMenu;
              plat.imgUrl = doc.data().nourritureJson.imgUrl;
              plat.temp = doc.data().nourritureJson.temp;
              plat.id = doc.id;
              platArray.push(plat);
            });
            resolve(platArray);
          });
          break;
        }
        case "Entrees": {
          this.nourritureCollection.ref.get().then(data => {
            let entreeArray: Entree[] = [];
            data.docs.forEach(doc => {
              let entree = new Entree([""], "", 0, false, 0, "", "", false, "");
              entree.name = doc.data().nourritureJson.name;
              entree.price = doc.data().nourritureJson.price;
              entree.ingredients = doc.data().nourritureJson.ingredients;
              entree.type = doc.data().nourritureJson.type;
              entree.availableQuantity = doc.data().nourritureJson.availableQuantity;
              entree.isAvailableOffMenu = doc.data().nourritureJson.isAvailableOffMenu;
              entree.imgUrl = doc.data().nourritureJson.imgUrl;
              entree.temp = doc.data().nourritureJson.temp;
              entree.description = doc.data().nourritureJson.description;
              entree.id = doc.id;
              entreeArray.push(entree);
            });
            resolve(entreeArray);
          });
          break;
        }
        case "Snacks": {
          this.nourritureCollection.ref.get().then(data => {
            let snackArray: Snack[] = [];
            data.docs.forEach(doc => {
              let snack = new Snack("", 0, false, 0, "", "", false);
              snack.name = doc.data().nourritureJson.name;
              snack.price = doc.data().nourritureJson.price;
              snack.type = doc.data().nourritureJson.type;
              snack.availableQuantity = doc.data().nourritureJson.availableQuantity;
              snack.isAvailableOffMenu = doc.data().nourritureJson.isAvailableOffMenu;
              snack.imgUrl = doc.data().nourritureJson.imgUrl;
              snack.isSalty = doc.data().nourritureJson.isSalty;
              snack.id = doc.id;
              snackArray.push(snack);
            });
            resolve(snackArray);
          });
          break;
        }
        case "Boissons": {
          this.nourritureCollection.ref.get().then(data => {
            let boissonArray: Boisson[] = [];
            data.docs.forEach(doc => {
              let boisson = new Boisson("", 0, false, 0, "", "", false);
              boisson.name = doc.data().nourritureJson.name;
              boisson.price = doc.data().nourritureJson.price;
              boisson.type = doc.data().nourritureJson.type;
              boisson.availableQuantity = doc.data().nourritureJson.availableQuantity;
              boisson.isAvailableOffMenu = doc.data().nourritureJson.isAvailableOffMenu;
              boisson.imgUrl = doc.data().nourritureJson.imgUrl;
              boisson.temp = doc.data().nourritureJson.temp;
              boisson.id = doc.id;
              boissonArray.push(boisson);
            });
            resolve(boissonArray);
          });
          break;
        }
        case "Desserts": {
          this.nourritureCollection.ref.get().then(data => {
            let dessertArray: Dessert[] = [];
            data.docs.forEach(doc => {
              let dessert = new Dessert("", 0, false, 0, "", "", false);
              dessert.name = doc.data().nourritureJson.name;
              dessert.price = doc.data().nourritureJson.price;
              dessert.isFrozen = doc.data().nourritureJson.isFrozen;
              dessert.type = doc.data().nourritureJson.type;
              dessert.availableQuantity = doc.data().nourritureJson.availableQuantity;
              dessert.isAvailableOffMenu = doc.data().nourritureJson.isAvailableOffMenu;
              dessert.imgUrl = doc.data().nourritureJson.imgUrl;
              dessert.id = doc.id;
              dessertArray.push(dessert);
            });
            resolve(dessertArray);
          });
          break;
        }
        default: {
          console.log("Aucun type sélectionné");
          reject();
        }
      }
    });
  }

  pushMenuToDb<Menu>(menu: Menu) {
    // return new Promise((res, rej) => {
    //   this.cantineappdb
    //     .collection("Inventaire")
    //     .doc("Menu")
    //     .collection(typeOfNourriture)
    //     .add({ menuJson })
    //     .then(function() {
    //       console.log("Document ajouté!");
    //       res();
    //     })
    //     .catch(function(error) {
    //       rej();
    //       this.handleError(error);
    //     });
    // });
  }

  getMenuFromDb() {}
}
