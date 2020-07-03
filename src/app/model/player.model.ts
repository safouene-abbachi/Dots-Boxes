

export class PlayerModel {

   public id?: string;
          player1: string;
          player2: string;
          scorep1:string;
          scorep2:string;
          turn:string;
          winner:string;

    constructor( id: string,
                 player1: string,
                 player2: string,
                 turn:string,
                 winner:string,
                 scorep1:string,
                 scorep2:string
              ) {

        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        
        this.scorep1=scorep1;
        this.scorep2=scorep2;
   
        this.turn=turn;
        this.winner=winner;


    
    }
}
