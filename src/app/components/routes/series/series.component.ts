import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Trending } from '../../../interfaces/trending.interface';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [MoviesService]
})
export class SeriesComponent implements OnInit {

  serie:Trending[]=[];

  toSearch:string ="";

  items:string = ""
  

  constructor(private _moviesService : MoviesService) { }

  ngOnInit(): void {

    this._moviesService.getSeries().subscribe({
      next : (data : any) => {
        this.serie = data.results;

        if(this.serie.length > 1){
          this.items = `${this.serie.length} items`
        }
        else{
          this.items = `${this.serie.length} item`
        }
      },
      error : (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Se completo la peticion en serie")
      }
    })
  

  }

  search(){
    if(this.toSearch == ""){
      this.ngOnInit();
    }
    else{
     this.serie = this.serie.filter(res => {
        return res.name?.toLocaleLowerCase().match(this.toSearch.toLocaleLowerCase());
      })
      if(this.serie.length > 1){
        this.items = `${this.serie.length} items`
      }
      else{
        this.items = `${this.serie.length} item`
      }
    }
  }

}
