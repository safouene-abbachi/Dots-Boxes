import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PlayerModel } from "src/app/model/player.model";
import { FirebaseService } from "src/app/services/firebase.service";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Observable } from "rxjs";
//import { PlayerDetailModel } from '../model/selected.model';
@Component({
  selector: "app-secondscreen",
  templateUrl: "./secondscreen.component.html",
  styleUrls: ["./secondscreen.component.css"],
})
export class SecondscreenComponent implements OnInit {
  private games: Array<PlayerModel>;
  private player: string;
  private player2: string;
  private game: PlayerModel = new PlayerModel(
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  items: Observable<any[]>;
  // items1: FirebaseListObservable<any[]>;
  constructor(
    private db: AngularFireDatabase,
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getGames();

    this.player = sessionStorage.getItem("player");
  }

  getGames() {
    this.firebaseService.getGames().subscribe((dataUsers) => {
      //this.loading = false;
      this.games = dataUsers;

      //console.log("items: ", data);
    });
  }

  new() {
    this.game.player1 = this.player;
    this.game.turn = this.player;
    console.log("this.game", this.game);
    this.firebaseService.saveGame(this.game).then((docref) => {
      //this.router.navigateByUrl('/');

      console.log("game added");
      console.log("vvv", docref ? (<any>docref).id : "void");
      var id = docref ? (<any>docref).id : "void";
      console.log("id", id);
      sessionStorage.setItem("IdGame", id);
      sessionStorage.setItem("role", "1");

      this.router.navigate(["/thirdscreen"]);
    });
  }

  ngOnDestroy() {
    console.log("destroy");

    //this.showToast('Idea added');
  }

  join(id) {
    this.firebaseService.getGame(id).subscribe((dataUser) => {
      console.log("data user2 ", dataUser);

      this.game.id = dataUser.id;
      this.game.player1 = dataUser.player1;
      this.game.player2 = this.player;
      this.game.scorep1 = "0";
      this.game.scorep2 = "0";
      this.game.turn = dataUser.turn;
      this.game.winner = dataUser.winner;

      console.log("game third:", this.game);
      var g = [
        {
          id: this.game.id,
          player1: this.game.player1,
          player2: this.game.player2,
          scorep1: this.game.scorep1,
          scorep2: this.game.scorep2,
          turn: this.game.turn,
          winner: this.game.winner,
        },
      ];

      sessionStorage.setItem("IdGame", this.game.id);
      sessionStorage.setItem("game", JSON.stringify(g));
      sessionStorage.setItem("role", "2");

      this.firebaseService.updateGame(this.game).then(() => {
        this.router.navigate(["/thirdscreen"]);
      });
    });
  }
}
