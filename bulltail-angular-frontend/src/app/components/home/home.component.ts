import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink,RouterLinkActive, FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class HomeComponent {
  router= inject(Router)
  http= inject(HttpClient)

  clname:string=''
  clemail:string=''
  clcontent:string=''

  clmsg:string =''
  goimg(){
    this.router.navigateByUrl('/imgpred')
  }
  goemo(){
    this.router.navigateByUrl('/emodict')
  }

  sendmsg() {
    this.clmsg="sender_name : "+this.clname+"\nsender_email : "+this.clemail+"\ncontent: \n"+this.clcontent;
    const payload = { text: this.clmsg }; // String to send
    alert(this.clmsg)

    this.http.post<{ message: string }>('http://127.0.0.1:8000/post-msg/', payload).subscribe(
      (response) => {
        console.log('Response from FastAPI:', response);
      },
      (error) => {
        console.error('Error posting string:', error);
      }
    );
  }
}


