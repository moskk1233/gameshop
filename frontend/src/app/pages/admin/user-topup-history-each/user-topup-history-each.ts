import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { TopupService } from '../../../services/topup.service';
import { Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AppUser, IUserTopupHistory } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ThaiDatePipe } from '../../../pipes/thai-date-pipe';
import { ArrowLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-user-topup-history-each',
  imports: [AdminHeader, AsyncPipe, ThaiDatePipe, LucideAngularModule],
  templateUrl: './user-topup-history-each.html',
  styleUrl: './user-topup-history-each.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTopupHistoryEach implements OnInit, OnDestroy {
  readonly ArrowLeftIcon = ArrowLeftIcon;

  destroy$ = new Subject<void>();

  topupService = inject(TopupService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  location = inject(Location)

  user!: AppUser | null;
  userTopup$!: Observable<IUserTopupHistory[]>;

  handleBackClick() {
    this.location.back();
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    if (!uid) {
      this.location.back()
    };
    this.userService.getProfile(uid!).pipe(
      takeUntil(this.destroy$),
      tap((user) => {
        if (!user) this.location.back();
      }),
      switchMap((user) => of(user!))
    ).subscribe(user => this.user = user);
    this.userTopup$ = this.topupService.getUserTopup(uid!);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
