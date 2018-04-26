import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
 
@Injectable()
export class FamilleProvider {
 
  constructor(private dbProvider: DatabaseProvider) { }
 
  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from familles', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let familles: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var famille = data.rows.item(i);
              familles.push(famille);
            }
            return familles;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}