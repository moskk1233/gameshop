import { Component, inject } from '@angular/core';
import { GameCard } from '../../components/game-library/game-card/game-card';
import { GameService } from '../../services/game.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-game-library',
  imports: [GameCard, AsyncPipe],
  templateUrl: './game-library.html',
  styleUrl: './game-library.css',
})
export class GameLibrary {
  gameService = inject(GameService);
}
