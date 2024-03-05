import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(
    private router: Router

  ){}
  goToHome() {
    this.router.navigate(['/home']);
  }
}
