import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http:HttpClient) { }
  getImg() {

    return this.http.get('https://pixabay.com/api/?key=21351108-e70e13da005029798b867e59c&q=yellow+flowers&image_type=photo&category=nature&safesearch=true');

  }
}
