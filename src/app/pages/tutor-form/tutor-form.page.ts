import { TutorService } from './../../../core/tutor/tutor.service';
import { Tutor } from './../../classes/tutor/tutor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tutor-form',
  templateUrl: './tutor-form.page.html',
  styleUrls: ['./tutor-form.page.scss'],
})
export class TutorFormPage implements OnInit {
  title: string = 'Incluir Tutor'
  tutor: Tutor;

  tutores: Tutor[] = [];

  constructor(
    private alertCtrl: AlertController,
    private tutorservice: TutorService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {    
   this.tutor = new Tutor();
   const idTutor = this.route.snapshot.paramMap.get('id');
   if(idTutor){
     this.title = 'Editar Tutor';
     this.loadTutor(parseInt(idTutor));
   }
  }

  ionViewWillEnter(){
  }

  async loadTutor(id: number) {
    this.tutor = await this.tutorservice.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.tutorservice.save(this.tutor);
      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Salvo com sucesso!',
        color: 'success',
        position: 'bottom',
        duration: 1000
      });
      
      this.tutor.id_tutor = result.insertId;      
      // console.log(this.tutor.id, this.tutor.email);
      this.navCtrl.navigateRoot('/home');
      toast.present();

    } catch (error) {      
      const toast = await this.toastCtrl.create({
        header: 'Error',
        message: 'Erro ao salvar! \n' + error,
        color: 'danger',
        position: 'bottom',
        duration: 1000
      });

      toast.present();
    }
  }


}