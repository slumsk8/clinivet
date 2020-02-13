import { DatabaseService } from './../service/database.service';
import { Pet } from './../../app/classes/pet/pet';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {


  dataatual = new Date();
  dia: number;
  mes: number;
  ano: number;
  nascimento: string;
  anoatual: number;
  idade: number = 0;

  constructor(
    private db: DatabaseService
  ) { }

  save(pet: Pet) {
    if (pet.id_pet > 0) {
      return this.update(pet);
    } else {
      return this.insert(pet);
    }
  }

  private insert(pet: Pet) {
    const sql = 'insert into pet(nome_pet, raca, nascimento, id_tutor) values(?, ?, ?, ?)';
    const data = [pet.nome_pet, pet.raca, pet.nascimento, pet.id_tutor];

    return this.db.executeSQL(sql, data);
  }

  private update(pet: Pet) {
    const sql = 'update pet set nome_pet=?, raca=?, nascimento=?, id_tutor=? where id_pet=?';
    const data = [pet.nome_pet, pet.raca, pet.nascimento, pet.id_tutor, pet.id_pet];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from pet where id_pet=?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from pet inner join tutor on tutor.id_tutor=pet.id_tutor where id_pet=?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    let pet: Pet = new Pet();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      pet.id_pet = item.id_pet;
      pet.nome_pet = item.nome_pet;
      pet.raca = item.raca;
      pet.nascimento = item.nascimento;
      pet.id_tutor = item.id_tutor;
      pet.nome_tutor = item.nome_tutor;
      pet.email = item.email;
      pet.telefone = item.telefone;
    }    
    return pet;
  }

  async getAll() {
    const sql = 'select * from pet inner join tutor on tutor.id_tutor=pet.id_tutor';
    const result = await this.db.executeSQL(sql);
    const pets = this.fillPets(result.rows);
    return pets;
  }

  async filter(text: string) {
    const sql = 'select * from pet where nome_pet like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const pets = this.fillPets(result.rows);
    return pets;
  }

  private fillPets(rows: any) {
    const pets: Pet[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const pet: Pet = new Pet();
       //Trabalhando as string da data de nascimento que vem do sqlite
       this.anoatual = this.dataatual.getFullYear();
      this.dia = parseInt(item.nascimento.substr(8,2));
      this.mes = parseInt(item.nascimento.substr(5,2));
      this.ano = parseInt(item.nascimento.substr(0,4));
      this.nascimento = this.dia + '/' + this.mes + '/' + this.ano;     
      // console.log(this.nascimento);
      this.idade = this.anoatual - this.ano;
      // console.log(this.idade);
      if(this.dataatual.getMonth() < this.mes || this.dataatual.getMonth() == this.mes && this.dataatual.getDate() < this.dia){
         this.idade--;
      }
      pet.id_pet = item.id_pet;
      pet.nome_pet = item.nome_pet;
      pet.raca = item.raca;
      pet.nascimento = this.nascimento;
      pet.idade = this.idade.toString();
      pet.id_tutor = item.id_tutor;
      pet.nome_tutor = item.nome_tutor;
      pet.email = item.email;
      pet.telefone = item.telefone;
      pets.push(pet);
    }
    return pets;
  }
}