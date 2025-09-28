import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-management-card',
  imports: [RouterLink],
  templateUrl: './game-management-card.html',
  styleUrl: './game-management-card.css'
})
export class GameManagementCard {
  id = input.required<string>();
  thumbnail = input.required<string>();
  gameTitle = input.required<string>();
}
