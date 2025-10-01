import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  increment,
  runTransaction,
} from '@angular/fire/firestore';
import { AppUser } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fireStore = inject(Firestore);

  getProfile(uid: string): Observable<AppUser | null> {
    const ref = doc(this.fireStore, 'users', uid);

    return docData(ref, { idField: 'id' }) as Observable<AppUser | null>;
  }

  async topup(uid: string, amount: number) {
    const ref = doc(this.fireStore, 'users', uid);
    const userTopupRef = doc(
      collection(this.fireStore, 'users', uid, 'topups'),
    );

    try {
      await runTransaction(this.fireStore, async (transaction) => {
        transaction.update(ref, {
          wallet: increment(amount),
        });

        transaction.set(userTopupRef, {
          amount,
          createdAt: new Date(),
        });
      });

      return {
        success: true,
        message: `เติมเงินสำเร็จ`,
      };
    } catch {
      return {
        success: false,
        message: 'ไม่สามารถเติมเงินได้กรุณาลองใหม่ภายหลัง',
      };
    }
  }
}
