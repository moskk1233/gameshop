import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireAuth = inject(Auth);
  fireStore = inject(Firestore);
  fireStorage = inject(Storage);

  async register(email: string, password: string, username: string, profile: File) {
    try {
      const cred = await createUserWithEmailAndPassword(this.fireAuth, email, password);
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
        role: 'user'
      });

      return {
        success: true,
        message: 'สมัครสมาชิกสำเร็จ'
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'ไม่สามารถสมัครสมาชิกได้กรุณาลองใหม่ภายหลัง'
      };
    }
  }

  async logout() {
    await this.fireAuth.signOut();
  }
}
