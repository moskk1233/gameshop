import { DecimalPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, SaveIcon, TrashIcon } from 'lucide-angular';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';

@Component({
  selector: 'app-game-management-edit',
  imports: [DecimalPipe, AdminHeader, LucideAngularModule],
  templateUrl: './game-management-edit.html',
  styleUrl: './game-management-edit.css',
})
export class GameManagementEdit {
  readonly SaveIcon = SaveIcon;
  readonly TrashIcon = TrashIcon;

  location = inject(Location);

  handleBackClick() {
    this.location.back();
  }
}
