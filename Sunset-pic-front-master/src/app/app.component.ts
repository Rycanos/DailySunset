import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  numArr = Array.from(Array(100), (_,x) => x);
  baseUrl: String;

  constructor(public element: ElementRef, private http: HttpClient) {
  this.baseUrl = 'http://192.168.1.25:4200';
  }

  ngOnInit () {
    this.http.get(this.baseUrl + '/api/nbImg').subscribe(
      res => {
        console.log(res);
      }
    );
  }

  get numImages(): number {
    return this.element.nativeElement.querySelectorAll('img').length;
  }

  onTakePicture() {
    this.http.get(this.baseUrl + '/api/takePicture').subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
