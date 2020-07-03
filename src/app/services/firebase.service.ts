import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { PlayerModel } from '../model/player.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { LineModel } from '../model/line.model';
import { CheckedModel } from '../model/checked.model';

//import { SelectedModel } from '../model/selected.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    itemValue = '';
    items: Observable<any[]>;
    Games: AngularFireList<PlayerModel>;
    resultRAW:any;
    private resultObservable: Observable<PlayerModel[]>;
    // Inject AngularFireDatabase Dependency in Constructor
    constructor(private afs: AngularFirestore,private http: HttpClient)
     { }


  
    /*AddGame(g: PlayerModel) {
      console.log('gg',g)      
      return   this.db.list('items').push({ player1: g.player1,player2: g.player2});
    }*/
   
    saveGame(game: PlayerModel): Promise<DocumentReference> {

      return this.afs.collection('/game').add({
       
        player1: game.player1,
        player2: game.player2,
        scorep1: game.scorep1,
        scorep2: game.scorep2,
           turn: game.turn,
         winner: game.winner     
      });
    }

    saveChecked(idGame:string,checked: CheckedModel): Promise<DocumentReference> {

      return this.afs.collection('/checked'+idGame).add({
       
        idchecked: checked.idchecked,
        player: checked.player,
           
      });
    }


   
   
    saveLine(idgame:string, line: LineModel): Promise<DocumentReference> {
           
      return this.afs.collection('/lines'+idgame).add({
       
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2,
        player:line.player,
        idline:line.idline
               
      });
    }
  
    getLines(idgame:string): Observable<LineModel[]> {

      return this.afs.collection('/lines'+idgame).snapshotChanges()
        .pipe(map(res => {
  
          this.resultRAW = res;
  
          return this.resultObservable = this.resultRAW.map(gameData => {
            return new LineModel(
              gameData.payload.doc.id,
              gameData.payload.doc.data().x1,
              gameData.payload.doc.data().x2,
              gameData.payload.doc.data().y1,
              gameData.payload.doc.data().y2,
              gameData.payload.doc.data().player,
              gameData.payload.doc.data().idline,
             
            );
  
          });
        }));
    }



    getCheckeds(idgame:string): Observable<CheckedModel[]> {

      return this.afs.collection('/checked'+idgame).snapshotChanges()
        .pipe(map(res => {
  
          this.resultRAW = res;
  
          return this.resultObservable = this.resultRAW.map(gameData => {
            return new CheckedModel(
              gameData.payload.doc.id,
              gameData.payload.doc.data().idchecked,
              gameData.payload.doc.data().player,
                         
            );
  
          });
        }));
    }


    getGames(): Observable<PlayerModel[]> {

      return this.afs.collection('/game').snapshotChanges()
        .pipe(map(res => {
  
          this.resultRAW = res;
  
          return this.resultObservable = this.resultRAW.map(gameData => {
            return new PlayerModel(
              gameData.payload.doc.id,
              gameData.payload.doc.data().player1,
              gameData.payload.doc.data().player2,
              gameData.payload.doc.data().turn,
              gameData.payload.doc.data().winner,
              gameData.payload.doc.data().scorep1,
              gameData.payload.doc.data().scorep2,
              
            );
  
          });
        }));
    }
    



 
    
      getGame(id: string): Observable<PlayerModel> {
        return this.afs.collection('/game').doc<PlayerModel>(id).valueChanges()
          .pipe(map(gameData => {
  
                return new PlayerModel(
                  id,
                  gameData.player1,
                  gameData.player2,
                  gameData.turn,
                  gameData.winner,
                  
                  gameData.scorep1,
                  gameData.scorep2,

                );
  
        }));
      }



   updateGame(game : PlayerModel): Promise<void> {

      return this.afs.collection('/game').doc(game.id).set({
        player1: game.player1,
        player2: game.player2,
        scorep1: game.scorep1,
        scorep2: game.scorep2,
           turn: game.turn,
         winner: game.winner
      });
    }
  
    deleteGame(id: string): Promise<void>
    {
      return this.afs.collection('/game').doc(id).delete();
    }

    deleteLine(idgame:string,id: string): Promise<void>
    {
      return this.afs.collection('/lines'+idgame).doc(id).delete();
    }

    deleteChecked(idgame:string,id: string): Promise<void>
    {
      return this.afs.collection('/checked'+idgame).doc(id).delete();
    }
    removeChecked(idgame:string): Observable<CheckedModel[]> {

      return this.afs.collection('/checked'+idgame).snapshotChanges()
        .pipe(map(res => {
  
          this.resultRAW = res;
  
          return this.resultObservable = this.resultRAW.map(gameData => {
            var a= new CheckedModel(
              gameData.payload.doc.id,
              gameData.payload.doc.data().idchecked,
              gameData.payload.doc.data().player         
              
            );
            return a
            
           

  
          });
        }));
    }
    
    removeLine(idgame:string): Observable<LineModel[]> {

      return this.afs.collection('/lines'+idgame).snapshotChanges()
        .pipe(map(res => {
  
          this.resultRAW = res;
          return this.resultObservable = this.resultRAW.map(gameData => {
            var a= new LineModel(
              gameData.payload.doc.id,
              gameData.payload.doc.data().x1,
              gameData.payload.doc.data().x2,
              gameData.payload.doc.data().y1,
              gameData.payload.doc.data().y2,
              gameData.payload.doc.data().player,
              gameData.payload.doc.data().idline,
              
            );
            return a
            
           

  
          });
        }));
    }
    


    
}
