import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../../services/movies/movies.service';
import { switchMap } from 'rxjs';
import { Genre, GetMovie } from 'src/app/interfaces/getMovie.interface';

@Component({
  selector: 'app-detalles-pelis',
  templateUrl: './detalles-pelis.component.html',
  styleUrls: ['./detalles-pelis.component.css']
})
export class DetallesPelisComponent implements OnInit {

  movie! : GetMovie;
  genres! : Genre [];

  masMenos:string = 'Ver mas...'

  isVerMas:boolean = false;

  constructor(private verPelicula : ActivatedRoute, private _moviesServices : MoviesService) { }

  ngOnInit(): void {
    this.verPelicula.params.pipe(switchMap(({id}) => this._moviesServices.getMovieDetails(id))).subscribe({
      next : (data:GetMovie) => {
        this.movie = data;
        this.genres = data.genres;
      },
      error : (err) => {
        console.log(err);
      },
      complete : () => {
        console.log("Se complete la peticion getMovies");
      }
    })
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