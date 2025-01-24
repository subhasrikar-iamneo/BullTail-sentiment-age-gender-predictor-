import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {CloudinaryModule} from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { HttpClient } from '@angular/common/http';
import { ageo } from '../../../model/interface/role';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imgpred',
  imports: [CommonModule ,CloudinaryModule,FormsModule],
  templateUrl: './imgpred.component.html',
  styleUrl: './imgpred.component.css'
})
export class ImgpredComponent {
  imagePreview: string = "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"; // For displaying the uploaded or captured image
  private stream: MediaStream | null = null; // Camera stream
  isloading:boolean=false
  agedisp:boolean=false
  predage:string='';
  predgender:string=''
  agetex:string=''
  backendUrl = 'http://localhost:8000/upload-image/';

  @ViewChild('cameraStream') cameraStream!: ElementRef<HTMLVideoElement>;
  @ViewChild('photoCanvas') photoCanvas!: ElementRef<HTMLCanvasElement>;

  http=inject(HttpClient)

  // Handle file upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Open the camera and capture a photo
  openCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.stream = stream;
          const video = this.cameraStream.nativeElement;
          video.style.display = 'block';
          video.srcObject = stream;

          // Capture photo on video click
          video.addEventListener('click', () => this.capturePhoto());
        })
        .catch((err) => {
          console.error('Error accessing the camera:', err);
          alert('Unable to access the camera.');
        });
    }
  }

  getage(){
    this.agedisp=true
    this.isloading=true
    this.http.get<ageo>("http://127.0.0.1:8000/imgpred/")
      .subscribe((res: ageo) => {
        this.predgender = res.gender;
        this.predage=res.age
        this.agetex="Gender: "+this.predgender+" & Age: "+this.predage
        this.isloading=false
        alert("Your "+"Gender is "+this.predgender+" & Age is "+this.predage)
      }, error => {
        // Handle errors (e.g., API not reachable)
        alert("An error occurred. Please try again.");
        console.error(error);
      });
  }

  clear(){
    this.imagePreview="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
    // Stop the camera stream
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    this.agedisp=false
  }

  send(){
    const formData = new FormData();
    // alert(this.imagePreview)
    // console.log(this.imagePreview)
    fetch(this.imagePreview)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], 'face.png', { type: blob.type });
      formData.append('file', file);

      this.http.post(this.backendUrl, formData).subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response);
          alert("Image sent successfully click Get Age to know your age")
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    })
    .catch((error) => {
      console.error('Error converting blob URL to file:', error);
    });
  }

  // Capture the photo from the video stream
  capturePhoto(): void {
    const video = this.cameraStream.nativeElement;
    const canvas = this.photoCanvas.nativeElement;

    // Draw the video frame to the canvas
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Stop the camera stream
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }
      video.style.display = 'none';

      // Convert the canvas to a data URL and display the image
      this.imagePreview = canvas.toDataURL('image/png');
      // alert(this.imagePreview)
    }
  }

}
