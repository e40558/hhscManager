import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { select, Store } from '@ngrx/store';
import { Consumer } from './models/consumer';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.scss']

})

//smart component
export class ConsumersComponent implements OnInit {

private store = inject(Store<AppState>);
consumers$: Observable<Consumer[]> = new Observable<Consumer[]>();

ngOnInit(): void {
  this.reload();
}

reload(){
 //// this.consumers$ = this.store.pipe(
  //     (select(selectConsumers))
 // );
}









}
