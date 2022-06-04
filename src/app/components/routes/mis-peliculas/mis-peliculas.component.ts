import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-mis-peliculas',
  templateUrl: './mis-peliculas.component.html',
  styleUrls: ['./mis-peliculas.component.css']
})
export class MisPeliculasComponent implements OnInit {

  toSearch:string="";

  test:any;
  movie!:any[];
  moviesSeriesAux:any[]=[];

  constructor(private _moviesService:MoviesService) { }



  ngOnInit(): void {
    this.test = localStorage.getItem('Usuario' || null);
    this.test = JSON.parse(this.test);
    this.getMovies();
  }
  getMovies(){
    this._moviesService.getListMovie(this.test.uid).subscribe(
      response => {
        this.movie = [];
        response.forEach((element:any) => {
          this.movie.push({
            ...element.payload.doc.data(),
          })
        });
      }
    )
  }

  wordToSearch(value:string){
    this.toSearch = value;
    if(this.toSearch == ""){
      this.ngOnInit();
   }
  }

  search(){
    this.moviesSeriesAux = this.movie.filter(resp => resp.title?.toLocaleLowerCase() == this.toSearch.toLocaleLowerCase());
    this.movie = this.moviesSeriesAux;
  }
}
