import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class RapportProvider {
 
  constructor(private dbProvider: DatabaseProvider) { }
 
  public insert(rapport: Rapport) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into rapports(date, motif, bilan, medicament, nbEchantillon, active, praID, medID)  values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [rapport.date, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.active ? 1 : 0, rapport.praID, rapport.medID]; 
 
        return db.executeSql(sql, data)
          .catch((e) => console.error('can not insert data rapport',e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(rapport: Rapport) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update rapports set date = ?, motif = ?, bilan = ?, medicament = ?, nbEchantillon = ?, active = ?, praID = ?, medID = ? where id = ?';
        let data = [rapport.date, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.active? 1 : 0, rapport.praID, rapport.medID ];
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
              rapport.active = item.active;
              rapport.praID = item.praID;
              rapport.medID = item.medID;

              return rapport;
            }
             return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll(active: boolean, date: Date = null){
      return this.dbProvider.getDB()
        .then ((db: SQLiteObject)=>{
          let sql ='select r.*, p.nom as praticien_nom, m.nom as medicament_nom from rapports r inner join praticiens p on r.praID = p.id and inner join medicaments m on r.medID = m.id where r.active=?';
          var data: any[] = [active ? 1 : 0];
      //filtrer par la date
          if(date){
            sql += 'and r.date like ?'
            data.push ('%' + date + '%');
          }
        return db.executeSql(sql, data)
        .then((data: any)=>{
          if (data.rows.length > 0){
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
}

export class Rapport {
    id: number;
    date: Date;
    motif: string;
    bilan: string;
    medicament: string;
    nbEchantillon: string;
    active: boolean;
    praID: number;
    medID: number;
   }


