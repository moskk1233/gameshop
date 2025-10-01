import { inject, Injectable } from '@angular/core';
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
import { Coupon } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  fS = inject(Firestore);

  getCoupons() {
    const ref = collection(this.fS, 'coupons');
    return collectionData(ref, { idField: 'id' }) as Observable<Coupon[]>;
  }

  async getCoupon(id: string): Promise<Coupon | null> {
    const ref = doc(this.fS, 'coupons', id);

    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return { id: snap.id, ...snap.data() } as Coupon;
  }

  async createCoupon(code: string, discount: number, limit: number) {
    try {
      const ref = collection(this.fS, 'coupons');
      const q = query(ref, where('code', '==', code));
      const existed = await getDocs(q);
      if (existed.docs.length > 0) {
        return {
          success: false,
          message: 'โค้ดส่วนลดนี้มีในระบบแล้ว',
        };
      }

      await addDoc(ref, {
        code: code.toUpperCase(),
        discount,
        limit,
        usedCount: 0,
      });

      return {
        success: true,
        message: 'เพิ่มคูปองสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'ไม่สามารถเพิ่มคูปองได้ ลองใหม่อีกครั้ง',
      };
    }
  }

  async deleteCoupon(id: string) {
    try {
      const docRef = doc(this.fS, 'coupons', id);
      await deleteDoc(docRef);

      return {
        success: true,
        message: 'ลบคูปองสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'ลบคูปองไม่สำเร็จ ลองใหม่อีกครั้ง',
      };
    }
  }

  async updateCoupon(id: string, coupon: Partial<Coupon>) {
    try {
      const docRef = doc(this.fS, 'coupons', id);
      await updateDoc(docRef, {
        code: coupon.code,
        discount: coupon.discount,
        limit: coupon.limit,
      });

      return {
        success: true,
        message: 'เปลี่ยนแปลงคูปองสำเร็จ',
      };
    } catch {
      return {
        success: false,
        message: 'ไม่สามารถเปลี่ยนแปลงคูปองได้',
      };
    }
  }
}
