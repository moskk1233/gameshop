import { inject, Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  increment,
  updateDoc,
} from '@angular/fire/firestore';
import { AppUser } from '../types';
import { catchError, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fireStore = inject(Firestore);

  getProfile(uid: string): Observable<AppUser | null> {
    const ref = doc(this.fireStore, 'users', uid);

    return docData(ref, { idField: 'id' }) as Observable<AppUser | null>;
  }

  topup(uid: string, amount: number) {
    const ref = doc(this.fireStore, 'users', uid);

    return from(updateDoc(ref, {
      wallet: increment(amount),
    })).pipe(
      switchMap(() => of({
        success: true,
        message: `เติมเงินสำเร็จ`
      })),
      catchError((e) => {
        console.error(e);
        return of({
          success: false,
          message: 'ไม่สามารถเติมเงินได้กรุณาลองใหม่ภายหลัง',
        });
      }),
    );
  }
}
