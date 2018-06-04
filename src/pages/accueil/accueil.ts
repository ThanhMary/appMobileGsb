import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GestionRapportPage } from '../gestion-rapport/gestion-rapport';
import { GestionPraticienPage } from '../gestion-praticien/gestion-praticien';
import { GestionMedicamentPage} from '../gestion-medicament/gestion-medicament';
import { VisiteurProvider, Visiteur } from '../../providers/visiteur/visiteur';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',

})
export class AccueilPage {
model: Visiteur;
  constructor(private nav: NavController,private visiteurP: VisiteurProvider, private navPa: NavParams) {
   this.model = new Visiteur;
      this.visiteurP.get(this.navPa.data.id)
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
