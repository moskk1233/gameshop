import { Component, inject } from '@angular/core';
import { TopupService } from '../../../services/topup.service';
import { AuthService } from '../../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { IUserTopupHistory } from '../../../types';
import { AsyncPipe } from '@angular/common';
import { ThaiDatePipe } from '../../../pipes/thai-date-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topup-history',
  imports: [AsyncPipe, ThaiDatePipe],
  templateUrl: './topup-history.html',
  styleUrl: './topup-history.css',
})
export class TopupHistory {
  topupService = inject(TopupService);
  authService = inject(AuthService);

  userTopups$!: Observable<IUserTopupHistory[]>;

  currentUserSubscription$!: Subscription;

  constructor() {
    this.authService.currentUser$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (user) => (this.userTopups$ = this.topupService.getUserTopup(user!.id)),
      );
  }
}
