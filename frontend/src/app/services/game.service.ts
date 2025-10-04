import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../types';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  limit,
  orderBy,
  query,
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
  fS = inject(Firestore);
  fStorage = inject(Storage);

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
