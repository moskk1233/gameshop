import { Component, inject } from '@angular/core';
import { Gamepad2Icon, LogOutIcon, LucideAngularModule, ScanBarcodeIcon, TicketIcon, UserIcon } from 'lucide-angular';
import { UserService } from '../../../services/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebar {
  readonly UserIcon = UserIcon;
  readonly Gamepad2Icon = Gamepad2Icon;
  readonly LogOutIcon = LogOutIcon;
  readonly TicketIcon = TicketIcon;
  readonly ScanBarcodeIcon = ScanBarcodeIcon;

  userService = inject(UserService);

  handleLogout = () => {
    this.userService.logout();
  }
}
