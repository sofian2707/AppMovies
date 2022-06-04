import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { getTvShow } from 'src/app/interfaces/getTvShow.interface';
import { Genre } from 'src/app/interfaces/getTvShow.interface';
import { MoviesService } from 'src/app/services/movies/movies.service';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {


  serie! : getTvShow;
  genres! : Genre [];

  masMenos:string = 'Ver mas...'

  isVerMas:boolean = false;
 

  constructor(private verSerie: ActivatedRoute,private _moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.verSerie.params.pipe(switchMap(({id}) => this._moviesServices.getTvShowDetails(id))).subscribe({
      next : (data:getTvShow) => {
        this.serie = data;
        this.genres = data.genres;
      },
      error : (err) => {
        console.log(err);
      },
      complete : () => {
        ("Se completo la peticion de ver serie");
      } 
    });
  }

  verMas(){
    if(this.isVerMas == false){
      this.isVerMas = true;
      this.masMenos = 'Ver menos...'
    }
    else{
      this.isVerMas = false;
      this.masMenos = 'Ver mas...'
    }
  }
}     
