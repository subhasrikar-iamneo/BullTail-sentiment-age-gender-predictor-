import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { valismod } from '../../../model/interface/role';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient);
  valid:boolean =false
  msg:string =''

  loginobj: any = {
    email:'',
    password:''
  }

  router= inject(Router)

  OnLogin() {

    this.http.get<valismod>("http://127.0.0.1:8000/validation/" + this.loginobj.email + "/" + this.loginobj.password)
      .subscribe((res: valismod) => {
        this.valid = res.is_valid;
        this.msg = res.message;

        // Perform actions based on the API response
        if (this.valid) {
          // alert(this.loginobj.email)
          this.router.navigateByUrl('/home');
          localStorage.setItem('empErpUser', this.loginobj.email);
        } else {
          alert("Sorry dude! " + this.msg);
        }
      }, error => {
        // Handle errors (e.g., API not reachable)
        alert("An error occurred while logging in. Please try again.");
        console.error(error);
      });
}
}
