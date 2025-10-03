import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  EmailAuthProvider,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { UserService } from './user.service';
import { Observable, from, switchMap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireAuth = inject(Auth);
  fireStore = inject(Firestore);
  fireStorage = inject(Storage);

  userService = inject(UserService);

  currentUser$ = authState(this.fireAuth).pipe(
    switchMap((cred) => {
      if (cred) {
        return this.userService.getProfile(cred.uid);
      } else {
        return of(null);
      }
    }),
  );

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

  async changePassword(oldPassword: string, newPassword: string) {
    const user = this.fireAuth.currentUser;
    if (!user || !user.email) throw new Error('User not found');

    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  }

  async updateProfile(username: string, email: string) {
    const user = this.fireAuth.currentUser;
    if (!user) throw new Error('ไม่พบผู้ใช้');

    if (email && user.email !== email) {
      await updateEmail(user, email);
    }
    const userDocRef = doc(this.fireStore, 'users', user.uid);
    await updateDoc(userDocRef, { username, email });
  }

  async updateProfileImage(file: File): Promise<string> {
    const user = this.fireAuth.currentUser;
    if (!user) throw new Error('ไม่พบผู้ใช้');

    // ที่เก็บไฟล์ใน Storage
    const filePath = `avatar/${user.uid}_${file.name}`;
    const storageRef = ref(this.fireStorage, filePath);

    // อัปโหลด
    const snapshot = await uploadBytes(storageRef, file);

    // เอา URL มาใช้
    const downloadURL = await getDownloadURL(snapshot.ref);

    // update Firestore ด้วย URL
    const userDocRef = doc(this.fireStore, 'users', user.uid);
    await updateDoc(userDocRef, { profileUrl: downloadURL });

    return downloadURL;
  }
}
