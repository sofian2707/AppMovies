import { Component, OnInit } from '@angular/core';
import { Trending } from '../../../interfaces/trending.interface';
import { MoviesService } from '../../../services/movies/movies.service';


@Component({
  selector: 'app-pelis',
  templateUrl: './pelis.component.html',
  styleUrls: ['./pelis.component.css'],
  providers:[MoviesService]
})
export class PelisComponent implements OnInit {

  movie:Trending[]=[];

  toSearch:string="";

  items:string="";

  constructor(private _moviesService : MoviesService) { }

  ngOnInit(): void {

    this._moviesService.getMovies().subscribe({
        next: (data:any) => {
            this.movie = data.results;
            if(this.movie.length > 1){
              this.items = `${this.movie.length} items`
            }
            else{
              this.items = `${this.movie.length} item`
            }
        },
        error: (err)=>{
            console.log(err)
        },
        complete: () => {
            console.log("Se completo la peticion en movie")
        } 
    })
  }

  search(){
    if(this.toSearch == ""){
      this.ngOnInit();
    }
    else{
     this.movie = this.movie.filter(res => {
        return res.title?.toLocaleLowerCase().match(this.toSearch.toLocaleLowerCase());
      })
      if(this.movie.length > 1){
        this.items = `${this.movie.length} items`
      }
      else{
        this.items = `${this.movie.length} item`
      }
    }
  }

}
