//import { HttpClient } from '@angular/common/http';
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
    let sql = 'insert into medicaments (nom, composition, effets, posologie, famID) values (?, ?, ?, ?, ?)';
    let data = [medicament.nom, medicament.composition, medicament.effets, medicament.posologie, medicament.famID];

    return db.executeSql(sql, data)
      .catch((e) => console.error('can not insert data medicaments',e));
  })
  .catch((e) => console.error(e));
}

//function update data
public update(medicament: Medicament){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'update medicaments set nom = ?, composition = ?, effets = ?, posologie = ?, famID = ? where id = ?';
    let data = [medicament.nom, medicament.composition, medicament.effets, medicament.posologie, medicament.famID, medicament.id];
    return db.executeSql(sql, data)
    .catch ((e)=>console.error());
  })
  .catch ((e)=>console.error());
}

// function delete data 

public remove(id: number){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject)=>{ 
    let sql = 'delete from medicaments where id = ?';
    let data = [id];
      return db.executeSql(sql, data)
    .catch ((e)=>console.error());
  })
  .catch ((e)=>console.error());
}

// function get data
public get(id: number){
  return this.dbProvider.getDB()
  .then((db:SQLiteObject)=>{
    let sql ='SELECT * FROM medicaments WHERE id = ?';
    let data = [id];

    return db.executeSql(sql, data)
    .then ((data: any)=>{
      if (data.rows.length > 0){
        let item = data.rows.item(0);
        let medicament = new Medicament();
        medicament.id = item.id;
        medicament.nom = item.nom;
        medicament.composition= item.composition;
        medicament.effets= item.effets;
        medicament.posologie= item.posologie;
        // medicament.active= item.active;
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

public getAll(nom:string = null){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'select m.*, f.name as famille_name FROM medicaments m inner join familles f on m.famID = f.id';
    var data =[];

    if (nom){
      sql += 'and m.nom like ?'
      data.push ('%'+ nom +'%');
    }
    return db.executeSql(sql, data)
    .then((data: any)=>{
      if (data.rows.length >0) {
        let medicaments = [];
        for (var i=0; i< data.rows.length; i++){
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
  nom: string;
  composition: string;
  effets: string;
  posologie: string;
  famID: number;
}
 
