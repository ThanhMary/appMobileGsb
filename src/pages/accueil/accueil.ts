import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GestionRapportPage } from '../gestion-rapport/gestion-rapport';
import { GestionPraticienPage } from '../gestion-praticien/gestion-praticien';
import { GestionMedicamentPage} from '../gestion-medicament/gestion-medicament';
import { UserProvider, User } from '../../providers/user/user';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',

})
export class AccueilPage {
model: User;
  constructor(private nav: NavController,private userP: UserProvider, private navPa: NavParams) {
   this.model = new User;
      this.userP.get(this.navPa.data.id)
       .then((result: any) => {
         this.model = result;
       })
      }
   
  public logout() {
   
      this.nav.setRoot('LoginPage')
   
  }
    ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
  }

  public goToGestionRapport(){
    this.nav.push(GestionRapportPage);
  }
  public goToGestionPraticien(){
    this.nav.push(GestionPraticienPage);
  }
  public goToGestionMedicament(){
    this.nav.push(GestionMedicamentPage);
  }

}
