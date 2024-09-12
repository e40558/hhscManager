import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/courses/model/course';
import { Consumer } from '../models/consumer';

@Component({
  selector: 'hcs-consumers-list',
  templateUrl: './consumers-list.component.html',
  styleUrls: ['./consumers-list.component.scss']
})
export class ConsumersListComponent {

  @Input()
  consumers: Consumer[] =[];


}
