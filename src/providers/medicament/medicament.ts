import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from '../database/database';

@Injectable()
export class MedicamentProvider {

  constructor(private dbProvider: DatabaseProvider) { 
  
   }


// créer des fonctions de CRUD pour la gestion des medicaments

//function add data
public insert(medicament: Medicament){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject) =>{
    let sql = 'INSERT INTO medicaments (nomCommercial, composition, effets, contreIndication, active, famID) VALUES (?, ?, ?, ?, ?, ?)';
    let data = [medicament.nomCommercial,medicament.composition, medicament.effets, medicament.contreIndication, medicament.active ? 1 : 0, medicament.famID, ];
    return db.executeSql (sql, data) 
    .catch((e)=>console.error(e));
    })
  .catch((e) => console.error(e));
}

//function update data

public update(medicament: Medicament){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'update medicaments set nomCommercial=?, composition=?, effets=?, contreIndication=?, famID=?, active=? where id=?';
    let data = [medicament.nomCommercial, medicament.composition, medicament.effets, medicament.contreIndication, medicament.famID, medicament.active ? 1 : 0, medicament.id];
    return db.executeSql(sql, data)
    .catch ((e)=>console.error());
  })
  .catch ((e)=>console.error());
}

// function delete data 

public remove(id: number){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject)=>{ 
    let sql = 'delete from medicaments where id=?';
    let data = [id];
      return db.executeSql(sql, data)
    .catch ((e)=>console.error());
  })
  .catch ((e)=>console.error());
}

// function get data
public get(id){
  return this.dbProvider.getDB()
  .then((db:SQLiteObject)=>{
    let sql =' SELECT * FROM medicaments WHERE id=?';
    let data = [id];

    return db.executeSql(sql, data)
    .then ((data: any)=>{
      if (data.rowx.lenght>0){
        let item = data.rows.item(0);
        let medicament = new Medicament();
        medicament.id = item.id;
        medicament.nomCommercial = item.nomCommercial;
        medicament.effets= item.effets;
        medicament.composition= item.composition;
        medicament.contreIndication= item.contreIndication;
        medicament.famID = item.famID;
      
        return medicament;
      }
    return null;
    })
  .catch ((e)=>console.error());
  })
.catch ((e)=>console.error());
}

// function get all data 

public getAll(active: boolean, nomCommercial: string = null){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'SELECT m.*, f.name as famille_name FROM medicaments m inner join familles f on m.famID=f.id where m.active = ?';
    var data: any[] = [active ? 1 : 0];

    if (nomCommercial){
      sql += 'and m.nomCommercial like?'
      data.push ('%'+ nomCommercial +'%');
    }
    return db.executeSql(sql, data)
    .then((data: any)=>{
      if (data.rows.lenght = 0){
        let medicaments: any[]= [];
        for (var i=0; i< data.rows.lenght; i++){
        var medicament = data.rows.item(i);
        medicaments.push(medicament);
        }
        return medicaments;
      }else {
        return [];
      }
    }) 
    .catch ((e)=>console.error());
  })
.catch ((e)=>console.error());
}

}
export class Medicament {
  id: number;
  nomCommercial: string;
  composition: string;
  effets: string;
  contreIndication: string;
  famID: number;
  active: boolean;
  
}
 
