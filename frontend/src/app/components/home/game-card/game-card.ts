import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  thumbnail = input.required<string>();
  gameTitle = input.required<string>();
}
