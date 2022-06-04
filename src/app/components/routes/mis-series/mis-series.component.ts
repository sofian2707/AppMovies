import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies/movies.service';

@Component({
  selector: 'app-mis-series',
  templateUrl: './mis-series.component.html',
  styleUrls: ['./mis-series.component.css']
})
export class MisSeriesComponent implements OnInit {

  toSearch:string="";
  test:any;
  serie!:any[];
  moviesSeriesAux:any[]=[];

  constructor(private _moviesService:MoviesService) { }

  ngOnInit(): void {
    this.test = localStorage.getItem('Usuario' || null);
    this.test = JSON.parse(this.test);
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
    this.moviesSeriesAux = this.serie.filter(resp => resp.name?.toLocaleLowerCase() == this.toSearch.toLocaleLowerCase());
    this.serie = this.moviesSeriesAux;
  }
}

