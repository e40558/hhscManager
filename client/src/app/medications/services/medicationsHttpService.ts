

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import { Medication } from "../model/medication.model";

@Injectable()
export class MedicationsHttpService {

    workingMedication: Medication;

    constructor(private http:HttpClient) {

    }

    findAllMedications(): Observable<Medication[]> {
        return this.http.get<any>('/api/medications')
            .pipe(
                map(res => Object.values(res['medications']))     
            );
    }

  

    findMedicationById(medicationId: number): Observable<Medication> {
        return this.http.get<Medication>(`/api/medications/${medicationId}`);
    }

    

   

   // findLessons(
   //     courseId:number,
   //     pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

   //     return this.http.get<Lesson[]>('/api/lessons', {
   //         params: new HttpParams()
   //             .set('courseId', courseId.toString())
   //             .set('sortOrder', 'asc')
   //             .set('pageNumber', pageNumber.toString())
   //             .set('pageSize', pageSize.toString())
   //     });
   // }


    saveLocation( changes: Partial<Medication>): Observable<any> {
       
        return this.http.post<Medication>('/api/medications/' , changes)
           
       
    }

    updateMedication(medicationsId: string | number, changes: Partial<Medication>) {
        return this.http.patch('/api/medications/' + medicationsId, changes);
    }


    deleteMedication(medicationId: string | number) {
        return this.http.delete('/api/medications/' + medicationId);
    }


    

    setWorkingMedication(medication : Medication) {
        this.workingMedication = medication
 
     }
}