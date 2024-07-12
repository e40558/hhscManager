import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";

import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';


@Component({
  selector: 'course-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
