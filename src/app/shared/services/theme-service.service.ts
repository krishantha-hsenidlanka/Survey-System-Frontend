import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme = this.darkTheme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      this.darkTheme.next(savedTheme === 'true');
    }
  }

  toggleTheme() {
    const newTheme = !this.darkTheme.value;
    this.darkTheme.next(newTheme);
    localStorage.setItem('darkTheme', newTheme.toString());
  }
}
