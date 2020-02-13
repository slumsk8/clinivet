import { Pet } from './../../../classes/pet/pet';
import { PetService } from './../../../../core/pet/pet.service';
import { TutorService } from './../../../../core/tutor/tutor.service';
import { Consulta } from './../../../classes/consulta/consulta';
import { ConsultaService } from './../../../../core/consulta/consulta.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.page.html',
  styleUrls: ['./consulta-list.page.scss'],
})
export class ConsultaListPage implements OnInit {
  title = 'Consultas';
  consultas: Consulta[] = [];    
  pets: Pet[] = [];

  
  constructor(
    private consultaservice: ConsultaService,
    private tutorservice: TutorService,
    private petservice: PetService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
   

  ionViewWillEnter(){
    this.loadConsultas();
  }

  async laodPets(){
    this.pets = await this.petservice.getAll();    
  }
  
  async loadConsultas(){
    this.consultas = await this.consultaservice.getAll();
  }

  doSearchClear(){
    this.loadConsultas();
  }

  async doSearchBarChange($event: any){
    const value = $event.target.value;
    if(value && value.length >= 2){
      this.consultas = await this.consultaservice.filter(value);
    }
  }

  async delete(consulta: Consulta){    
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir a consulta: ${consulta.id_cons}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(consulta);
          }
        }
      ]
    });
    alert.present();
  }

  async executeDelete(consulta: Consulta){
    try {
      // removendo do banco de dados
      await this.consultaservice.delete(consulta.id_cons);

      //removendo do array
      const index = this.consultas.indexOf(consulta);
      this.consultas.splice(index,1);

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
        message: 'Erro ao excluir a consulta! \n' + error,
        color: 'danger',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    }
  }

}