export class LineModel {

    public id?: string;
            x1: number;
            x2: number;
            y1:number;
            y2:number;
            player:string;
            idline:string;
 
     constructor( id: string,
                  x1: number,
                  x2: number,
                  y1:number,
                  y2:number,
                  player:string,
                  idline:string ) 
               {
 
                this.id = id;
                this.x1 = x1;
                this.x2 = x2;
                this.y1 = y1;
                this.y2 = y2;
                this.player=player;
                this.idline = idline;
               
              }
 }
 