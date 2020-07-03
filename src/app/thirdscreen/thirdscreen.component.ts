//import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { PlayerModel } from 'src/app/model/player.model';
import { LineModel } from 'src/app/model/line.model';
import { CheckedModel } from 'src/app/model/checked.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-thirdscreen',
  templateUrl: './thirdscreen.component.html',
  styleUrls: ['./thirdscreen.component.css']
})
export class ThirdscreenComponent implements OnInit {
  private game: PlayerModel=new PlayerModel(null,null,null,null,null,null,null) ;
  private Line: LineModel=new LineModel(null,null,null,null,null,null,null) ;
  private checked:CheckedModel=new CheckedModel(null,null,null)
  private idGame: string;
  turn:any
  scorep1:any=0
  scorep2:any=0
  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute:ActivatedRoute) 
    { 
      setInterval(() => {
        this.reload();
       
      }, 1600);


    }


 public p='test'
 public role:any
ngOnDestroy()
{
  this.firebaseService.deleteGame(this.game.id).then(
    ()=>{
      console.log('Game Destroyed!')
      sessionStorage.removeItem('idGame')
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('game')
      //this.router.navigate(['/firstscreen'])
    }
  )
}

  ngOnInit() {
  this.role=sessionStorage.getItem('role')
  this.idGame=sessionStorage.getItem('IdGame')
  this.getGameByID()
//this.game=JSON.parse(sessionStorage.getItem('game'))


  var g=JSON.parse(sessionStorage.getItem('game'))
      console.log("g",g[0])
      this.game.id=g[0].id

  console.log("this game",this.game)
  this.firebaseService.getGame(this.game.id).subscribe(
    data=>{
      sessionStorage.setItem('turn',data.turn)
      this.game.id=data.id
      this.game.player1=data.player1
      this.game.player2=data.player2
    
      this.game.turn=data.turn
    }
   )
            //for turn
      this.turn=sessionStorage.getItem('turn')

      /** the  start is for the player 1 */
    console.log('test',this.game)
   
   
  

    
    }


   


  getGameByID()
  {  
    this.firebaseService.getGame(this.idGame).subscribe(dataUser => {
      console.log("datauser",dataUser)
      this.game.id = dataUser.id;
      this.game.player1 = dataUser.player1;
      this.game.player2 = dataUser.player2;
      this.game.scorep1 = dataUser.scorep1;
      this.game.scorep2 = dataUser.scorep2;
      this.game.turn = dataUser.turn;
      this.game.winner = dataUser.winner;
      
      console.log("game third:",this.game)
      var g=[{
        'id':this.game.id,
        'player1':this.game.player1,
        'player2':this.game.player2,
        'scorep1':this.game.scorep1,
        'scorep2': this.game.scorep2,
        'turn': this.game.turn,
        'winner': this.game.winner,
      }]

      
      sessionStorage.setItem('game',JSON.stringify(g))
    });
  
 
  }

  Finish()
  {
    if(this.c.length==24)
    {  if(this.game.scorep1>this.game.scorep2)
      {
        alert("player :"+this.game.player1+"  win!!!")
      }else if(this.game.scorep2>this.game.scorep1)
      {
        alert("player :"+this.game.player2+"  win!!!")
      }else{
        alert(" equality !!")
      }
//to delete all the checked box saved  on the previous game
      this.firebaseService.removeChecked(this.idGame).subscribe(a=>{
        console.log("remove checked",a.length)

         for(var i=0;i <a.length;i++)
         {
           this.firebaseService.deleteChecked(this.idGame,a[i].id).then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
         }
      
          },err=>
          console.log("no checked")
         )
   //to delete all the ligne saved  on the previous game
   this.firebaseService.removeLine( this.idGame).subscribe(a=>{
    console.log("remove lines",a.length)

        for(var i=0;i <a.length;i++)
        {
          this.firebaseService.deleteLine(this.idGame,a[i].id).then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
        }
  
      },err=>
      console.log("no lines")
      )

      this.firebaseService.deleteGame(this.game.id).then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
      this.router.navigate(['/secondscreen']);
      
    }
    
  }


  reload()
  {
    
      this.getLinesDB()
    
      for(var i=0;i<this.c.length;i++)
      { console.log(this.c[0].idline)
        if(this.c[i].player==this.game.player1)
        {
        document.getElementById(''+this.c[i].idline+'').classList.remove("l1");
        document.getElementById(''+this.c[i].idline+'').classList.add("checkedp1")
        }
        else if(this.c[i].player==this.game.player2)
        {
        document.getElementById(''+this.c[i].idline+'').classList.remove("l1");
        document.getElementById(''+this.c[i].idline+'').classList.add("checkedp2")
        }

      }


     this.getCheckedDB()
     this.scorep1=0
     this.scorep2=0
      for(var i=0;i<this.x.length;i++)
      {
        
        console.log('xxxxx',this.x[i].idchecked)
      
        if(this.x[i].player==this.game.player1)
        {
        document.getElementById(this.x[i].idchecked).classList.remove("p");
        document.getElementById(this.x[i].idchecked).classList.add("p1")
        //score p1
          this.scorep1 =this.scorep1 +1
          this.game.scorep1= this.scorep1
          sessionStorage.setItem('scorep1',this.scorep1)

        }
        else if(this.x[i].player==this.game.player2)
        {
        document.getElementById(''+this.x[i].idchecked+'').classList.remove("p");
        document.getElementById(''+this.x[i].idchecked+'').classList.add("p2")

        //score p1
        this.scorep2 =this.scorep2 +1
        this.game.scorep2= this.scorep2
        sessionStorage.setItem('scorep2',this.scorep2)
        }

      }

      this.scorep1=0
      this.scorep2=0

    
      this.Finish()
      
      this.x=[]
      this.c=[]
     
    
  }



 


          public x1:any
          public x2:any
          public y1:any
          public y2:any
          public p1 = this.game.player1
          public p2 = this.game.player2
            getLine(evt:any)
            {


              if(this.game.player2==null)
              {
                    alert('player 2 is not ready ')
                    this.ngOnInit()
              }
              else
              {             
       
              if(this.game.turn==this.game.player1 && this.role=='1')
              {     console.log(evt)
              
                this.x1=   evt.toElement.x1.baseVal.value
                this.y1=   evt.toElement.y1.baseVal.value
                this.x2=  evt.toElement.x2.baseVal.value
               
                this.y2=  evt.toElement.y2.baseVal.value
                var id= evt.toElement.id

                console.log('x1,x2,y1,y2',this.x1,this.x2,this.y1,this.y2)
                var line={'x1':this.x1,'x2':this.x2,'y1':this.y1,'y2':this.y2,'player':this.game.player1,'idline':id}
                this.Line.x1=this.x1
                this.Line.x2=this.x2
                this.Line.y1=this.y1
                this.Line.y2=this.y2
                this.Line.player=this.game.player1
                
                console.log("id",id)
               /* document.getElementById(''+id+'').classList.remove("l1");
                document.getElementById(''+id+'').classList.add("checkedp1")
                */
                    
            
               var check1= this.Checkbox(line)
                console.log('Checkbox',check1)
                this.saveSelectedLine(line,id)

              

                if(check1==false)
                {
                this.game.turn=this.game.player2
                }
              }

            else  
            if(this.game.turn==this.game.player2 && this.role=='2')
              {
               
              
                this.x1=   evt.toElement.x1.baseVal.value
                this.y1=   evt.toElement.y1.baseVal.value
                this.x2=  evt.toElement.x2.baseVal.value
                this.y2=  evt.toElement.y2.baseVal.value
                this.Line.x1=this.x1
                this.Line.x2=this.x2
                this.Line.y1=this.y1
                this.Line.y2=this.y2
                this.Line.player=this.game.player2
                var id= evt.toElement.id
                console.log('x1,x2,y1,y2',this.x1,this.x2,this.y1,this.y2)
                var line={'x1':this.x1,'x2':this.x2,'y1':this.y1,'y2':this.y2,'player':this.game.player2,'idline':id}
              
                console.log("id",id)
               /* document.getElementById(''+id+'').classList.remove("l1");
                document.getElementById(''+id+'').classList.add("checkedp2")*/

                
              

              var check=  this.Checkbox(line)
             
              console.log('check',check)
                this.saveSelectedLine(line,id)

                

                if(check==false)
                {
                  this.game.turn=this.game.player1
                }

              
              }
              else{alert('Wait your turn please!')}

             
              this.firebaseService.updateGame(this.game).then(() => {       
                console.log('turn2 updated');
                  }, err => {
                  console.log('There was a problem updating.....');
              });
             
              this.getGameByID() 
              this.reload()

            }
            this.reload()
              }

    public Lines:Array<any>=[]

    saveChecked()
    { 
      var  ch=sessionStorage.getItem('checked')
      console.log("json checked",JSON.parse(ch))
        this.checked.idchecked=JSON.parse(ch).idchecked
        this.checked.player=JSON.parse(ch).player
      this.firebaseService.saveChecked(this.idGame,this.checked).then(()=>
      console.log('saved checked'))
    }

    saveSelectedLine(line,id)
    {
        this.Lines. push(line)
        console.log('line,',line) 
        console.log('lines,',this.Lines )
        this.Line.idline=id

        this.firebaseService.saveLine( this.idGame,this.Line).then(()=>
        console.log('saved'))
    }

