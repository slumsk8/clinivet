import { Tutor } from './../../../classes/tutor/tutor';
import { Pet } from './../../../classes/pet/pet';
import { ToastController, AlertController, NumericValueAccessor } from '@ionic/angular';
import { PetService } from './../../../../core/pet/pet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.page.html',
  styleUrls: ['./pets-list.page.scss'],
})
export class PetsListPage implements OnInit {
  title = 'Pets';
  pets: Pet[] = [];
  

  constructor(
    private petservice: PetService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadPets();        
  }


  async loadPets(){
    this.pets =  await this.petservice.getAll(); 
  }

  doSearchClear(){
    this.loadPets();
  }

  async doSearchBarChange($event: any){
    const value = $event.target.value;
    if(value && value.length >= 2){
      this.pets = await this.petservice.filter(value);
    }
  }

  async delete(pet: Pet){
    
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o pet: ${pet.nome_pet}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(pet);
          }
        }
      ]
    });
    alert.present();
  }

  async executeDelete(pet: Pet){
    try {
      // removendo do banco de dados
      console.log(pet.id_pet);
      await this.petservice.delete(pet.id_pet);

      //removendo do array
      const index = this.pets.indexOf(pet);
      this.pets.splice(index,1);
      
      // console.log(index);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Consulta excluída com sucesso!',
        color: 'success',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Erro ao excluir a consulta!',
        color: 'danger',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    }
  }

}