import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let backendUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})


export class BackendService {

  constructor(private httpClient :HttpClient) { }


  getPage(id:number): Observable<any> {
    return this.httpClient.get(backendUrl +"page/"+ id)
  }


  // let {imageId, id = +imageId,}= req.params;
  //  let {pageId , idPage = +pageId} = req.query;
  deleteImage(idPage:number, idImage:number): Observable<any> {
    return this.httpClient.delete(backendUrl + 'content/image/' +idImage + `?pageId=${idImage}`)
    
  }

}
