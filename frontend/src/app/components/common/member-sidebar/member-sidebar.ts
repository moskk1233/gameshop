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
  LucideAngularModule,
} from 'lucide-angular';
import { UserService } from '../../../services/user.service';
import { DecimalPipe } from '@angular/common';
import { TopupService } from '../../../services/topup.service';

@Component({
  selector: 'app-member-sidebar',
  imports: [LucideAngularModule, DecimalPipe],
  templateUrl: './member-sidebar.html',
  styleUrl: './member-sidebar.css',
})
export class MemberSidebar {
  readonly FileIcon = FileIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly UserIcon = UserIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly HouseIcon = HouseIcon;
  readonly WalletIcon = WalletIcon;
  readonly CoinsIcon = CoinsIcon;
  readonly Gamepad2Icon = Gamepad2Icon;
  readonly ScanBarcodeIcon = ScanBarcodeIcon;

  userService = inject(UserService);
  topupService = inject(TopupService);

  isExpanded = signal(true);

  toggleSidebar = () => {
    this.isExpanded.set(!this.isExpanded());
  }
}
