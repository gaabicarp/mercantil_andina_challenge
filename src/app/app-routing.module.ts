import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalComponent } from './components/formulario/final/final.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'final', component: FinalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
