import { Tutor } from './../../app/classes/tutor/tutor';
import { DatabaseService } from './../service/database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TutorService {  

  constructor(
    private db: DatabaseService
  ) { }

  save(tutor: Tutor){
    if(tutor.id_tutor > 0){
      return this.update(tutor);
    }else {
      return this.insert(tutor);
    }
  }

  private insert(tutor: Tutor){
    const sql = 'insert into tutor(nome_tutor, email, telefone) values(?,?,?)';
    const data = [tutor.nome_tutor, tutor.email, tutor.telefone];

    return this.db.executeSQL(sql, data);
  }

  private update(tutor: Tutor){
    const sql = 'update tutor set nome_tutor=?, email=?, telefone=? where id_tutor=?';
    const data = [tutor.nome_tutor, tutor.email, tutor.telefone, tutor.id_tutor];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number){
    const sql = 'delete from tutor where id_tutor=?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  //Pegando somente um tutor
  async getById(id: number){
    const sql = 'select * from tutor where id_tutor=?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;    
    const tutor: Tutor = new Tutor();    
    if(rows && rows.length > 0){
      const item = rows.item(0);
      tutor.id_tutor = item.id;
      tutor.nome_tutor = item.nome_tutor;
      tutor.email = item.email;          
      tutor.telefone = item.telefone;
    }
    return tutor;
  }

  //Pegando todos os tutores
  async getAll(){
    const sql = 'select * from tutor';
    const result = await this.db.executeSQL(sql);
    const tutores = this.fillTutores(result.rows);
    console.log(tutores);
    return tutores;
  }

  async filter(text: string){
    const sql = 'select * from tutor where nome_tutor like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const tutores = this.fillTutores(result.rows);
    return tutores;
  }

  private fillTutores(rows: any){
    const tutores: Tutor[] = [];

    for(let i = 0; i < rows.length; i++){
      const item = rows.item(i);  
      const tutor: Tutor = new Tutor();     
      tutor.id_tutor = item.id_tutor;
      tutor.nome_tutor = item.nome_tutor;
      tutor.email = item.email;
      tutor.telefone = item.telefone;
      tutores.push(tutor);
    }
    return tutores;
  }

}