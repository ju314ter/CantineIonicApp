import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { User } from 'src/models/supermodels/User';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionForm = {
    mailUser: '',
    password: ''
  };

  constructor(private userService : UserService,
              private router: Router,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController)
              {

              }

  ngOnInit() {

  }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      header: 'Problème de connection',
      message: message,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  connexion(connexionForm){
    
    let user: User = {
      mailUser : connexionForm.mailUser,
      password : connexionForm.password,
    };

    this.userService.connecterUser(user)
    .then(()=>{
      setTimeout(()=>{
        this.redirectToHome();
      }, 1000);
      this.presentToast("Bienvenue.")
    })
    .catch((err)=>{
      console.log(err)
      this.presentAlert(err.message);
    })
  }
    
    redirectToHome(){
      console.log("redirecting")
      return this.router.navigateByUrl('/home');
    }

}
