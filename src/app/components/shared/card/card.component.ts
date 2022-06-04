import { Component, Input, OnInit } from '@angular/core';
import { Trending } from '../../../interfaces/trending.interface';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { getTvShow } from 'src/app/interfaces/getTvShow.interface';
import { GetMovie } from '../../../interfaces/getMovie.interface';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  path:string = '';

  serie!:getTvShow
  movie!:GetMovie

  test:any

  user$:Observable<any>=this._authService.afauth.user

  @Input() movies_series : Trending | undefined
  

  constructor(private _moviesService:MoviesService, private _authService:AuthService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.path = window.location.pathname;
  }

  addItem(id:number|undefined){
    this._moviesService.getTvShowDetails(id).subscribe({
    next: (data:getTvShow) => {
      this.serie = data;
      this.test = localStorage.getItem('Usuario' || null);
      this.test = JSON.parse(this.test);
      let idSerie = id!.toString();
      this._moviesService.addItem(this.test.uid, idSerie, this.serie)
    },
    error:(err) => {
      console.log(err);
    },
    complete:()=>{
      console.log("Se agrego serie");
    }
    })
    
  }
  addItemMovie(id:number|undefined){
    this._moviesService.getMovieDetails(id).subscribe({
      next:(data:GetMovie)=>{
        this.movie = data;
        this.test = localStorage.getItem('Usuario' || null);
        this.test = JSON.parse(this.test)
        let idMovie = id!.toString();
        this._moviesService.addItemMovie(this.test.uid, idMovie, this.movie)
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("se agrego movie")
      }
    })
  }

  async deleteItem(id:number|undefined){
    let idMovie = id!.toString();
    this.test = localStorage.getItem('Usuario' || null);
    this.test = JSON.parse(this.test)
    console.log(this.test.uid)
     try{
       await this._moviesService.deleteItem(this.test.uid, idMovie);
     }catch(err){
       console.log(err);
     }
     
  
    }
  
 async deleteItemMovie(id:number|undefined){
  let idMovie = id!.toString();
  this.test = localStorage.getItem('Usuario' || null);
  this.test = JSON.parse(this.test)
  console.log(this.test.uid)
   try{
     await this._moviesService.deleteItemMovie(this.test.uid, idMovie);
   }catch(err){
     console.log(err);
   }
  }

  openSnackBar(){
    this._snackBar.open("Item agregado", "OK", {
      duration: 4000,
      panelClass: ['purple-snackbar'],
     });
    }

  openSnackBarDelete(){
    this._snackBar.open("Item eliminado", "OK", {
      duration: 4000,
      panelClass: ['red-snackbar'],
    });
    }
}
