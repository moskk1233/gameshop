import { Component, inject, signal } from '@angular/core';
import {
  FileIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  HouseIcon,
  WalletIcon,
  CoinsIcon,
  Gamepad2Icon,
  ScanBarcodeIcon,
  UserPlusIcon,
  LogInIcon,
  ShoppingCartIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { UserService } from '../../../services/user.service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { TopupService } from '../../../services/topup.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-member-sidebar',
  imports: [
    LucideAngularModule,
    DecimalPipe,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './member-sidebar.html',
  styleUrl: './member-sidebar.css',
})
export class MemberSidebar {
  readonly FileIcon = FileIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly LogInIcon = LogInIcon;
  readonly UserIcon = UserIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly HouseIcon = HouseIcon;
  readonly WalletIcon = WalletIcon;
  readonly CoinsIcon = CoinsIcon;
  readonly Gamepad2Icon = Gamepad2Icon;
  readonly ScanBarcodeIcon = ScanBarcodeIcon;
  readonly UserPlusIcon = UserPlusIcon;
  readonly ShoppingCartIcon = ShoppingCartIcon;

  userService = inject(UserService);
  topupService = inject(TopupService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  isExpanded = signal(true);

  toggleSidebar = () => {
    this.isExpanded.set(!this.isExpanded());
  };

  handleLogout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };
}
