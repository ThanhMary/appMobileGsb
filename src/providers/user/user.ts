import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

 
@Injectable()
  export class UserProvider {
 
    constructor(private dbProvider: DatabaseProvider) { }
   
    public insert(user: User) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'insert into users (nom, prenom, login, mdp) values (?, ?, ?, ?)';
          let data = [user.nom, user.prenom, user.login, user.mdp];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error('can not insert data user',e));
        })
        .catch((e) => console.error(e));
    }
   
    public update(user: User) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'update users set nom=?, prenom=?, login=?, mdp=? where id=?';
          let data = [user.nom, user.prenom, user.login, user.mdp];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
    public remove(id: number) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'delete from users where id = ?';
          let data = [id];
   
          return db.executeSql(sql, data)
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
   
    public get(id: number) {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'select * from users where id = ?';
          let data = [id];
   
          return db.executeSql(sql, data)
            .then((data: any) => {
              if (data.rows.length > 0) {
                let item = data.rows.item(0);
                let user = new User();
                user.id = item.id;
                user.nom = item.nom;
                user.prenom = item.prenom;
                user.login = item.login;
                user.mdp = item.mdp;
                  
                return user;
              }
               return null;
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }
  }


  export class User {
    id: number;
    nom: string;
    prenom: string;
    login: string;
    mdp: string;
   
  }
  