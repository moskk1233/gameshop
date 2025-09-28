import { DecimalPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArrowLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-game-library-detail',
  imports: [LucideAngularModule, DecimalPipe],
  templateUrl: './game-library-detail.html',
  styleUrl: './game-library-detail.css',
})
export class GameLibraryDetail {
  readonly ArrowLeftIcon = ArrowLeftIcon;

  private location = inject(Location);

  handleBackClick = () => {
    this.location.back();
  };
}
