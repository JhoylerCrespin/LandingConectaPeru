import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dropdown, initFlowbite } from 'flowbite';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styles: ``,
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  private mediaQueryList: MediaQueryList;
  private mediaQueryListener: () => void;
  isDark: boolean = false;

  constructor() {
    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQueryListener = () => this.applyThemeBasedOnSystemPreference();
  }

  ngOnInit(): void {
    this.applyStoredOrSystemTheme();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    const root = document.documentElement;

    if (theme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.isDark = false;
    } else if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.isDark = true;
    } else {
      localStorage.removeItem('theme');
      this.applyThemeBasedOnSystemPreference();
    }
  }

  private applyStoredOrSystemTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      this.setTheme(storedTheme as 'light' | 'dark');
    } else {
      this.applyThemeBasedOnSystemPreference();
    }
  }

  private applyThemeBasedOnSystemPreference(): void {
    const root = document.documentElement;
    if (this.mediaQueryList.matches) {
      root.classList.add('dark');
      this.isDark = true;
    } else {
      root.classList.remove('dark');
      this.isDark = false;
    }
  }
}
