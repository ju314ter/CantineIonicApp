import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-historique-commande',
  templateUrl: './historique-commande.page.html',
  styleUrls: ['./historique-commande.page.scss'],
})
export class HistoriqueCommandePage implements OnInit {

  constructor(private cantineappdb: AngularFirestore) {

   }

  achats = [];

  ngOnInit() {

    let user=JSON.parse(localStorage.getItem('user'));

    this.cantineappdb.collection("Commandes").ref.where("idUser","==", user.id).get().then((data)=>{
      data.docs.forEach((doc)=>{
        let document = [];
        if(user.id === doc.data().idUser){
          Object.entries(doc.data()).forEach(([key, value])=>{
            if(key != "idUser" && key != "price" && key != "date"){
              document.push(value);
            }
            if(key == "price"){
              document.push("prix : "+ value);
            }
            if(key == "date"){
              document.push(new Date(value.seconds));
            }
          })
        }
        this.achats.push(document);
      });
      console.log(this.achats)
    });
    
  }

}
