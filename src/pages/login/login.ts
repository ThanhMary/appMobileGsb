// import { Component } from '@angular/core';
// import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
// import { AuthService } from '../../providers/auth-service/auth-service';
// import { AccueilPage } from '../accueil/accueil'; 
// import { RegisterPage } from '../register/register';

// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {
//   loading: Loading;
//   registerCredentials = { email: '', password: '' };
 
//   constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
//   public createAccount() {
//     this.nav.push(RegisterPage);
//   }
 
//   public login() {
//     // this.showLoading();
//     this.auth.login(this.registerCredentials).subscribe(allowed => {
//       if (allowed) {        
//         this.nav.setRoot(AccueilPage);
//       }
//     }

  //     } else {
  //       this.showError("Access Denied");
  //     }
  //   },
  //     error => {
  //       this.showError(error);
  //     });
  // }
 
//   showLoading() {
//     this.loading = this.loadingCtrl.create({
//       content: 'Please wait...',
//       dismissOnPageChange: true
//     });
//     this.loading.present();
//   }
 
//   showError(text) {
//     this.loading.dismiss();
 
//     let alert = this.alertCtrl.create({
//       title: 'Failed',
//       subTitle: text,
//       buttons: ['OK']
//     });
//     alert.present();
//   }
// }




import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { UserProvider, User } from '../../providers/user/user';
import { RegisterPage } from '../register/register';
import { AccueilPage} from '../accueil/accueil';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
model: User;
loginCurrent: string;
mdpCurrent: string;

  constructor(private nav: NavController,
              private navP: NavParams, 
              private userPro: UserProvider,
              private toast: ToastController) {

                this.model = new User();
                if (this.navP.data.id) {
                 this.userPro.get(this.navP.data.id)
                   .then((result: any) => {
                     this.model = result;
                   })
               }
             }
  
  ionViewDidLoad(){
    this.model;
    }
  public login() {
  
    if ((this.loginCurrent = null) || (this.mdpCurrent = null)){
       this.toast.create({ message: 'veuillez remplir les champs vides', duration: 3000, position: 'center' }).present();
    }
    else if ((this.loginCurrent != this.model.login) || (this.mdpCurrent != this.model.mdp)){
     this.toast.create({ message: 'erreur saisi', duration: 3000, position: 'center' }).present();
    } 
    else if (this.loginCurrent === this.model.login && this.mdpCurrent=== this.model.mdp){
      
      this.nav.push (AccueilPage);
    }

    }
    public createAccount() {
    this.nav.push(RegisterPage);
  }


}





// import { Component } from '@angular/core';
// import { Platform, NavController } from 'ionic-angular';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
// import { AccueilPage } from '../accueil/accueil'; 
// @Component({
//     selector: 'page-login',
//     templateUrl: 'login.html',
//   })
//   export class LoginPage {
//     constructor (private platform: Platform,
//       private nav: NavController,
//      private fingerprint: FingerprintAIO){ }
     
// login(){
//   this.fingerprint.show({
//     clientId: 'Fingeprint-demo',
//     clientSecret: 'password'
//   })
//   .then(result =>{
//     this.nav.setRoot(AccueilPage);
//   })
//   .catch(err =>{
//     console.log('error', err);
//   })

//   }
// }



// 