import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsListPage } from './pets-list.page';

const routes: Routes = [
  {
    path: '',
    component: PetsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsListPageRoutingModule {}
