import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeftIcon, LucideAngularModule, ShoppingCartIcon } from "lucide-angular";

@Component({
  selector: 'app-game-detail',
  imports: [LucideAngularModule, DecimalPipe],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css'
})
export class GameDetail {
  readonly ArrowLeftIcon = ArrowLeftIcon;
  readonly ShoppingCartIcon = ShoppingCartIcon;

  private router = inject(Router);

  handleBackClick = () => {
    this.router.navigate(['/']);
  }
}
