import { Component, inject } from '@angular/core';
import { DynamicPageService } from './services/dynamic-page.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent {

public formConfig$: Observable<object> ; 
dynamicPageService = inject(DynamicPageService);
httpClient = inject(HttpClient);

 

loadForm(form: string) {
  
  this.formConfig$ = this.dynamicPageService.getFormConfig(form)
}

 

}
