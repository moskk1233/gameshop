import { Component, inject } from '@angular/core';
import { TrendingGame } from '../../../components/home/trending-game/trending-game';
import { GameCard } from '../../../components/home/game-card/game-card';
import { GameService } from '../../../services/game.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TrendingGame, GameCard, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  gameService = inject(GameService);
}
