import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesComponent } from './components/routes/detalles/detalles.component';
import { IngresarComponent } from './components/routes/ingresar/ingresar.component';
import { InicioComponent } from './components/routes/inicio/inicio.component';
import { PelisComponent } from './components/routes/pelis/pelis.component';
import { SeriesComponent } from './components/routes/series/series.component';
import { DetallesPelisComponent } from './components/routes/detalles-pelis/detalles-pelis.component';
import { RegistrarComponent } from './components/routes/registrar/registrar.component';
import { DashboardComponent } from './components/routes/dashboard/dashboard.component';
import { MisPeliculasComponent } from './components/routes/mis-peliculas/mis-peliculas.component';
import { MisSeriesComponent } from './components/routes/mis-series/mis-series.component';
import { NuevoItemComponent } from './components/routes/nuevo-item/nuevo-item.component';
import { PageErrorComponent } from './components/routes/page-error/page-error.component';

const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        pathMatch: 'full'

    },
    {
        path: 'Peliculas',
        component: PelisComponent,

    },
    {
        path:'Series',
        component: SeriesComponent
    },
    {
        path:'Ingresar',
        component: IngresarComponent
    },
    {
        path:'Registro',
        component:RegistrarComponent
    },
    {
        path:'tvShowDetailsPage/:id',
        component: DetallesComponent
    },
    {
        path:'movieDetailsPage/:id',
        component: DetallesPelisComponent
    },
    {
        path:'Dashboard',
        component:DashboardComponent
    },
    {
        path:'nuevoItem',
        component:NuevoItemComponent
    },
    {
        path:'misSeries',
        component:MisSeriesComponent
    },
    {  
        path:'misPeliculas',
        component:MisPeliculasComponent

    },
    {
        path:'pageError',
        component:PageErrorComponent

    },
    {
        path:'**',
        redirectTo:'pageError'
    }
]


@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule

    ]
})

export class AppRoutingModule {}