public c:Array<LineModel>=[];
public x:Array<CheckedModel>=[]

getCheckedDB()
{
  this.firebaseService.getCheckeds(this.idGame).subscribe(dataChecked => {
  console.log(dataChecked) ;
   for(var i =0;i<dataChecked.length;i++)
   {
     this.x.push(dataChecked[i])
   }

   console.log('getCheckedDB()',this.x)
   
  });
}
    getLinesDB()
      {
        this.firebaseService.getLines(this.idGame).subscribe(dataLines => {
        console.log(dataLines) ;
         for(var i =0;i<dataLines.length;i++)
         {
           this.c.push(dataLines[i])
         }

         
        });
      }


     public key:any;
    Checkbox(line)
    {console.log('c',this.c)
      var linedb=this.getLinesDB()

      console.log("lines check boex",linedb)
      //horizental top
      var ahb={'x1':line.x1,'x2':line.x2,'y1':line.y1+80,'y2':line.y2+80}
      var bhb={'x1':line.x1,'x2':line.x1,'y1':line.y1,'y2':line.y1+80}
      var chb={'x1':line.x2,'x2':line.x2,'y1':line.y2,'y2':line.y2+80}
      var achb=false
      var bchb=false
      var cchb=false
      //horizental buttom
      var ahh={'x2':line.x1,'x1':line.x1,'y2':line.y1,'y1':line.y1-80}
      var bhh={'x2':line.x2,'x1':line.x2,'y2':line.y2,'y1':line.y2-80}
      var chh={'x1':line.x1,'x2':line.x2,'y1':line.y1-80,'y2':line.y2-80}
      var achh=false
      var bchh=false
      var cchh=false

       //vertical right
       var avr={'x1':line.x1+80,'x2':line.x2+80,'y1':line.y1,'y2':line.y2}
       var bvr={'x1':line.x1,'x2':line.x2+80,'y1':line.y1,'y2':line.y1}
       var cvr={'x1':line.x2,'x2':line.x2+80,'y1':line.y2,'y2':line.y2}
       var acvr=false
       var bcvr=false
       var ccvr=false

       //vertical left
       var avl={'x1':line.x1-80,'x2':line.x2-80,'y1':line.y1,'y2':line.y2}
       var bvl={'x2':line.x1,'x1':line.x1-80,'y2':line.y1,'y1':line.y1}
       var cvl={'x2':line.x2,'x1':line.x2-80,'y2':line.y2,'y1':line.y2}
       var acvl=false
       var bcvl=false
       var ccvl=false
   
      console.log("line in checkbox x1",line.x1)
      
      for (var i = 0; i < this.c.length; i++) {
        //when it have no left
        if(line.x1==10 && line.x2==10)
        {
 
 if(this.c[i].x1== avr.x1 && this.c[i].x2== avr.x2 && this.c[i].y1== avr.y1 && this.c[i].y2== avr.y2    )
 {
  acvr=true
 }
if(this.c[i].x1== bvr.x1 && this.c[i].x2== bvr.x2 && this.c[i].y1== bvr.y1 && this.c[i].y2== bvr.y2    )
 {
   bcvr=true
 }
if(this.c[i].x1== cvr.x1 && this.c[i].x2== cvr.x2 && this.c[i].y1== cvr.y1 && this.c[i].y2== cvr.y2    )
 {
   ccvr=true
 }
        }else

        //when it have no right
        if(line.x1==250 && line.x2==250)
        {
          if(this.c[i].x1== avl.x1 && this.c[i].x2== avl.x2 && this.c[i].y1== avl.y1 && this.c[i].y2== avl.y2    )
          {
           acvl=true
          }
         if(this.c[i].x1== bvl.x1 && this.c[i].x2== bvl.x2 && this.c[i].y1== bvl.y1 && this.c[i].y2== bvl.y2    )
          {
            bcvl=true
          }
         if(this.c[i].x1== cvl.x1 && this.c[i].x2== cvl.x2 && this.c[i].y1== cvl.y1 && this.c[i].y2== cvl.y2    )
          {
            ccvl=true
          }
        }else
        //when it have no top
        if(line.y1==10 && line.y2==10)
        {
        //  console.log("you are here ")
          if(this.c[i].x1== ahb.x1 && this.c[i].x2== ahb.x2 && this.c[i].y1== ahb.y1 && this.c[i].y2== ahb.y2    )
            {
             achb=true
            }
          if(this.c[i].x1== bhb.x1 && this.c[i].x2== bhb.x2 && this.c[i].y1== bhb.y1 && this.c[i].y2== bhb.y2    )
            {
              bchb=true
            }
          if(this.c[i].x1== chb.x1 && this.c[i].x2== chb.x2 && this.c[i].y1== chb.y1 && this.c[i].y2== chb.y2    )
            {
              cchb=true
            }

}
 else
        //when the line have no bottom
        if(line.y1==250 && line.y2==250)
        {
          if(this.c[i].x1== ahh.x1 && this.c[i].x2== ahh.x2 && this.c[i].y1== ahh.y1 && this.c[i].y2== ahh.y2    )
          {
           achh=true
          }
        if(this.c[i].x1== bhh.x1 && this.c[i].x2== bhh.x2 && this.c[i].y1== bhh.y1 && this.c[i].y2== bhh.y2    )
          {
            bchh=true
          }
        if(this.c[i].x1== chh.x1 && this.c[i].x2== chh.x2 && this.c[i].y1== chh.y1 && this.c[i].y2== chh.y2    )
          {
            cchh=true
          }


        
        }

        else{
               //verifier que cette ligne est vertical
          if(line.x1==line.x2)
          {
            if(this.c[i].x1== avr.x1 && this.c[i].x2== avr.x2 && this.c[i].y1== avr.y1 && this.c[i].y2== avr.y2    )
            {
             acvr=true
            }
           if(this.c[i].x1== bvr.x1 && this.c[i].x2== bvr.x2 && this.c[i].y1== bvr.y1 && this.c[i].y2== bvr.y2    )
            {
              bcvr=true
            }
           if(this.c[i].x1== cvr.x1 && this.c[i].x2== cvr.x2 && this.c[i].y1== cvr.y1 && this.c[i].y2== cvr.y2    )
            {
              ccvr=true
            }

            if(this.c[i].x1== avl.x1 && this.c[i].x2== avl.x2 && this.c[i].y1== avl.y1 && this.c[i].y2== avl.y2    )
          {
           acvl=true
          }
         if(this.c[i].x1== bvl.x1 && this.c[i].x2== bvl.x2 && this.c[i].y1== bvl.y1 && this.c[i].y2== bvl.y2    )
          {
            bcvl=true
          }
         if(this.c[i].x1== cvl.x1 && this.c[i].x2== cvl.x2 && this.c[i].y1== cvl.y1 && this.c[i].y2== cvl.y2    )
          {
            ccvl=true
          }

          }else
                ///verifier que cette ligne est horizontal
          if(line.y1==line.y2)
          {
            if(this.c[i].x1== ahb.x1 && this.c[i].x2== ahb.x2 && this.c[i].y1== ahb.y1 && this.c[i].y2== ahb.y2    )
            {
             achb=true
            }
          if(this.c[i].x1== bhb.x1 && this.c[i].x2== bhb.x2 && this.c[i].y1== bhb.y1 && this.c[i].y2== bhb.y2    )
            {
              bchb=true
            }
          if(this.c[i].x1== chb.x1 && this.c[i].x2== chb.x2 && this.c[i].y1== chb.y1 && this.c[i].y2== chb.y2    )
            {
              cchb=true
            }

            if(this.c[i].x1== ahh.x1 && this.c[i].x2== ahh.x2 && this.c[i].y1== ahh.y1 && this.c[i].y2== ahh.y2    )
            {
             achh=true
            }
          if(this.c[i].x1== bhh.x1 && this.c[i].x2== bhh.x2 && this.c[i].y1== bhh.y1 && this.c[i].y2== bhh.y2    )
            {
              bchh=true
            }
          if(this.c[i].x1== chh.x1 && this.c[i].x2== chh.x2 && this.c[i].y1== chh.y1 && this.c[i].y2== chh.y2    )
            {
              cchh=true
            }
            
          }
        }
        console.log(this.c[i]); 

      }
   let a=false
      if(achb==true && bchb==true && cchb==true){
                  var id=line.x1+30
                  var id1=line.y1+40

                  var d=id+''+id1
                  this.key=d
                  console.log("id",d)
                 
                  var b={'idchecked':d,'player':this.game.turn}
                  sessionStorage.setItem('checked',JSON.stringify(b))
               
                  console.log('ddd',this.key)
                  this.saveChecked()
                 a= true

                }


                if(achh==true && bchh==true && cchh==true){
                  var id2=line.x1+30
                 
                  var id22= line.y1 - 40

                  var d=id2+''+id22
                  this.key=d
                  console.log("id",d)
                 
                 
                  var b={'idchecked':d,'player':this.game.turn}
                  sessionStorage.setItem('checked',JSON.stringify(b))
                
                  console.log('ddd',this.key)
                  this.saveChecked()
                  a= true
                }

                if(acvr==true && bcvr==true && ccvr==true){
                  var id3=line.x1+30
                 
                  var id33= line.y1+40

                  var d=id3+''+id33
                  this.key=d
                  console.log("id",d)
                
                  var b={'idchecked':d,'player':this.game.turn}
                  sessionStorage.setItem('checked',JSON.stringify(b))
               
                  console.log('ddd',this.key)
                  this.saveChecked()
                  a= true
                }


                if(acvl==true && bcvl==true && ccvl==true){
                  var id4=line.x1-50
                 
                  var id44= line.y1+40

                  var d=id4+''+id44
                  this.key=d

                  console.log("id",d)
                
                  var b={'idchecked':d,'player':this.game.turn}
                  sessionStorage.setItem('checked',JSON.stringify(b))
                
           
                  this.saveChecked()
                  a= true
                }
          return a
    }
 
  

}
