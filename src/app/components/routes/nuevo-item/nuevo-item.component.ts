import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Trending } from '../../../interfaces/trending.interface';


@Component({
  selector: 'app-nuevo-item',
  templateUrl: './nuevo-item.component.html',
  styleUrls: ['./nuevo-item.component.css']
})
export class NuevoItemComponent implements OnInit {


  toSearch:string="";

  movies_series:Trending[]=[];

  moviesSeriesAux:Trending[]=[];

  constructor(private _moviesService:MoviesService) { }

  ngOnInit(): void {
    this._moviesService.getTrending().subscribe({
      next: (data:any) =>{
        this.movies_series = data.results;
      },
      error: (err) => {
        console.log(err)
      },
      complete:() =>{ 
        console.log ('La peticion termino')
      }
    })
  }

  wordToSearch(value:string){
    this.toSearch = value;
    if(this.toSearch == ""){
      this.ngOnInit();
   }
  }

  search(){
    this.moviesSeriesAux = this.movies_series.filter(resp => resp.title?.toLocaleLowerCase() == this.toSearch.toLocaleLowerCase() 
    || resp.name?.toLocaleLowerCase() == this.toSearch.toLocaleLowerCase() );
    this.movies_series = this.moviesSeriesAux;
  }
}

