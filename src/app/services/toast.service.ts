import { Injectable, ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: { message: string; type: 'success' | 'error' | 'info' }[] = [];

  constructor(private appRef: ApplicationRef) {}

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toasts.push({ message, type });
    this.appRef.tick();

    setTimeout(() => {
      this.toasts.shift();
      this.appRef.tick();
    }, 3000);
  }
}
