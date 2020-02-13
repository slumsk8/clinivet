import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorFormPage } from './tutor-form.page';

const routes: Routes = [
  {
    path: '',
    component: TutorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorFormPageRoutingModule {}
