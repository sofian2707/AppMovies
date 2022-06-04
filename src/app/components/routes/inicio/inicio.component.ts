import { Component, Input, OnInit } from '@angular/core';
import { Trending } from '../../../interfaces/trending.interface';
import { MoviesService } from '../../../services/movies/movies.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[MoviesService]
})
export class InicioComponent implements OnInit {

  movies_series:Trending[]=[]

  movie:Trending[]=[]
  
  serie:Trending[]=[]


  filter:string="Todos";

  total!:number 
  
  toSearch:string = "";
  
  constructor(private _moviesService : MoviesService) { }
  
  ngOnInit(): void {
    
    this._moviesService.getTrending().subscribe({
      next: (data:any) =>{
        this.movies_series = data.results;
        this.total = this.movies_series.length;
      },
      error: (err) => {
        console.log(err)
      },
      complete:() =>{ 
        console.log ('La peticion termino')
      }
    })

    this._moviesService.getMovies().subscribe({
      next: (data:any) => {
          this.movie = data.results
      },
      error: (err)=>{
          console.log(err)
      },
      complete: () => {
          console.log("Se completo la peticion en movie")
      } 
  })

  this._moviesService.getSeries().subscribe({
    next : (data : any) => {
      this.serie = data.results
    },
    error : (err) => {
      console.log(err);
    },
    complete: () => {
      console.log("Se completo la peticion en serie")
    }
  })
  
    this.filterActivate('Todos')
}
 

  

  filterActivate(filter:string){    
    this.filter=filter;

    if(filter == 'Todos'){
      this.total = this.movies_series.length
    }
    else if(filter == 'Peliculas'){
      this.total = this.movie.length
    }
    else{
       this.total = this.serie.length
      }
  }
  
  search(value:string){

    if(this.filter == 'Todos'){
      if(value == ""){
        this.ngOnInit();
        this.total = this.movies_series.length
      }
      else{
      this.movies_series = this.movies_series.filter(res =>{
        return res.title?.toLocaleLowerCase().match(this.toSearch.toLocaleLowerCase());
        })
        this.total = this.movies_series.length
      }
    }
    else if(this.filter == 'Peliculas'){
      if(value == ""){
        this.ngOnInit();
        this.total = this.movie.length
      }
      else{
      this.movie = this.movie.filter(res =>{
        return res.title?.toLocaleLowerCase().match(this.toSearch.toLocaleLowerCase());
        })
        this.total = this.movie.length
      }
    }
    else{
      if(value == ""){
      this.ngOnInit();
      this.total = this.serie.length
    }
    else{
    this.serie = this.serie.filter(res =>{
      return res.name?.toLocaleLowerCase().match(this.toSearch.toLocaleLowerCase());
      })
      this.total = this.serie.length
    }
  }
       
  }
}
