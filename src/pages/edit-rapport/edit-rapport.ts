
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PraticienProvider, Praticien } from '../../providers/praticien/praticien';
import { RapportProvider, Rapport } from '../../providers/rapport/rapport';
import { GestionRapportPage } from '../gestion-rapport/gestion-rapport';

@Component({
  selector: 'page-edit-rapport',
  templateUrl: 'edit-rapport.html',
})
export class EditRapportPage {
model: Rapport; 
praticiens= [];
onlyInactives: string;
searchText: string;
  
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private rapportProvider: RapportProvider,
    private praticienProvider: PraticienProvider
  ) {
 
    this.model = new Rapport();
     if (this.navParams.data.id) {
      this.rapportProvider.getR(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
 
  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
      this.praticienProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.praticiens = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur de get des praticiens.', duration: 3000, position: 'botton' }).present();
      });

    }
 
  save() {
    this.saverapport()
      .then(() => {
        this.toast.create({ message: 'rapport saved.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.popTo(GestionRapportPage);
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private saverapport() {
    if (this.model.id) {
      return this.rapportProvider.updateR(this.model);
    } else {
      return this.rapportProvider.insertR(this.model);
    }
  }
 
}

