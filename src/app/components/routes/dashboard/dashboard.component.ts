import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numberMovies!:number ;

  numberSeries!:number ;

  serie!:any[];

  movie!:any[];

  test:any;

  peliculas:string="";
  
  series:string="";

  constructor(private _moviesService:MoviesService) { }

  ngOnInit(): void {
    this.test = localStorage.getItem('Usuario' || null);
    this.test = JSON.parse(this.test);
    this.getMovies();
    this.getSeries();
  }

  getSeries(){
    this._moviesService.getList(this.test.uid).subscribe(
      response => {
        this.serie = [];
        response.forEach((element:any) => {
          this.serie.push({
            ...element.payload.doc.data(),
          })
        });
        this.numberSeries = this.serie.length;
        if(this.numberSeries > 1){
          this.series = 'Series'
        }
        else{
          this.series = 'Serie'
        }
      }
    )
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
        this.numberMovies = this.movie.length;
        if(this.numberMovies > 1){
          this.peliculas = 'Películas'
        }
        else{
          this.peliculas = 'Película'
        }
      }
    )
  }
}
