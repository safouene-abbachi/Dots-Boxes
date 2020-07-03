import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

//import { PlayerDetailModel } from 'src/app/model/selected.model';
import { PlayerModel } from 'src/app/model/player.model';
import { FirebaseService } from 'src/app/services/firebase.service';
//import { AlertService } from 'src/services/alert.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-firstscreen',
  templateUrl: './firstscreen.component.html',
  styleUrls: ['./firstscreen.component.css']
})
export class FirstscreenComponent implements OnInit {

      public    form: NgForm;
      public  players: FormGroup;

      private game: PlayerModel;
     // private player:PlayerDetailModel;


      constructor(
          private formBuilder: FormBuilder,
          private activatedRoute: ActivatedRoute,
          private router: Router,
         public db: AngularFireDatabase,
         private firebaseService: FirebaseService,
      //   private toastr: ToastrService  // Toastr service for alert message
      ) {
          this.players = formBuilder.group({
                player1: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          })
       
      }

      ngOnInit() {
           
      }




      onSubmit(form: NgForm) {
        console.log('form :',form)
     //this.user.id = formUser.value.id;
        
        

        
      if (form.form.status=='VALID')
      {
                  
         sessionStorage.setItem('player',form.value.player1);         
         
         this.router.navigate(['/secondscreen']);
   
      }else
      {
        alert(`write correct name please!`);
      }
  }
}
