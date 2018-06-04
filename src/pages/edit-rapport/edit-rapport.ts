import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PraticienProvider, Praticien } from '../../providers/praticien/praticien';
import { RapportProvider, Rapport } from '../../providers/rapport/rapport';
import { GestionRapportPage } from '../gestion-rapport/gestion-rapport';
import { MedicamentProvider } from '../../providers/medicament/medicament';

@Component({
  selector: 'page-edit-rapport',
  templateUrl: 'edit-rapport.html',
})
export class EditRapportPage {
model: Rapport; 
praticiens= [];
medicaments= [];
onlyInactives: string;
searchText: string;
  
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private rapportProvider: RapportProvider,
    private praticienProvider: PraticienProvider,
    private medicamentProvider: MedicamentProvider) {
 
    this.model = new Rapport();
     if (this.navParams.data.id) {
      this.rapportProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
 
 
  // ionViewDidLoad() {
  //     this.praticienProvider.getAll(!this.onlyInactives, this.searchText)
  //     .then((result: any[]) => {
  //       this.praticiens = result;
  //     })
           
  //     this.medicamentProvider.getAll(this.searchText)
  //     .then((result: any[]) => {
  //       this.medicaments = result;
  //     })

  //   }
 
  save() {
    this.saveRapport()
      .then(() => {
        this.toast.create({ message: 'rapport saved.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.popTo(GestionRapportPage);
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private saveRapport() {
    if (this.model.id) {
      return this.rapportProvider.update(this.model);
    } else {
      return this.rapportProvider.insert(this.model);
    }
  }
private export(){
  


}

 }

