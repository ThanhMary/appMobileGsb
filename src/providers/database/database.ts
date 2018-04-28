import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
@Injectable()
export class DatabaseProvider {
 
  constructor(private sqlite: SQLite) { }
   
  public getDB() {
    return this.sqlite.create({
      name: 'MobileAppGsb.db',
      location: 'default'
    });
  }
 
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        this.createTables(db);
       
        this.insertDefaultItems(db);
        this.insertDefaultItemsFam(db);
      })
      .catch(e => console.log(e));
  }
 
  /**
   * 
   * @param db
   */
  private createTables(db: SQLiteObject) {
   
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS praticiens (id integer primary key AUTOINCREMENT NOT NULL, nom TEXT, prenom REAL, adresse TEXT, departement TEXT, tel TEXT, specialitePlus TEXT, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))'],
      ['CREATE TABLE IF NOT EXISTS familles(id integer primary key NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS medicaments (id integer primary key AUTOINCREMENT NOT NULL, nom TEXT, composition TEXT, effets TEXT, posologie TEXT, active integer, famID integer, FOREIGN KEY(famID) REFERENCES familles(id))'],
      ['CREATE TABLE IF NOT EXISTS rapports (id integer primary key AUTOINCREMENT NOT NULL, date DATE, motif TEXT, bilan TEXT, medicament TEXT, nbEchantillon TEXT, active integer, praID integer, medID integer, FOREIGN KEY(praID) REFERENCES praticiens(id), FOREIGN KEY(medID) REFERENCES medicaments(id))'],
      ['CREATE TABLE IF NOT EXISTS users (id Text, nom Text, prenom Text, login Text, password Text, adresse Text, codePostale Text, dateEmbauche Text)']
    ])
      .then(() => console.log('Tables créées'))
      .catch(e => console.error('Erreur lors de la crétation des tables', e));
  }
 
  /**
 
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', {})
    .then((data: any) => {
     
      if (data.rows.item(0).qtd===0) {
       
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Medecin']],
          ['insert into categories (name) values (?)', ['Pharmacien']],
          ['insert into categories (name) values (?)', ['Chef de Clinique']],
          ['insert into categories (name) values (?)', ['Autre']]
        ])
          .then(() => console.log('Data est inseré'))
          .catch(e => console.error('Erreur', e));
 
      }
    })
    .catch(e => console.error('Erreur de consultation de la qtd de categories', e));
  }

private insertDefaultItemsFam(db: SQLiteObject) {
  db.executeSql('select COUNT(id) as qtd from familles', {})
  .then((data: any) => {

    if (data.rows.item(0).qtd === 0) {
    
      db.sqlBatch([
        ['insert into familles (name) values (?)', ['Antalgiques antipyréques en association']],
        ['insert into familles (name) values (?)', ['Antivertigineux antihistaminique']],
        ['insert into familles (name) values (?)', ['Antibiotique antituberculeux']],
        ['insert into familles (name) values (?)', ['Antibiotique antiacnénique local']],
        ['insert into familles (name) values (?)', ['Antibiotique de la famille des béta-lactamines']],
        ['insert into familles (name) values (?)', ['Antibiotique de la famille des cyclines']],
        ['insert into familles (name) values (?)', ['Antibiotique de la famille des macrolides']],
        ['insert into familles (name) values (?)', ['Antihistaminique H1 local']],
        ['insert into familles (name) values (?)', ['Antidépresseur imipraminique -tricyclique']],
        ['insert into familles (name) values (?)', ['Antidépresseur inhibiteur sélectif de la recapture de la sétonine']],
        ['insert into familles (name) values (?)', ['Antibiotique local -ORL-']],
        ['insert into familles (name) values (?)', ['Antidépresseur IMAO non sélectif']],
        ['insert into familles (name) values (?)', ['Antipsychotique normothymique']],
        ['insert into familles (name) values (?)', ['Antibiotique urinaire minute']],
        ['insert into familles (name) values (?)', ['Corticoide, antibiotique et antifongique à usage local']],
        ['insert into familles (name) values (?)', ['Hypnotique antihistaminique']],
        ['insert into familles (name) values (?)', ['Psychostimulant antiasthésique']],
        ['insert into familles (name) values (?)', ['Autre']]
            
      ])
        .then(() => console.log('Data par defaut inserre'))
        .catch(e => console.error('Erreur can not inserre defaut item famille', e));
     }
  })
  .catch(e => console.error('Erreur de consulter la qtd de familles', e));
}

}














