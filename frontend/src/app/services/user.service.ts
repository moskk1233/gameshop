import { inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { AppUser } from '../types';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfile = {
    username: 'johndoe',
    wallet: 1000,
  };
  isLogin = signal(false);

  fireStore = inject(Firestore);

  login() {
    this.isLogin.set(true);
  }

  logout() {
    this.isLogin.set(false);
  }

  getProfile(uid: string): Observable<AppUser | null> {
    const ref = doc(this.fireStore, 'users', uid);

    return from(getDoc(ref))
    .pipe(
      map(snap => snap.exists() ? { id: snap.id, ...snap.data() } : null)
    ) as Observable<AppUser | null>;
  }
}
