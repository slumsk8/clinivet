import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},

  { path: 'pet-form', loadChildren: () => import('./pages/pet-form/pet-form.module').then( m => m.PetFormPageModule)},
  { path: 'pet-form/new', loadChildren: () => import('./pages/pet-form/pet-form.module').then( m => m.PetFormPageModule)},
  { path: 'pet-form/edit/:id', loadChildren: () => import('./pages/pet-form/pet-form.module').then( m => m.PetFormPageModule)},
  
  { path: 'tutor-form', loadChildren: () => import('./pages/tutor-form/tutor-form.module').then( m => m.TutorFormPageModule)},
  { path: 'tutor-form/new', loadChildren: () => import('./pages/tutor-form/tutor-form.module').then( m => m.TutorFormPageModule)},
  { path: 'tutor-form/edit/:id', loadChildren: () => import('./pages/tutor-form/tutor-form.module').then( m => m.TutorFormPageModule)},
  
  { path: 'consulta', loadChildren: () => import('./pages/consulta/consulta.module').then( m => m.ConsultaPageModule)},
  { path: 'consulta/new', loadChildren: () => import('./pages/consulta/consulta.module').then( m => m.ConsultaPageModule)},
  { path: 'consulta/edit/:id', loadChildren: () => import('./pages/consulta/consulta.module').then( m => m.ConsultaPageModule)},
  
  { path: 'buscas', loadChildren: () => import('./pages/buscas/buscas.module').then( m => m.BuscasPageModule)},
  
  // Listagens pets, tutores e consultas
  { path: 'pet-list', loadChildren: () => import('./pages/listagem/pets-list/pets-list.module').then( m => m.PetsListPageModule)},
  { path: 'tutor-list', loadChildren: () => import('./pages/listagem/tutor-list/tutor-list.module').then( m => m.TutorListPageModule)},
  { path: 'consulta-list', loadChildren: () => import('./pages/listagem/consulta-list/consulta-list.module').then( m => m.ConsultaListPageModule)},
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
