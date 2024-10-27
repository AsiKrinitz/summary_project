import { Component } from '@angular/core';
import { Player } from 'src/model/player';
import { PlayerService } from 'src/services/player.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userName = '';
  userAge = 0;

  user: any;

  id: number = 0;
  name: string = '';
  age: number = 0;
  color: string = '';

  showTable = false;
  noRecordFound = false;

  constructor(private playerService: PlayerService, private router: Router) {}

  findUser = (id: number) => {
    this.playerService.getPlayerById(id).then((response) => {
      debugger;
      console.log(response);
      let player: Player = response.data;
      this.id = player.Id;
      this.name = player.Name;
      this.age = player.Age;
      this.color = player.Color;
      this.showTable = true;
      if (this.id == 0) {
        this.noRecordFound = true;
      } else {
        this.noRecordFound = false;
      }
    });
  };

  goToGallery = (form: NgForm) => {
    this.user = form.value;
    const userString = JSON.stringify(this.user);
    console.log(this.user);
    console.log(userString);
    this.router.navigate(['/gallery'], {
      queryParams: { user: userString },
    });
  };
}
