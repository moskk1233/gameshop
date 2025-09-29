import { inject, Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
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
import {
  BehaviorSubject,
  filter,
  Observable,
  take,
  from,
  switchMap,
  map,
  catchError,
  of,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireAuth = inject(Auth);
  fireStore = inject(Firestore);
  fireStorage = inject(Storage);

  ngZone = inject(NgZone);

  userService = inject(UserService);

  private userSubject = new BehaviorSubject<AppUser | null | undefined>(
    undefined,
  );
  currentUser$ = this.userSubject.asObservable();

  private authInitialized = new BehaviorSubject<boolean>(false);
  public authInitialized$ = this.authInitialized.asObservable();

  register(
    email: string,
    password: string,
    username: string,
    profile: File,
  ): Observable<{ success: boolean; message: string }> {
    return from(
      createUserWithEmailAndPassword(this.fireAuth, email, password),
    ).pipe(
      switchMap((cred) => {
        const uid = cred.user.uid;
        const filePath = `avatar/${uid}_${profile.name}`;
        const storageRef = ref(this.fireStorage, filePath);

        return from(uploadBytes(storageRef, profile)).pipe(
          switchMap((snapshot) => from(getDownloadURL(snapshot.ref))),
          switchMap((profileUrl) => {
            const userDocRef = doc(this.fireStore, 'users', uid);
            return from(
              setDoc(userDocRef, {
                email,
                username,
                profileUrl,
                role: 'member',
                wallet: 0,
              }),
            );
          }),
          map(() => ({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ',
          })),
        );
      }),
      catchError((e) => {
        console.error(e);
        return of({
          success: false,
          message: 'ไม่สามารถสมัครสมาชิกได้กรุณาลองใหม่ภายหลัง',
        });
      }),
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.fireAuth, email, password),
    ).pipe(
      catchError(() => {
        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }),
    );
  }

  logout(): Observable<void> {
    return from(this.fireAuth.signOut());
  }

  waitForAuthInit() {
    return this.currentUser$.pipe(
      filter((user) => user !== undefined),
      take(1),
    ) as Observable<AppUser | null>;
  }

  constructor() {
    onAuthStateChanged(this.fireAuth, (user) => {
      this.ngZone.run(() => {
        console.log(user);
        if (user) {
          this.userService.getProfile(user.uid).subscribe((user) => {
            this.userSubject.next(user);
          });
        } else {
          this.userSubject.next(null);
        }

        if (!this.authInitialized.value) {
          this.authInitialized.next(true);
        }
      });
    });
  }
}
