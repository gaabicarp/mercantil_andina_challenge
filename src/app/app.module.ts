import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';
import { DatosPersonalesComponent } from './components/formulario/datos-personales/datos-personales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { DatosVehiculoComponent } from './components/formulario/datos-vehiculo/datos-vehiculo.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FormularioComponent,
    HomeComponent,
    DatosPersonalesComponent,
    DatosVehiculoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
