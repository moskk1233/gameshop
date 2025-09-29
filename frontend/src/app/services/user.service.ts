import { inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { AppUser } from '../types';

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

  async getProfile(uid: string) {
    const ref = doc(this.fireStore, 'users', uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    return { id: snap.id, ...snap.data() } as AppUser;
  }
}
