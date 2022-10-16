import { Component, OnInit } from '@angular/core';
import {BackendService} from './backend.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontApp';
  page:any;
  constructor(private backend: BackendService) {}

 ngOnInit(): void {
   
  this.backend.getPage(1).subscribe((page : any) => {
    this.page = page.data;
  })

 }

 deleteImage(id: number,idPage:number): void {
    alert('image used')
  this.backend.deleteImage(id,idPage).subscribe((page : any) => {
    if(page.error === 'image already in use') alert('image already in use')
    window.location.reload();
  })
 }

}
