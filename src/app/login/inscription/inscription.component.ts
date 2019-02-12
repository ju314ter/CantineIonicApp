import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from '../../../models/supermodels/User'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  constructor(private userService : UserService, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  inscription(inscriptionForm){
    let user: User = {
      mailUser : inscriptionForm.mailUser,
      password : inscriptionForm.password,
    };
    console.log(user)
    this.userService.inscrireUser(user)
    .catch(err=>console.log(err));
    this.presentToast("Profil créé, vous pouvez vous connecter")
  }
}
