import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopupService {
  isTopupModalOpen = signal(false);

  toggleTopupModal = () => {
    this.isTopupModalOpen.set(!this.isTopupModalOpen());
  };

  set(value: boolean) {
    this.isTopupModalOpen.set(value);
  }
}
