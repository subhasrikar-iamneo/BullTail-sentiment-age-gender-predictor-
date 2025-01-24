import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { emot } from '../../../model/interface/role';

@Component({
  selector: 'app-emodict',
  imports: [CommonModule, FormsModule],
  templateUrl: './emodict.component.html',
  styleUrl: './emodict.component.css'
})
export class EmodictComponent {
  http = inject(HttpClient)
  limimg:string='';
  loding:boolean=false;
  imgload:boolean=true;
  detect:any = {
    inputtex:'',
    outemo:'',
    limepng:''
  }
  clear(){
    this.detect.inputtex=''
    this.detect.outemo=''
    this.limimg=''
    this.imgload=true;
    // alert("yeah")

  }
  send(){
    this.http.get<emot>("http://127.0.0.1:8000/emodet/" + this.detect.inputtex)
      .subscribe((res: emot) => {
        this.detect.outemo = res.emotion;

      }, error => {
        // Handle errors (e.g., API not reachable)
        alert("An error occurred while logging in. Please try again.");
        console.error(error);
      });
      // alert(this.detect.outemo)

  }
  getexp(){
    this.loding=true;
    this.http.get<emot>("http://127.0.0.1:8000/emolime/" + this.detect.inputtex)
      .subscribe((res: emot) => {
        this.detect.limepng = res.emotion;
        this.limimg=this.detect.limepng;
        this.loding=false;
        this.imgload=false;
      }, error => {
        // Handle errors (e.g., API not reachable)
        alert("An error occurred while logging in. Please try again.");
        console.error(error);
      });
      // alert(this.detect.outemo)

  }

}
