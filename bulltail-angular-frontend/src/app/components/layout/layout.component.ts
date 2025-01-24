import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLinkActive,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router=inject(Router)
  OnLogOut(){
    // alert("logout reached")
    this.router.navigateByUrl('/login');
    localStorage.removeItem('empErpUser')
  }
  onhome(){
    this.router.navigateByUrl('/home')
  }
}
