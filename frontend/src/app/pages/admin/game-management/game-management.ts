import { Component, inject } from '@angular/core';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { LucideAngularModule, PlusIcon } from 'lucide-angular';
import { GameManagementCard } from '../../../components/admin/game-management/game-management-card/game-management-card';
import { GameService } from '../../../services/game.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-management',
  imports: [
    AdminHeader,
    LucideAngularModule,
    GameManagementCard,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './game-management.html',
  styleUrl: './game-management.css',
})
export class GameManagement {
  readonly PlusIcon = PlusIcon;

  gameService = inject(GameService);
}
