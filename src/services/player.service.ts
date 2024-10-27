import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { Player } from 'src/model/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements OnInit {
  ngOnInit(): void {}

  constructor() {}

  addPlayer = (player: Player): Promise<any> => {
    return axios.post('http://localhost:54481/api/Player/AddPlayer', player);
  };

  getAllPlayers = (): Promise<any> => {
    return axios.get('http://localhost:54481/api/Player/GetAllPlayers');
  };

  deletePlayerById = (id: number): Promise<any> => {
    return axios.delete(
      'http://localhost:54481/api/Player/DeletePlayerById?id=' + id
    );
  };

  // update player by id
  updatePlayer = (player: Player): Promise<any> => {
    return axios.put(
      'http://localhost:54481/api/Player/UpdatePlayerById',
      player
    );
  };

  // get player by id
  getPlayerById = (id: number): Promise<any> => {
    return axios.get(
      'http://localhost:54481/api/Player/GetPlayerById?id=' + id
    );
  };

 
}
