import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

 
@Injectable()
  export class VisiteurProvider {
 
    constructor(private dbProvider: DatabaseProvider) { }
   
    public insert(visiteur: Visiteur) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'insert into visiteur (id, nom, prenom, login, mdp) values (?, ?, ?, ?, ?)';
          let data = [visiteur.id, visiteur.nom, visiteur.prenom, visiteur.login, visiteur.mdp];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error('can not insert data visiteur',e));
        })
        .catch((e) => console.error(e));
    }
   
    public update(visiteur: Visiteur) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update visiteur set id=?, nom=?, prenom=?, login=?, mdp=? where id=?';
          let data = [visiteur.nom, visiteur.prenom, visiteur.login, visiteur.mdp, visiteur.id];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
    public remove(id: number) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'delete from visiteur where id = ?';
          let data = [id];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
   
    public get(id: number) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'select * from utilisateur where id = ?';
          let data = [id];
           return db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length > 0) {
                let item = data.rows.item(0);
                let visiteur = new Visiteur();
                visiteur.id = item.id;
                visiteur.nom = item.nom;
                visiteur.prenom = item.prenom;
                visiteur.login = item.login;
                visiteur.mdp = item.mdp;
                  
                return visiteur;
              }
               return null;
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
  }


  export class Visiteur {
    id: string;
    nom: string;
    prenom: string;
    login: string;
    mdp: string;
  }
  