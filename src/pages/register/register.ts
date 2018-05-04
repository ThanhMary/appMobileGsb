// import { Component } from '@angular/core';
// import { NavController, AlertController} from 'ionic-angular';
// import { AuthService } from '../../providers/auth-service/auth-service';
// //import { LoginPage } from '../login/login';

// @Component({
//   selector: 'page-register',
//   templateUrl: 'register.html',
// })
// export class RegisterPage {
//   createSuccess = false;
//   registerCredentials = { email: '', password: '' };
 
//   constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }
 
//   public register() {
//     this.auth.register(this.registerCredentials).subscribe(success => {
//       if (success) {
//         this.createSuccess = true;
//         this.showPopup("Success", "Account created.");
//       } else {
//         this.showPopup("Error", "Problem creating account.");
//       }
//     },
//       error => {
//         this.showPopup("Error", error);
//       });
//   }
 
//   showPopup(title, text) {
//     let alert = this.alertCtrl.create({
//       title: title,
//       subTitle: text,
//       buttons: [
//         {
//           text: 'OK',
//           handler: data => {
//             if (this.createSuccess) {
//               this.nav.popToRoot();
//             }
//           }
//         }
//       ]
//     });
//     alert.present();
//   }
// }



import { Component } from '@angular/core';
import { NavParams,  NavController, AlertController, ToastController } from 'ionic-angular';
import { UserProvider, User } from '../../providers/user/user';
import { LoginPage } from '../login/login';
 

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  model: User; 

  constructor(private nav: NavController,
             private alertCtrl: AlertController,
             private navParams: NavParams,
             private toast: ToastController,
             private userPro: UserProvider) { 
           
    }

    save(){
      this.saveUser()
      .then(() => {
       this.toast.create({ message: 'user saved.', duration: 3000, position: 'botton' }).present();
       this.nav.popTo(LoginPage);
     })
     .catch(() => {
       this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
     });
 }
 private saveUser() {
      
        return this.userPro.insert(this.model);
      }
  
 }