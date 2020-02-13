import { Pet } from './../../classes/pet/pet';
import { Tutor } from './../../classes/tutor/tutor';
import { TutorService } from './../../../core/tutor/tutor.service';
import { PetService } from './../../../core/pet/pet.service';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.page.html',
  styleUrls: ['./pet-form.page.scss'],
})
export class PetFormPage implements OnInit {
  title: string = 'Incluir Pet';

 

  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  dayShortNames: string[] = 
  [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui',
    'Sex', 'Sab'
  ];

  pet: Pet;
  pets: Pet[] = [];

  // tutor: Tutor;
  tutor: Tutor;
  tutores: Tutor[] = [];

 
  

  constructor(
    private petservice: PetService,
    private tutorservice: TutorService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
   
  }

  ngOnInit() {
    this.pet = new Pet();
    const idPet = this.route.snapshot.paramMap.get('id');
    if (idPet) {
      this.title = "Editar Pet"
      this.loadPet(parseInt(idPet));
    }
  }

  ionViewWillEnter() {
    this.loadTutores();    
  }

  async loadPet(id: number) {
    this.pet = await this.petservice.getById(id);   
  }

  async loadTutores() {
    this.tutores = await this.tutorservice.getAll();
  }

  async onSubmit() {
    try {
      const result = await this.petservice.save(this.pet);
   
      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Salvo com sucesso!',
        color: 'success',
        position: 'bottom',
        duration: 1000
      });

      this.pet.id_pet = result.insertId;
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