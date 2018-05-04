import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import {LOCALE_ID} from '@angular/core';
import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';

import { EditPraticienPage } from '../pages/edit-praticien/edit-praticien';
import { EditMedicamentPage } from '../pages/edit-medicament/edit-medicament';
import { EditRapportPage } from '../pages/edit-rapport/edit-rapport';

import { GestionPraticienPage } from '../pages/gestion-praticien/gestion-praticien';
import { GestionRapportPage } from '../pages/gestion-rapport/gestion-rapport';
import { GestionMedicamentPage } from '../pages/gestion-medicament/gestion-medicament';
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { PraticienProvider } from '../providers/praticien/praticien';
import { MedicamentProvider } from '../providers/medicament/medicament';
import { RapportProvider } from '../providers/rapport/rapport';
import { CategoryProvider } from '../providers/category/category';
import { FamilleProvider } from '../providers/famille/famille';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthService } from '../providers/auth-service/auth-service';
//import { FingerprintAIO} from '@ionic-native/fingerprint-aio';
 
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    AccueilPage,
    EditPraticienPage,
    EditMedicamentPage,
    EditRapportPage,
    GestionPraticienPage,
    GestionRapportPage,
    GestionMedicamentPage
  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    AccueilPage,

    EditPraticienPage,
    EditMedicamentPage,
    EditRapportPage,

    GestionPraticienPage,
    GestionRapportPage,
    GestionMedicamentPage

      ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    PraticienProvider,
    MedicamentProvider,
    RapportProvider,
    CategoryProvider,
    FamilleProvider,
    UserProvider
   // AuthService
    //FingerprintAIO
    
  ]
})
export class AppModule {
 }