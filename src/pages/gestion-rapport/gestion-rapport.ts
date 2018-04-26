import { Component } from '@angular/core';
import { NavController, ToastController, DateTime } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { RapportProvider, Rapport } from '../../providers/rapport/rapport';
import { EditRapportPage } from '../../pages/edit-rapport/edit-rapport';

@Component({
  selector: 'page-gestion-rapport',
  templateUrl: 'gestion-rapport.html',
})
export class GestionRapportPage {

  rapports: any[] = [];
  onlyInactives: boolean = false;
  searchDate: Date = null;
 
  constructor(public navCtrl: NavController, 
    private toast: ToastController, 
    private rapportProvider: RapportProvider) { }
 
  ionViewDidEnter() {
    this.getAllRapports();
  }
 
public getAllRapports() {
    this.rapportProvider.getAllR(!this.onlyInactives, this.searchDate)
      .then((result: any[]) => {
        this.rapports = result;
      });
  }
addRapport(){
    this.navCtrl.push(EditRapportPage);
  }
 
editRapport(id: number) {
    this.navCtrl.push(EditRapportPage,{id: id});
  }
 
removeRapport(rapport: Rapport) {
    this.rapportProvider.removeR(rapport.id)
      .then(() => {
       var index = this.rapports.indexOf(rapport);
        this.rapports.splice(index, 1);
        this.toast.create({ message: 'Rapport removed.', duration: 3000, position: 'botton' }).present();
      })
  }
 
public filterRapports(ev: any) {
    this.getAllRapports();
  }
 
}