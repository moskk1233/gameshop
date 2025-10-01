import { Component, inject } from '@angular/core';
import {
  Gamepad2Icon,
  LogOutIcon,
  LucideAngularModule,
  ScanBarcodeIcon,
  TicketIcon,
  UserIcon,
} from 'lucide-angular';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-sidebar',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  readonly UserIcon = UserIcon;
  readonly Gamepad2Icon = Gamepad2Icon;
  readonly LogOutIcon = LogOutIcon;
  readonly TicketIcon = TicketIcon;
  readonly ScanBarcodeIcon = ScanBarcodeIcon;

  userService = inject(UserService);
  authService = inject(AuthService);

  router = inject(Router);

  currentUser = toSignal(this.authService.currentUser$);

  handleLogout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };
}
