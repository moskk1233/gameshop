import { Component, input, output, signal } from '@angular/core';
import { LucideAngularModule, Trash2Icon } from 'lucide-angular';
import { Game } from '../../../types';
import { TrunecatWordPipe } from '../../../pipes/trunecat-word-pipe';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-cart-card',
  imports: [LucideAngularModule, TrunecatWordPipe, DecimalPipe, RouterLink],
  templateUrl: './member-cart-card.html',
  styleUrl: './member-cart-card.css',
})
export class MemberCartCard {
  readonly TrashIcon = Trash2Icon;

  imageLoaded = signal(false);

  game = input.required<Omit<Game, 'sold'>>();

  deleted = output<number>();

  onDeleted = () => {
    this.deleted.emit(this.game().id);
  };
}
