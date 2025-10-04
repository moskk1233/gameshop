import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../types';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  GAME_IMAGE_DIR = 'game_image';

  fS = inject(Firestore);
  fStorage = inject(Storage);

  private async uploadFile(path: string, file: File) {
    const filePath = path;
    const storageRef = ref(this.fStorage, filePath);

    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  getGames(): Observable<Game[]> {
    const ref = collection(this.fS, 'games');

    return collectionData(ref, { idField: 'id' }) as Observable<Game[]>;
  }

  getGameById(id: string): Observable<Game | null> {
    const docRef = doc(this.fS, 'games', id);

    return docData(docRef, { idField: 'id' }) as Observable<Game | null>;
  }

  getTrendingGames(): Observable<Game[]> {
    const ref = collection(this.fS, 'games');
    const q = query(ref, orderBy('sold', 'desc'), limit(10));

    return collectionData(q, { idField: 'id' }) as Observable<Game[]>;
  }

  async editGame(
    id: string,
    name: string,
    type: string,
    price: number,
    description: string,
    coverImage?: File,
  ) {
    try {
      const docRef = doc(this.fS, 'games', id);
      let imageUrl: string | null = null;

      if (coverImage) {
        imageUrl = await this.uploadFile(
          `${this.GAME_IMAGE_DIR}/${coverImage.name}`,
          coverImage,
        );
      }

      console.log(name);
      console.log(description);
      console.log(type);
      console.log(price);

      const updateData: {
        name: string;
        type: string;
        description: string;
        price: number;
        coverImage?: string;
      } = {
        name,
        type,
        description,
        price,
      };

      if (imageUrl) updateData.coverImage = imageUrl;

      await updateDoc(docRef, updateData);

      return {
        success: true,
        message: 'แก้ไขข้อมูลเกมสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'แก้ไขข้อมูลเกมไม่สำเร็จ',
      };
    }
  }

  async deleteGame(id: string) {
    try {
      const docRef = doc(this.fS, 'games', id);

      await deleteDoc(docRef);

      return {
        success: true,
        message: 'ลบข้อมูลเกมสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'ไม่สามารถลบข้อมูลเกมได้',
      };
    }
  }

  async createGame(
    name: string,
    type: string,
    description: string,
    price: number,
    image: File,
  ) {
    try {
      const filePath = `game_image/${image.name}`;
      const storageRef = ref(this.fStorage, filePath);

      const snapshot = await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      const collectionRef = collection(this.fS, 'games');

      await addDoc(collectionRef, {
        name,
        type,
        description,
        price,
        sold: 0,
        coverImage: imageUrl,
        createdAt: new Date(),
      } as Game);

      return {
        success: true,
        message: 'วางขายเกมสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'ไม่สามารถวางขายเกมได้กรุณาลองใหม่อีกครั้ง',
      };
    }
  }
}
