import { Component, ElementRef, ViewChild } from '@angular/core';
import { StepBackIcon, StepForwardIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-trending-game',
  imports: [LucideAngularModule],
  templateUrl: './trending-game.html',
  styleUrl: './trending-game.css'
})
export class TrendingGame {
  readonly StepBackIcon = StepBackIcon;
  readonly StepForwardIcon = StepForwardIcon;

  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;

  scrollAmount = 300;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  }
}
