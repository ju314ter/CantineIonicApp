import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { firebase } from '@firebase/app';
import {AuthCredential} from '@firebase/auth-types';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { resolve } from "url";

import { Observable, of } from "rxjs";
import { switchMap, startWith, tap, filter } from 'rxjs/operators'

import { User } from "src/models/supermodels/User";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};
@Injectable({
  providedIn: "root"
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;
  user : Observable<User | null>
  constructor(
    private http: HttpClient,
    private cantineappdb: AngularFirestore,
    private cantineAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.cantineAuth.authState.pipe(
      switchMap((user) => {
        if(user){
          return this.cantineappdb.doc<User>(`Utilisateurs/${user.uid}`).valueChanges();
        } else {
          return of(null)
        }
      }),
      // startWith(JSON.parse(localStorage.getItem('user')))
    )
    console.log(JSON.stringify(this.user));
  }

  inscrireUser(user: User) {

    return this.cantineAuth.auth.createUserWithEmailAndPassword(user.mailUser, user.password)
    .then(credential => { return this.updateUserWithCredential(credential.user) })
    .catch()

    // let userJson = JSON.parse(JSON.stringify(user));
    // console.log(userJson);

    // return new Promise((res, rej) => {
    //   this.cantineappdb
    //     .collection("Utilisateurs")
    //     .add({ userJson })
    //     .then(function() {
    //       console.log("Document utilisateur ajouté!");
    //       res();
    //     })
    //     .catch(function(error) {
    //       rej();
    //     });
    // });
  }

  connecterUser(user: User) {

    return this.cantineAuth.auth.signInWithEmailAndPassword(user.mailUser, user.password)
    .then(data => { localStorage.setItem('user', JSON.stringify(data)) })

    // this.userCollection = this.cantineappdb.collection("Utilisateurs");

    // let query = this.userCollection.ref.where("userJson.mailUser", "==", user.mailUser).where("userJson.password", "==", user.password);
    
    // return new Promise((res, rej) => {
    //     query.get().then((docs)=>{
    //       if(docs.empty){
    //         rej("Logging failed")
    //       } else {
    //           docs.forEach((doc)=>{
    //             let foundUser: User;
    //             foundUser.id = doc.id;
    //             foundUser.mailUser = doc.data().userJson.mailUser;
    //             foundUser.password = doc.data().userJson.password;
    //             res(foundUser)
    //           })
    //       }
    //     });
    // });
  }

  logOutUser(){
    this.cantineAuth.auth.signOut().then(()=>{
      localStorage.removeItem('user')
      this.router.navigate(['/'])
    });
  }

  updateUserWithCredential(user){
    const userRef = this.cantineappdb.doc(`/Utilisateurs/${user.uid}`)

    const data: User = {
      id : user.uid,
      mailUser : user.email || null,
      password : user.password || null,
      pseudo : user.pseudo || null,
      promotion : user.promotion || null,
      credit : user.credit || null,
      isAdmin: user.admin || false,
    }
    return userRef.set(data)
  }
  
}