import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { MovieSeriesUser } from '../../interfaces/movieSerieUser.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:string = 'isNotLogged';


  constructor(public afauth:AngularFireAuth, private firestore: AngularFirestore) { }

  async register(email:string, password:string) {
    try{
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    }catch (err){
      console.log("error en login", err);
      return null;     
    }
  }

  async login (email: string, password:string){
    try{
      return await this.afauth.signInWithEmailAndPassword(email, password);
    }catch(err){
      console.log("error en login", err);
      return null;      
    }
  }

  async loginWithGoogle(){
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(err){
      console.log("error en login con google: ", err);
      return null;
      
    }
  }

  async logout(){
    try{
      return await this.afauth.signOut();
    }catch(err){
      console.log("erro en logout: " ,err);
      return null;
    }
    
  }

  addUser(userId:string):Promise <any> {
    return this.firestore.collection('usuarios').doc(userId).set({})
  }   
}
