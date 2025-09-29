import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { AppUser } from '../types';
import { UserService } from './user.service';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireAuth = inject(Auth);
  fireStore = inject(Firestore);
  fireStorage = inject(Storage);

  userService = inject(UserService);

  private userSubject = new BehaviorSubject<AppUser | null | undefined>(undefined);
  currentUser$ = this.userSubject.asObservable();

  private authInitialized = new BehaviorSubject<boolean>(false);
  public authInitialized$ = this.authInitialized.asObservable();

  async register(
    email: string,
    password: string,
    username: string,
    profile: File,
  ) {
    try {
      const cred = await createUserWithEmailAndPassword(
        this.fireAuth,
        email,
        password,
      );
      const uid = cred.user.uid;

      const filePath = `avatar/${uid}_${profile.name}`;
      const storageRef = ref(this.fireStorage, filePath);
      const snapshot = await uploadBytes(storageRef, profile);
      const profileUrl = await getDownloadURL(snapshot.ref);

      const userDocRef = doc(this.fireStore, 'users', uid);
      await setDoc(userDocRef, {
        email,
        username,
        profileUrl,
        role: 'member',
        wallet: 0,
      });

      return {
        success: true,
        message: 'สมัครสมาชิกสำเร็จ',
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'ไม่สามารถสมัครสมาชิกได้กรุณาลองใหม่ภายหลัง',
      };
    }
  }

  async login(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(
        this.fireAuth,
        email,
        password,
      );
      return cred;
    } catch {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  }

  async logout() {
    await this.fireAuth.signOut();
  }

  waitForAuthInit() {
    return this.currentUser$.pipe(
      filter(user => user !== undefined),
      take(1)
    ) as Observable<AppUser | null>;
  }

  constructor() {
    onAuthStateChanged(this.fireAuth, (user) => {
      if (user) {
        this.userService.getProfile(user.uid).subscribe((user) => {
          this.userSubject.next(user);
        });
      } else {
        this.userSubject.next(null);
      }

      if (this.authInitialized.value) {
        this.authInitialized.next(true);
      }
    });
  }
}
