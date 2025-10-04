import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../../types';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-topup-history',
  imports: [AsyncPipe, AdminHeader, RouterLink],
  templateUrl: './user-topup-history.html',
  styleUrl: './user-topup-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTopupHistory implements OnInit {
  userService = inject(UserService);

  users$!: Observable<AppUser[]>;

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
