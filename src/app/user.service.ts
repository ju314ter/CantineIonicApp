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
    )
  }

  inscrireUser(user: User) {

    return this.cantineAuth.auth.createUserWithEmailAndPassword(user.mailUser, user.password)
    .then(credential => { return this.updateUserWithCredential(credential.user) })
    .catch()
  }

  connecterUser(user: User) {

    return this.cantineAuth.auth.signInWithEmailAndPassword(user.mailUser, user.password)
    .then(data => {
    const userRef = this.cantineappdb.doc(`/Utilisateurs/${data.user.uid}`)
    userRef.ref.get().then((doc)=>{
      let connectedUser = doc.data();
      localStorage.setItem('user', JSON.stringify(connectedUser))
    })
    
    })
  }

  logOutUser(){
    this.cantineAuth.auth.signOut().then(()=>{
      localStorage.removeItem('user')
      this.router.navigate(['/'])
    });
  }

  updateUserWithCredential(user){
    if(user.id){
      user.uid = user.id;
    }
    const userRef = this.cantineappdb.doc(`/Utilisateurs/${user.uid}`)

    const data: User = {
      id : user.uid,
      mailUser : user.email || user.mailUser || null,
      password : user.password || null,
      pseudo : user.pseudo || null,
      promotion : user.promotion || null,
      credit : user.credit || null,
      isAdmin: user.admin || false,
    }
    return userRef.set(data)
  }

  resetUserPassword(email){
    console.log(typeof(email))
    return this.cantineAuth.auth.sendPasswordResetEmail(email)
    .then(()=>{console.log("Email de reset envoyé")}).catch(err=>console.log(err))
  }
  
}