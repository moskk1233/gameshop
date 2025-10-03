import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'thaiDate',
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: Timestamp | Date | null | undefined): string {
    if (!value) return '';

    const date = value instanceof Timestamp ? value.toDate() : value;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long', // เช่น "ตุลาคม"
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    };

    const formatter = new Intl.DateTimeFormat('th-TH', options);
    const parts = formatter.formatToParts(date);

    let day = '',
      month = '',
      year = '',
      hour = '',
      minute = '';
    parts.forEach((p) => {
      if (p.type === 'day') day = p.value;
      if (p.type === 'month') month = p.value;
      if (p.type === 'year') year = String(Number(p.value)); // แปลงเป็น พ.ศ.
      if (p.type === 'hour') hour = p.value;
      if (p.type === 'minute') minute = p.value;
    });

    return `${day} ${month} ${year} ${hour}:${minute} น.`;
  }
}
