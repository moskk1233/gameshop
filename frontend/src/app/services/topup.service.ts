import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUserTopupHistory } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TopupService {
  fS = inject(Firestore);

  isTopupModalOpen = signal(false);

  toggleTopupModal = () => {
    this.isTopupModalOpen.set(!this.isTopupModalOpen());
  };

  set(value: boolean) {
    this.isTopupModalOpen.set(value);
  }

  getUserTopup(id: string) {
    const ref = collection(this.fS, 'users', id, 'topups');

    return collectionData(ref, { idField: 'id' }) as Observable<
      IUserTopupHistory[]
    >;
  }
}
