import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: SQLiteObject;
  databaseName: string = 'clinicavet.db';
  constructor(
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter
  ) { }

  async openDatabase(){
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
      await this.createDatabase();
    } catch (error) {
        console.error('Ocorreu um erro ao criar o banco de dados', error);
    }
  }

  async createDatabase(){
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  getCreateTable(){
    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS tutor(id_tutor INTEGER PRIMARY KEY AUTOINCREMENT, nome_tutor VARCHAR(100), email VARCHAR(100), telefone VARCHAR(50));');
    sqls.push('CREATE TABLE IF NOT EXISTS pet(id_pet INTEGER PRIMARY KEY AUTOINCREMENT, nome_pet VARCHAR(100), raca VARCHAR(100), nascimento VARCHAR(15),  id_tutor INTEGER, CONSTRAINT fk_tutor FOREIGN KEY(id_tutor) REFERENCES tutor);');
    sqls.push('CREATE TABLE IF NOT EXISTS consulta(id_cons INTEGER PRIMARY KEY AUTOINCREMENT, dia VARCHAR(10), horario VARCHAR(5), id_pet INTEGER, CONSTRAINT fk_pet FOREIGN Key(id_pet) REFERENCES pet);');
      
    return sqls.join('\n');
  }  

  executeSQL(sql: string, params?: any[]){
    return this.db.executeSql(sql, params);
  }
}