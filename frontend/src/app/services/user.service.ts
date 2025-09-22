import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfile = {
    username: 'johndoe',
    wallet: 1000,
  };
  isLogin = signal(false);

  login() {
    this.isLogin.set(true);
  }

  logout() {
    this.isLogin.set(false);
  }

  getProfile() {
    return this.userProfile;
  }
}
