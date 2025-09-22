import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-game-library-detail',
  imports: [LucideAngularModule, DecimalPipe],
  templateUrl: './game-library-detail.html',
  styleUrl: './game-library-detail.css'
})
export class GameLibraryDetail {
  readonly ArrowLeftIcon = ArrowLeftIcon;

  private router = inject(Router);

  handleBackClick = () => {
    this.router.navigate(['/library']);
  }
}
