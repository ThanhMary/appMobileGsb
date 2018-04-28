import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import {MedicamentProvider, Medicament} from '../../providers/medicament/medicament';
import { GestionMedicamentPage } from '../gestion-medicament/gestion-medicament';
import { FamilleProvider} from '../../providers/famille/famille';


@Component({
  selector: 'page-edit-medicament',
  templateUrl: 'edit-medicament.html',
})
export class EditMedicamentPage {
  model: Medicament;
  familles=[];
  
    constructor(public navCtrl: NavController, 
               public navParams: NavParams, 
               public toast:ToastController, 
               private medicamentProvider: MedicamentProvider, 
               private familleProvider: FamilleProvider
             ) {
   
   this.model = new Medicament();
    if(this.navParams.data.id){
      this.medicamentProvider.get(this.navParams.data.id)
         .then((result:any)=>{
           this.model = result;
        })
      }
    }
  

  ionViewDidLoad() {
      this.familleProvider.getAll()
      .then((result: any[]) => {
        this.familles = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur de get des familles de médicament.', duration: 3000, position: 'botton' }).present();
      });

    }
 
   save(){
     this.saveMedicament()
     .then(() => {
      this.toast.create({ message: 'Medicament saved.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.popTo(GestionMedicamentPage);
    })
    .catch(() => {
      this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
    });
}
private saveMedicament() {
     if(this.model.id){
       return this.medicamentProvider.update(this.model);
     }else{
       return this.medicamentProvider.insert(this.model);
     }
   }

}