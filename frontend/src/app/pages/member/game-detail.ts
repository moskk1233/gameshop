import { DecimalPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ArrowLeftIcon,
  LucideAngularModule,
  ShoppingCartIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-game-detail',
  imports: [LucideAngularModule, DecimalPipe],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetail {
  readonly ArrowLeftIcon = ArrowLeftIcon;
  readonly ShoppingCartIcon = ShoppingCartIcon;

  private location = inject(Location);

  handleBackClick = () => {
    this.location.back();
  };
}
