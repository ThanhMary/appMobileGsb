import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from '../database/database';
//import { PraticienProvider, Praticien} from '../praticien/praticien';

@Injectable()
export class RapportProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
// créer des fonctions de CRUD

public insertR(rapport: Rapport){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject) =>{
    let sql='insert into rapports (date, motif, bilan, medicament, nbEchantillon, active, praID) values (?, ?, ?, ?, ?, ?, ?)';
    let data= [rapport.date, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon,rapport.active ? 1 : 0, rapport.praID];
     return db.executeSql(sql, data)
    .catch((e)=>console.error('erreur can not insert',e));
    })
  .catch((e) => console.error('erreur can not getDB',e));
}

//update data
public updateR(rapport: Rapport){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'update rapports set date=?, motif=?, bilan=?, medicament=?, nbEchantillon=?, active=?, praID=? where id=?';
    let data = [rapport.date, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.active ? 1 : 0, rapport.praID];
    
    return db.executeSql(sql, data)
    .catch ((e)=>console.error('error get update',e));
  })
  .catch ((e)=>console.error('error getDB',e));
}

//delete data 
public removeR(id: number){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject)=>{ 
    let sql = 'delete from rapports where id = ?';
    let data = [id];

   return db.executeSql(sql, data)
    .catch ((e)=>console.error(e));
  })
  .catch ((e)=>console.error(e));
}

//  get data
public getR(id: number){
  return this.dbProvider.getDB()
  .then((db:SQLiteObject)=>{
    let sql = 'select * from rapports where id=?';
    let data = [id];
  return db.executeSql(sql, data)
  .then ((data: any)=>{
      if (data.rows.length > 0){
        let item = data.rows.item(0);
        let rapport = new Rapport();
        rapport.id = item.id;
        rapport.date = item.date;
        rapport.motif = item.motif;
        rapport.bilan = item.bilan;
        rapport.medicament = item.medicament;
        rapport.nbEchantillon = item.nbEchantillon;
        rapport.active = rapport.active;
        rapport.praID = item.praID;

        return rapport;
      }
        return null;
    })
  .catch ((e)=>console.error(e));
  })
.catch ((e)=>console.error(e));
}

// function det all data rapport

public getAllR(active: boolean, date: Date = null){
  return this.dbProvider.getDB()
    .then ((db: SQLiteObject)=>{
      let sql = 'select r.*, p.nom as praticien_nom from rapports r inner join praticiens p on r.praID = p.id where r.active=?';
      var data: any[] = [active ? 1 : 0];
  //filtrer par la date
      if(date){
        sql += 'and r.date like ?'
        data.push ('%' + date + '%');
      }

    return db.executeSql(sql, data)
    .then((data: any)=>{
      if (data.rows.length = 0){
        let rapports: any[]= [];
        for (var i = 0; i < data.rows.length; i++){
        var rapport = data.rows.item(i);
          rapports.push(rapport);
        }
        return rapports;
      } else {
        return [];
      }
    }) 
    .catch ((e)=>console.error(e));
   })
 .catch ((e)=>console.error(e));
 }
}// fermeture de classe RapportProvider
export class Rapport {
  id: number;
  date: Date;
  motif: string;
  bilan: string;
  medicament: string;
  nbEchantillon: number;
  active: boolean;
  praID: number;
 }
