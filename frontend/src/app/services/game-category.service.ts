import { inject, Injectable } from '@angular/core';
import { CreateGameCategory, GameCategory, UpdateGameCategory } from '../types';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameCategoryService {
  firestore = inject(Firestore);

  async createCategory(category: CreateGameCategory) {
    try {
      const ref = collection(this.firestore, 'game_category');

      const q = query(ref, where('name', '==', category.name));
      const existed = await getDocs(q);

      if (existed.docs.length > 0) {
        return {
          success: false,
          message: 'ประเภทนี้ถูกสร้างไปแล้ว',
        };
      }

      await addDoc(ref, {
        name: category.name,
      });

      return {
        success: true,
        message: 'สร้างประเภทเกมเสร็จเรียบร้อย',
      };
    } catch {
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการสร้างประเภท',
      };
    }
  }

  getCategories(): Observable<GameCategory[]> {
    const ref = collection(this.firestore, 'game_category');
    return collectionData(ref, { idField: 'id' }) as Observable<GameCategory[]>;
  }

  async getCategory(id: string) {
    const ref = doc(this.firestore, `game_category/${id}`);
    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as GameCategory;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }

  async deleteCategory(id: string) {
    try {
      const ref = doc(this.firestore, `game_category/${id}`);
      await deleteDoc(ref);

      return {
        success: true,
        message: 'ลบประเภทเกมสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการลบเกม',
      };
    }
  }

  async updateCategory(id: string, category: UpdateGameCategory) {
    try {
      const ref = collection(this.firestore, 'game_category');

      const q = query(ref, where('name', '==', category.name));
      const existed = await getDocs(q);

      if (existed.docs.length > 0) {
        return {
          success: false,
          message: 'ชื่อประเภทนี้ถูกใช้ไปแล้ว',
        };
      }

      const docRef = doc(this.firestore, `game_category/${id}`);
      await updateDoc(docRef, { name: category.name });

      return {
        success: true,
        message: 'แก้ประเภทเกมสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการแก้ไขเกม',
      };
    }
  }
}
