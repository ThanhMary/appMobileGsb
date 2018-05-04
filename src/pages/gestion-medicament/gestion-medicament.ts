import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';

import { AccueilPage} from '../accueil/accueil';
import { EditMedicamentPage } from '../edit-medicament/edit-medicament';
import { MedicamentProvider, Medicament} from '../../providers/medicament/medicament';



@Component({
  selector: 'page-gestion-medicament',
  templateUrl: 'gestion-medicament.html',
})
export class GestionMedicamentPage {

  medicaments = [];
  // onlyInactives: boolean = false;
  searchText: string = null;
  
  constructor(public navCtrl: NavController, 
              private toast: ToastController,
              private medicamentProvider: MedicamentProvider) {  }

  
  ionViewDidLoad() {
    this.getAllMedicaments();
  }
  getAllMedicaments(){
    this.medicamentProvider.getAll(this.searchText)
    .then((result:any [])=>{
      this.medicaments= result;
    });
  }

  addMedicament(){
    this.navCtrl.push(EditMedicamentPage);
  }

  editMedicament(id: number){
    this.navCtrl.push(EditMedicamentPage, {id: id});
  }

  removeMedicament(medicament: Medicament){
    this.medicamentProvider.remove(medicament.id)
    .then(()=>{
      var index = this.medicaments.indexOf(medicament);
      this.medicaments.splice(index, 1);
      this.toast.create({ message: 'Medicament removed.', duration: 3000, position: 'botton' }).present();
    })
  }
  filterMedicaments(ev: any){
    this.getAllMedicaments();
  }

} 