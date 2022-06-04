import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { PelisComponent } from './pelis/pelis.component';
import { SeriesComponent } from './series/series.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesComponent } from './detalles/detalles.component';
import { DetallesPelisComponent } from './detalles-pelis/detalles-pelis.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NuevoItemComponent } from './nuevo-item/nuevo-item.component';
import { MisSeriesComponent } from './mis-series/mis-series.component';
import { MisPeliculasComponent } from './mis-peliculas/mis-peliculas.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { LayoutModule } from '../layout/layout.module';




@NgModule({
  declarations: [
    InicioComponent,
    PelisComponent,
    SeriesComponent,
    IngresarComponent,
    DetallesComponent,
    DetallesPelisComponent,
    RegistrarComponent,
    DashboardComponent,
    NuevoItemComponent,
    MisSeriesComponent,
    MisPeliculasComponent,
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule    
  ]
})
export class RoutesModule { }
