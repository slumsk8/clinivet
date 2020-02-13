import { Consulta } from './../../app/classes/consulta/consulta';
import { DatabaseService } from './../service/database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  diaconsulta: string;
  dia: string;
  mes: string;
  ano: string;
  hora: string;

  constructor(
    private db: DatabaseService,
  ) { }

  save(consulta: Consulta) {
    if (consulta.id_cons > 0) {
      return this.update(consulta);
    } else {
      return this.insert(consulta);
    }
  }

  private insert(consulta: Consulta) {
    const sql = 'insert into consulta(dia, horario, id_pet) values(?, ?, ?)';
    const data = [consulta.dia, consulta.horario, consulta.id_pet];

    return this.db.executeSQL(sql, data);
  }

  private update(consulta: Consulta) {
    const sql = 'update consulta set dia=?, horario=?, id_pet=? where id_cons=?';
    const data = [consulta.dia, consulta.horario, consulta.id_pet, consulta.id_cons];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from consulta where id_cons=?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from consulta inner join pet on pet.id_pet=consulta.id_pet inner join tutor on tutor.id_tutor=pet.id_tutor where id_cons=?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    let consulta = new Consulta();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      
      // this.dia = item.dia.substr(8, 2);
      // this.mes = item.dia.substr(5, 2);
      // this.ano = item.dia.substr(0, 4);
      // this.diaconsulta = this.dia + '/' + this.mes + '/' + this.ano;
      // this.hora = item.horario.substr(11, 5);

      consulta.id_cons = item.id_cons;
      consulta.dia = item.dia;
      consulta.horario = item.horario;
      consulta.id_pet = item.id_pet;
      consulta.nome_pet = item.nome_pet;
      consulta.raca = item.raca;
      consulta.nascimento = item.nascimento;
      consulta.id_tutor = item.id_tutor;
      consulta.nome_tutor = item.nome_tutor;
      consulta.email = item.email;
      consulta.telefone = item.telefone;
    }
    return consulta;
  }

  async getAll() {
    const sql = 'select * from consulta inner join pet on pet.id_pet=consulta.id_pet inner join tutor on tutor.id_tutor=pet.id_tutor';
    const result = await this.db.executeSQL(sql);
    const consultas = this.fillConsultas(result.rows);
    return consultas;
  }

  async filter(text: string) {
    const sql = 'select * from consulta where dia like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const consulta = this.fillConsultas(result.rows);
    return consulta;
  }

  private fillConsultas(rows: any) {
    const consultas: Consulta[] = [];

    for (let j = 0; j < rows.length; j++) {
      const item = rows.item(j);
      const consulta: Consulta = new Consulta();
       //trabalhando string que vem do sqlite referente a dia e hora
       this.dia = item.dia.substr(8, 2);
       this.mes = item.dia.substr(5, 2);
       this.ano = item.dia.substr(0, 4);
       this.diaconsulta = this.dia + '/' + this.mes + '/' + this.ano;
       this.hora = item.horario.substr(11, 5);
 
       consulta.id_cons = item.id_cons;
       consulta.dia = this.diaconsulta;
       consulta.horario = this.hora;
       consulta.id_pet = item.id_pet;
       consulta.nome_pet = item.nome_pet;
       consulta.raca = item.raca;
       consulta.nascimento = item.nascimento;
       consulta.id_tutor = item.id_tutor;
       consulta.nome_tutor = item.nome_tutor;
       consulta.email = item.email;
       consulta.telefone = item.telefone;
      consultas.push(consulta);
    }
    return consultas;
  }

}