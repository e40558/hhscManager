import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicPageService {

  
  private formLoadingTrigger = new Subject<'user | company'>();

  httpClient = inject(HttpClient)
  constructor() { }


  getFormConfig(config: string) : Observable<object>{
    
    return    this.httpClient.get(`../assets/${config}.form.json`)
   
  }




}
