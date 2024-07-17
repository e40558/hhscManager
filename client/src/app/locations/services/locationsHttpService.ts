

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Location} from "src/app/locations/model/location.model"

@Injectable()
export class LocationsHttpService {

    

    constructor(private http:HttpClient) {

    }

    findAllLocations(): Observable<Location[]> {
        return this.http.get<any>('http://localhost:9000/api/locations')
            .pipe(
                map(res => Object.values(res['locations']))     
            );
    }

    findLocationByUrl(locationUrl: string): Observable<Location> {
      return this.http.get<Location>(`/api/locations/${locationUrl}`);
    }

    findLocationById(locationId: number): Observable<Location> {
        return this.http.get<Location>(`http://localhost:9000/api/locations/${locationId}`);
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


    saveLocation( changes: Partial<Location>): Observable<Location> {
        return this.http.post<Location>('http://localhost:9000/api/locatioins/' , changes);
    }

    updateLocation(locationId: string | number, changes: Partial<Location>) {
        return this.http.patch('http://localhost:9000/api/locations/' + locationId, changes);
    }


}