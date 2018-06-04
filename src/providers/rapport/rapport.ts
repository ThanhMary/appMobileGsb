import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class RapportProvider {
 
  constructor(private dbProvider: DatabaseProvider) { }
 
  public insert(rapport: Rapport) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into rapports (date, motif, bilan, medicament, nbEchantillon, praID, medID, visID)  values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [rapport.date, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.praID, rapport.medID, rapport.visID]; 
 
        return db.executeSql(sql, data)
          .catch((e) => console.error('can not insert data rapport',e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(rapport: Rapport) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update rapports set date = ?, motif = ?, bilan = ?, medicament = ?, nbEchantillon = ?, praID = ?, medID = ?, visID  where id = ?';
        let data = [rapport.date, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.praID, rapport.medID, rapport.visID, rapport.id];
        
        return db.executeSql(sql, data)
          .catch((e) => console.error('can not update rapport',e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from rapports where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from rapports where id = ?';
        let data = [id];
         return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0){
              let item = data.rows.item(0);
              let rapport = new Rapport();
              rapport.id = item.id;
              rapport.date = item.date;
              rapport.motif = item.motif;
              rapport.bilan = item.bilan;
              rapport.medicament = item.medicament;
              rapport.nbEchantillon = item.nbEchantillon;
              rapport.praID = item.praID;
              rapport.medID = item.medID;
              rapport.visID = item.visID;

              return rapport; 
            }
             return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll(date: Date = null){
      return this.dbProvider.getDB()
        .then ((db: SQLiteObject)=>{
          let sql ='select r.*, p.nom as praticien_nom, m.famID as medicament_nom from rapports r inner join praticiens p on r.praID = p.id  inner join medicaments m on r.medID = m.id inner join visiteurs v on r.visID = v.id';
          var data = [];
      //filtrer par la date
          if(date){
            sql += 'and r.date like ?'
            data.push ('%' + date + '%');
          }
        return db.executeSql(sql, data)
        .then((data: any)=>{
          if (data.rows.length > 0){
            let rapports = [];
            for (var i = 0; i<data.rows.length; i++){
            var rapport = data.rows.item(i);
              rapports.push(rapport);
            }
            return rapports;
          } else {
            return [];
          }
        }) 
        .catch ((e)=>console.error('can not get all rapports',e));
       })
     .catch ((e)=>console.error(e));
    }
}

export class Rapport {
    id: number;
    date: Date;
    motif: string;
    bilan: string;
    medicament: string;
    nbEchantillon: string;
    praID: number;
    medID: number;
    visID: Text;
   }


