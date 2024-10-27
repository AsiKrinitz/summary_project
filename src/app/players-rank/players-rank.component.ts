import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from 'src/model/player';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-players-rank',
  templateUrl: './players-rank.component.html',
  styleUrls: ['./players-rank.component.css'],
})
export class PlayersRankComponent implements OnInit {
  currentId = 0;
  name = '';
  age = 0;
  color = '';
  playersArray: Array<Player> = [];

  visible = false;
  visible2 = false;

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

  ngOnInit(): void {
    this.getAllPlayers();
  }

  constructor(private playerService: PlayerService) {}

  getAllPlayers = () => {
    this.playerService.getAllPlayers().then((response) => {
      console.log(response.data);
      this.playersArray = response.data;
    });
  };

  deletePlayerById = (id: number) => {
    this.playerService.deletePlayerById(id).then((response) => {
      console.log(response);
      this.getAllPlayers();
      this.visible2 = false;
    });
  };

  openDialog = (id: number, name: string, age: number, color: string) => {
    this.visible = true;
    this.currentId = id;
    this.name = name;
    this.age = age;
    this.color = color;
  };

  openDeleteDialog = (id: number) => {
    this.visible2 = true;
  };

  updatePlayerInDialog = (updatePlayer: NgForm) => {
    let player: Player;
    player = updatePlayer.value;
    console.log(player);
    updatePlayer.reset();
    this.playerService.updatePlayer(player).then((response) => {
      console.log(response);
      this.getAllPlayers();
    });

    this.visible = false;
  };
}
