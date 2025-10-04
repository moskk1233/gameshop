import { Component, inject, OnInit } from '@angular/core';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import { LucideAngularModule, PlusIcon } from 'lucide-angular';
import { GameManagementCard } from '../../../components/admin/game-management/game-management-card/game-management-card';
import { GameService } from '../../../services/game.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { Game } from '../../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-management',
  imports: [
    AdminHeader,
    LucideAngularModule,
    GameManagementCard,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './game-management.html',
  styleUrl: './game-management.css',
})
export class GameManagement implements OnInit {
  readonly PlusIcon = PlusIcon;

  gameService = inject(GameService);
  fb = inject(FormBuilder);

  games$!: Observable<Game[]>;
  searchControl = this.fb.control('');

  ngOnInit(): void {
    const allGames$ = this.gameService.getGames().pipe(shareReplay(1));

    this.games$ = this.searchControl.valueChanges.pipe(
      startWith(''), // ตอนแรกให้แสดงทั้งหมด
      debounceTime(300), // กันพิมพ์รัว
      distinctUntilChanged(),
      switchMap((searchText) =>
        allGames$.pipe(
          map((games) =>
            games.filter((game) =>
              game.name.toLowerCase().includes(searchText!.toLowerCase()),
            ),
          ),
        ),
      ),
    );
  }
}
