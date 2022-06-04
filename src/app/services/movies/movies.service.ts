import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getTvShow } from 'src/app/interfaces/getTvShow.interface';
import { Trending } from '../../interfaces/trending.interface';
import { GetMovie } from '../../interfaces/getMovie.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MovieSeriesUser, MovieSerieBase } from '../../interfaces/movieSerieUser.interface';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl:string = "https://api.themoviedb.org/3";
  private api_key:string = "ba9ae94be06d064a38c2965febf28a10";

  constructor(private _http : HttpClient, private firestore:AngularFirestore) { }

  getTrending() : Observable<Trending[]>{
    let params = new HttpParams().set('api_key', this.api_key);
    return this._http.get<Trending[]>(`${this.baseUrl}/trending/all/week?language=es`, {params:params});
  };

  getMovies() : Observable<Trending[]>{
    let params = new HttpParams().set('api_key', this.api_key);
    return this._http.get<Trending[]>(`${this.baseUrl}/movie/popular?language=es`, {params:params}) 
  };

  getSeries() : Observable<Trending[]>{
    let params = new HttpParams().set('api_key', this.api_key);
    return this._http.get<Trending[]>(`${this.baseUrl}/tv/popular?language=es`, {params:params}) 
  };

  getTvShowDetails(id:number|undefined) : Observable<getTvShow>{
    let params = new HttpParams().set('api_key', this.api_key);
    return this._http.get<getTvShow>(`${this.baseUrl}/tv/${id}?language=es`, {params:params}) 
  };

  getMovieDetails(id:number|undefined) : Observable<GetMovie>{
    let params = new HttpParams().set('api_key', this.api_key);
    return this._http.get<GetMovie>(`${this.baseUrl}/movie/${id}?language=es`, {params:params}) 
  };

  addItem(userId:string, id:string, item: getTvShow):Promise <any>{
    return this.firestore.collection('usuarios').doc(userId).collection('tvshow').doc(id).set(item)
  }
  addItemMovie(userId:string, id:string, item: GetMovie):Promise <any>{
    return this.firestore.collection('usuarios').doc(userId).collection('movies').doc(id).set(item)
  }
  getList(userId:string):Observable<any>{
    return this.firestore.collection('usuarios').doc(userId).collection('tvshow').snapshotChanges();
  }
  getListMovie(userId:string):Observable<any>{
    return this.firestore.collection('usuarios').doc(userId).collection('movies').snapshotChanges();
  }

  deleteItem(idUser:string, id:string):Promise<any>{
    return this.firestore.collection(`usuarios/${idUser}/tvshow`).doc(id).delete();
  }
  deleteItemMovie(idUser:string, id:string):Promise<any>{
    return this.firestore.collection(`usuarios/${idUser}/movies`).doc(id).delete();
  }
}


