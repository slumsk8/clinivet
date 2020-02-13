import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { TutorService } from './../../../../core/tutor/tutor.service';
import { Tutor } from './../../../classes/tutor/tutor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.page.html',
  styleUrls: ['./tutor-list.page.scss'],
})
export class TutorListPage implements OnInit {
  title = 'Tutores';
  tutores: Tutor[] = [];

  constructor(
    private tutorservice: TutorService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  
  }

  ionViewWillEnter() {
    this.loadTutores();
  }

  async loadTutores() {
    this.tutores = await this.tutorservice.getAll();
  }

  // async loadTutor(id: number) {
  //   return await this.tutorservice.getById(id);
  // }

  doSearchClear() {
    this.loadTutores();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.tutores = await this.tutorservice.filter(value);
    }
  }

  async delete(tutor: Tutor) {    
    // console.log(tutor.id);
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir este tutor: ${tutor.nome_tutor}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(tutor);

          }
        }
      ]
    });
    alert.present();
  }

  async executeDelete(tutor: Tutor) {
    try {
      // removendo do banco de dados
      await this.tutorservice.delete(tutor.id_tutor);

      //removendo do array
      const index = this.tutores.indexOf(tutor);
      this.tutores.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Tutor excluído com sucesso!',
        color: 'success',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Erro ao excluir o Tutor!',
        color: 'danger',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    }
  }


}