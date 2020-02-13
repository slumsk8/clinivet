import { Tutor } from 'src/app/classes/tutor/tutor';
import { TutorService } from './../../../core/tutor/tutor.service';
import { PetService } from './../../../core/pet/pet.service';
import { Pet } from './../../classes/pet/pet';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from './../../../core/consulta/consulta.service';
import { Consulta } from './../../classes/consulta/consulta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})


export class ConsultaPage implements OnInit {
  title: string = 'Nova Consulta'
  
  consulta: Consulta;
  consultas: Consulta[] = [];  
  
  // tutores: Tutor[] = [];
  pets: Pet[] = []

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
  
  horario: string;
  constructor(
    private consultaservice: ConsultaService,
    private petservice: PetService,
    private tutorservice: TutorService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {    
    this.consulta = new Consulta();
    let idConsulta = this.route.snapshot.paramMap.get('id');
    if (idConsulta) {
      this.title = "Editar Consulta";
      this.loadConsulta(parseInt(idConsulta));
    }   
  }

 ionViewWillEnter(){
  //  this.loadTutores();
   this.loadPets();
 }

  // async loadTutores(){
  //   this.tutores = await this.tutorservice.getAll();
  // }
  async loadPets(){
    this.pets = await this.petservice.getAll();
  }
 
  async loadConsulta(id: number) {
    this.consulta = await this.consultaservice.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.consultaservice.save(this.consulta);
      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Salvo com sucesso!',
        color: 'success',
        position: 'bottom',
        duration: 1000
      });
      
      this.consulta.id_cons = result.insertId;
      console.log(this.consulta.id_cons);
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