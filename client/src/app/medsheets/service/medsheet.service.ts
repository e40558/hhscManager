import { Injectable } from '@angular/core';
import { DatesAdministered } from '../models/medsheet';

@Injectable({
  providedIn: 'root'
})
export class MedsheetStateService {
 
  daysInMonth = new Array(31);
  linesPerItem = new Array(5);
  medSheetItem: DatesAdministered[] = [
    {
      "id": 1,
      "medicationName": "Aripiprazole",
      "doctorOrder": "Aripiprazole 20 Mg Tablet take 1/2 tablet by mouth at bed time for IRRITABILITY",
      "dateAdminister": "",
      "timeOfDayMedsGiven": "8am",
      "weekNum": 1,
      "month": "July",
      "day": "1",
      "year": "2024",
      "initial": "AM"
    },
    {
      "id": 2,
      "medicationName": "Aripiprazole",
      "doctorOrder": "Aripiprazole 20 Mg Tablet take 1/2 tablet by mouth at bed time for IRRITABILITY",
      "dateAdminister": "",
      "timeOfDayMedsGiven": "12pm",
      "weekNum": 1,
      "month": "July",
      "day": "1",
      "year": "2024",
      "initial": "AM"
    },
    {
      "id": 3,
      "medicationName": "Aripiprazole",
      "doctorOrder": "Aripiprazole 20 Mg Tablet take 1/2 tablet by mouth at bed time for IRRITABILITY",
      "dateAdminister": "",
      "timeOfDayMedsGiven": "12pm",
      "weekNum": 1,
      "month": "July",
      "day": "1",
      "year": "2024",
      "initial": "AM"
    }




  ]



  constructor() { }
}
