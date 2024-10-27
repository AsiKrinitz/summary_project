import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/model/player';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css'],
})
export class PlayerFormComponent implements OnInit {
  countries = [
    'USA',
    'Canada',
    'Mexico',
    'France',
    'Germany',
    'Spain',
    'Japan',
    'Israel',
  ];

  selectedCountry = '';

  constructor(private playerService: PlayerService, private router: Router) {}
  ngOnInit(): void {}

  onSubmitForm = (playerForm: NgForm) => {
    try {
      if (this.selectedCountry == '') {
        alert('please choose a country...');
      } else {
        let player: Player = playerForm.value;
        console.log(player);

        this.playerService.addPlayer(player).then((response) => {
          console.log(response);
        });
        playerForm.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAllPlayersFromService = () => {
    this.playerService.getAllPlayers().then((response) => {
      console.log(response);
      console.log(response.data);
    });
  };

  goToPlayerTable = () => {
    this.router.navigate(['/ranking']);
  };
}
