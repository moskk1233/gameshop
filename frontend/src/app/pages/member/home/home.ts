import { Component, inject, OnInit } from '@angular/core';
import { TrendingGame } from '../../../components/home/trending-game/trending-game';
import { GameCard } from '../../../components/home/game-card/game-card';
import { GameService } from '../../../services/game.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Game } from '../../../types';

@Component({
  selector: 'app-home',
  imports: [TrendingGame, GameCard, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  gameService = inject(GameService);

  games$!: Observable<Game[]>;
  trendingGames$!: Observable<Game[]>;

  ngOnInit(): void {
    this.games$ = this.gameService.getGames();
    this.trendingGames$ = this.gameService.getTrendingGames();
  }
}
